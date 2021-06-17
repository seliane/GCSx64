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

import Instruction from '@/services/interfaces/Instruction';
import { byteArrayToUInt8Array } from '@/services/dataServices/byteService';
import Program from '@/services/interfaces/Progam';
import { getFirstInstruction } from '@/services/nasm/ndisasm';

async function injectNasmAssemblyIntoInstruction(instruction: Instruction): Promise<Instruction> {
  const injectedInstruction = instruction;

  try {
    const ndisasmInstruction = await getFirstInstruction(byteArrayToUInt8Array(instruction.content));
    injectedInstruction.assemblyInterpretation = ndisasmInstruction;
  } catch (e) {
    throw new Error(`Injecting of Instruction failed: ${e}`);
  }
  return injectedInstruction;
}

// Opcodes for Jump and Call Instructions from http://ref.x86asm.net/coder64.html

const opcodesJmpCallInstructions = Uint8Array.from([
  0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x7B, 0x7C, 0x7D, 0x7E, 0x7F, 0xE0, 0xE1, 0xE2, 0xE3, 0xE9, 0xEB, 0xFF, 0xE8,
]);

const opcodesTwoByteJmpInstructions = Uint8Array.from([
  0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x8B, 0x8C, 0x8D, 0x8E, 0x8F,
]);

/*
Workaround for Bug in ndisasm:
When ndisasm reads a jump/call instruction which is not within its program context it returns the wrong address operand.
When the entire program is read the address seems to be correct, which is why this is not an issue during normal use.
Since we read the instructions one by one, it always returns the wrong address.

For example:
BC,40,00,00,00,  // mov esp, 0x40
E8,71,00,00,00   // call 0x7b

ndisasm outputs the correct code if you enter the entire machine code.
But if you enter only "E8,71,00,00,00", the result is wrong:
call 0x76; instead of 7b

Solution:
When the opcode shows a Jump or Call instruction, we show the assembly translation of Capstone instead of ndisasm
*/

function isJmpCallInstructionWORKAROUND(opcode: Uint8Array): boolean {
  let index: number;
  const firstByteOfTwoByteOpcodes = 0x0F;
  if (opcode[0] === firstByteOfTwoByteOpcodes) {
    index = opcodesTwoByteJmpInstructions.findIndex((jmpCode) => jmpCode === opcode[1]);
  } else {
    index = opcodesJmpCallInstructions.findIndex((jmpCode) => jmpCode === opcode[0]);
  }
  return index >= 0;
}

export default async function getCurrentInstruction(program: Program, nextBytesOfCode: Uint8Array, instructionAddressHex: string): Promise<Instruction> {
  let instructionsOfCapstone: Array<Instruction> = [];
  const instructionAddress: number = parseInt(instructionAddressHex, 16);
  try {
    instructionsOfCapstone = program.disassemblerInstance.disassemble(nextBytesOfCode, instructionAddress, 1);
  } catch (e) {
    throw new Error(`Disassemble of Current Instruction failed: ${e}`);
  }
  if (isJmpCallInstructionWORKAROUND(instructionsOfCapstone[0].operands.opcode)) {
    return instructionsOfCapstone[0];
  }
  return injectNasmAssemblyIntoInstruction(instructionsOfCapstone[0]);
}
