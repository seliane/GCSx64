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

import State from '@/services/interfaces/State';
import getInstructionPointer, {
  getFlags,
  getRegisters,
} from '@/services/dataServices/registerService';
import { getMemory } from '@/services/dataServices/memoryService';
import Program from '@/services/interfaces/Progam';
import { buildByteInformation } from '@/services/dataServices/byteInformationService';
import { getEmptyAccessedElements } from '@/services/dataServices/accessedElementsService';
import Instruction from '@/services/interfaces/Instruction';
import { dataStringsToCurrentInstructionBytes } from '@/services/dataServices/byteService';

const emptyInstructionOperands = {
  opcode: Uint8Array.from([0, 0, 0, 0, 0]),
  operandCount: 0,
  registersWrite: [],
  registersRead: [],
  immediate: [],
  flagsTest: [],
  flagsWrite: [],
  memoryRead: [],
  memoryWrite: [],
};

export function getEmptyCurrentInstruction(): Instruction {
  const byteString = Array(8).fill('00');
  return {
    length: 8,
    assemblyInterpretation: '',
    content: dataStringsToCurrentInstructionBytes(byteString),
    address: { address: '0000' },
    operands: emptyInstructionOperands,
  };
}

export default function getStateWithEmptyInstruction(program: Program): State {
  const instructionPointer = getInstructionPointer(program.ucInstance);
  return {
    memoryData: getMemory(program),
    registers: getRegisters(program.ucInstance, program.registersToShow),
    currentInstruction: getEmptyCurrentInstruction(),
    flags: getFlags(program.ucInstance, program.flagsToShow),
    instructionPointer,
    currentAccessedElements: getEmptyAccessedElements(),
    byteInformation: buildByteInformation(program),
    changeHistory: [],
  };
}
