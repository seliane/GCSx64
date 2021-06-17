/* SPDX-License-Identifier: GPL-2.0-only */
/*
 * GCSx64 - x86_64 Graphical CPU Simulator
 *
 * Copyright © 2021 by Eliane Schmidli <seliane.github@gmail.com> and Yves Boillat <yvbo@protonmail.com>
 *
 * This file is part of GCSx64 - x86_64 Graphical CPU Simulator
 *
 * GCSx64 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 2 of the License only.
 *
 * GCSx64 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GCSx64.  If not, see <https://www.gnu.org/licenses/>.
 */

import getStateWithEmptyInstruction from '@/services/dataServices/fillDataService';
import State from '@/services/interfaces/State';
import CpuCycleStep, { Step } from '@/services/interfaces/CpuCycleStep';
import getInstructionPointer, {
  getRegisters,
} from '@/services/dataServices/registerService';
import getCurrentInstruction from '@/services/disassembler/instructionService';
import Program from '@/services/interfaces/Progam';
import {
  changeRegistersToLongSizeRegisters,
} from '@/services/dataServices/registerAssignmentService';
import {
  byteInformationUsedBytesContainsAddressNumber,
} from '@/services/dataServices/byteInformationService';
import getChangeHistory, {
  getReadAccessElements,
  getWriteAccessElements,
  getNewRegistersToShow,
  getEmptyAccessedElements,
  addMemoryAccessHook,
} from '@/services/dataServices/accessedElementsService';
import {
  animateInstructionGeneric,
  animateGetInstruction,
  animateIncreaseInstructionPointer,
} from '@/services/animationService/animationController';
import { readNextInstructionBytesFromMemory } from '@/services/dataServices/memoryService';

export default class StepController {
  private readonly state: State;

  private readonly program: Program;

  private steps: Array<CpuCycleStep> = [{ name: 'Get Instruction', numberInCycleSequence: Step.GET_INSTRUCTION, animate: true }, { name: 'Execute Instruction', numberInCycleSequence: Step.EXECUTE_INSTRUCTION, animate: true }, { name: 'Increment Instr. Pointer', numberInCycleSequence: Step.INCREASE_IP, animate: true }];

  private currentStep: CpuCycleStep;

  constructor(program: Program) {
    if (this.steps.length > 0) {
      this.currentStep = this.steps[Step.GET_INSTRUCTION];
    } else {
      throw new Error('Steps Array is empty.');
    }
    try {
      StepController.validateProgram(program);
      this.program = program;
      this.program.registersToShow = changeRegistersToLongSizeRegisters(this.program.registersToShow);
      this.state = getStateWithEmptyInstruction(program);
    } catch (err) {
      throw new Error(`State could not be created: ${err.message}`);
    }
    addMemoryAccessHook(this.state, this.program);
  }

  private static validateProgram(program: Program) {
    const highestMemoryAddress = 0xFFFF;
    if (program.memoryAddress < 0 || program.memoryAddress > highestMemoryAddress) {
      throw new Error(`Memory Address ${program.memoryAddress.toString(16)} is not valid.`);
    }
    if (program.memorySizeInBytes <= 0) {
      throw new Error(`Memory Size ${program.memorySizeInBytes} is not valid.`);
    }
    if (program.codeAddress < 0 || program.codeAddress > highestMemoryAddress) {
      throw new Error(`Code Address ${program.codeAddress.toString(16)} is not valid.`);
    }
    if (program.codeSizeInBytes <= 0) {
      throw new Error(`Code Size ${program.codeSizeInBytes} is not valid.`);
    }
    return true;
  }

  private async getInstruction() {
    try {
      const animateThisStep = this.steps[Step.GET_INSTRUCTION].animate;
      const instructionAddress = this.state.instructionPointer.address.address;
      const nextInstructionBytes: Uint8Array = readNextInstructionBytesFromMemory(instructionAddress, this.program);
      const currentInstruction = await getCurrentInstruction(this.program, nextInstructionBytes, this.state.instructionPointer.address.address);
      await animateGetInstruction(currentInstruction, this.state, animateThisStep);
      this.getAccessedElementsBeforeExecution();
      this.program.ucInstance.executeInstruction(this.state.currentInstruction);
      this.getAccessedElementsAfterExecution();

      this.currentStep = this.steps[Step.EXECUTE_INSTRUCTION];
    } catch (err) {
      throw new Error(`Current Instruction cannot be executed: ${err}`);
    }
  }

  private getAccessedElementsBeforeExecution() {
    this.state.currentAccessedElements = getReadAccessElements(this.state, this.program.ucInstance);
    this.program.registersToShow = getNewRegistersToShow(this.state.currentInstruction.operands, this.program.registersToShow);
    this.state.registers = getRegisters(this.program.ucInstance, this.program.registersToShow);
  }

  private getAccessedElementsAfterExecution() {
    this.state.currentAccessedElements = getWriteAccessElements(this.state, this.program.ucInstance);
  }

  private async executeInstruction() {
    const animateThisStep = this.steps[Step.EXECUTE_INSTRUCTION].animate;
    await animateInstructionGeneric(this.state, this.program, animateThisStep).then(() => {
      this.state.changeHistory.push(getChangeHistory(this.state.currentInstruction, this.state.currentAccessedElements));
      this.state.currentAccessedElements = getEmptyAccessedElements();
      this.currentStep = this.steps[Step.INCREASE_IP];
    });
  }

  private async increaseIp() {
    const instructionPointer = getInstructionPointer(this.program.ucInstance);
    const animateThisStep = this.steps[Step.INCREASE_IP].animate;
    await animateIncreaseInstructionPointer(instructionPointer, this.state, animateThisStep);
    this.currentStep = this.steps[Step.GET_INSTRUCTION];
  }

  private isInCodeRange(instructionAddress: number): boolean {
    return instructionAddress >= this.state.byteInformation.code.from && instructionAddress < this.state.byteInformation.code.to;
  }

  private isLastStep() {
    const instructionPointer = this.state.instructionPointer.address.address;
    const instructionAddressNumber = parseInt(instructionPointer, 16);
    if (this.isInCodeRange(instructionAddressNumber)) {
      return false;
    }
    const isUsedByte = byteInformationUsedBytesContainsAddressNumber(instructionAddressNumber, this.state.byteInformation.usedBytes);
    return !isUsedByte;
  }

  async nextStep(): Promise<boolean> {
    switch (this.currentStep.numberInCycleSequence) {
      case Step.GET_INSTRUCTION: {
        try {
          await this.getInstruction();
        } catch (e) {
          /* eslint no-console: ["error", { allow: ["warn"] }] */
          console.warn(e);
          return false;
        }
        break;
      }
      case Step.EXECUTE_INSTRUCTION: {
        await this.executeInstruction();
        break;
      }
      case Step.INCREASE_IP: {
        await this.increaseIp();
        if (this.isLastStep()) {
          return false;
        }
        break;
      }
      default:
        throw new Error('State does not exist');
    }
    return true;
  }

  getState(): State {
    return this.state;
  }

  getCurrentStep(): CpuCycleStep {
    return this.currentStep;
  }

  changeStepAnimate(step: number) {
    const { animate } = this.steps[step];
    this.steps[step].animate = !animate;
  }

  getAllSteps(): Array<CpuCycleStep> {
    return this.steps;
  }
}
