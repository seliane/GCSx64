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

import Unicorn from '@/services/emulator/emulatorService';
import Register from '@/services/interfaces/Register';
import { RegisterID } from '@/services/emulator/emulatorEnums';
import dataStringsToBytes from '@/services/dataServices/byteService';
import uInt8ArrayToHexStringArray, { uint8ArrayToBitString } from '@/services/helper/uInt8ArrayHelper';
import Byte from '@/services/interfaces/Byte';
import Flag, { FlagID } from '@/services/interfaces/Flag';
import InstructionPointer from '@/services/interfaces/InstructionPointer';

function getInstructionPointerRegisterString(unicornInstance: Unicorn): string {
  let shortenAddressString: Array<string> = [];
  try {
    const hexStrings = uInt8ArrayToHexStringArray(unicornInstance.register_read(RegisterID.EIP));
    shortenAddressString = hexStrings.slice(0, 2).reverse();
  } catch (err) {
    throw new Error(`Instruction Pointer could not be read : ${err}`);
  }
  return shortenAddressString.join('');
}

function validRegister(bytes: Array<Byte>, name: string): boolean {
  let isValid = false;
  if (bytes.length > 0 && bytes.length <= 8) {
    if (name !== '') {
      isValid = true;
    } else {
      throw new TypeError('Name of Register is empty.');
    }
  } else {
    throw new TypeError(`Register ${name} has either no or too many bytes.`);
  }
  return isValid;
}

export function getRegisters(unicornInstance: Unicorn, registerIds: Array<RegisterID>): Array<Register> {
  const registers: Array<Register> = [];
  try {
    registerIds.forEach((registerId) => {
      const registerData = uInt8ArrayToHexStringArray(unicornInstance.register_read(registerId));
      const registerName = RegisterID[registerId];
      const bytes = dataStringsToBytes(registerData, 0, registerName);
      if (validRegister(bytes, registerName)) {
        registers.push({
          name: registerName,
          content: bytes,
        });
      }
    });
  } catch (err) {
    throw new Error(`Register (Ids: ${registerIds.toString()}) could not be read: ${err}`);
  }
  return registers;
}

export function getRegisterIdFromName(registerName: string): RegisterID {
  const name = registerName.toUpperCase() as keyof typeof RegisterID;
  return RegisterID[name];
}

export function getFlagIdFromName(flagName: string): FlagID {
  const name = flagName.toUpperCase() as keyof typeof FlagID;
  return FlagID[name];
}

export function getFlags(unicornInstance: Unicorn, flagIDs: Array<FlagID>): Array<Flag> {
  const flags: Array<Flag> = [];
  try {
    const dataRegisterEflags = unicornInstance.register_read(RegisterID.EFLAGS);
    const bitDataRegisterEflags = Array.from(uint8ArrayToBitString(dataRegisterEflags));
    flagIDs.forEach((flagId) => {
      const name = FlagID[flagId];
      const flagByteString = `${bitDataRegisterEflags[flagId]}`;
      const flagMemoryByte = dataStringsToBytes([flagByteString], 0, name);
      flags.push({
        name,
        content: flagMemoryByte[0],
      });
    });
  } catch (err) {
    throw new Error(`Flags (Ids: ${flagIDs.toString()}) could not be read: ${err}`);
  }
  return flags;
}

export function getFlagsFromFlagIDs(flagIds: Array<FlagID>, ucInstance: Unicorn): Array<Flag> {
  let flags: Array<Flag> = [];
  if (flagIds) {
    flags = getFlags(ucInstance, flagIds);
  }
  return flags;
}

export function getRegistersFromRegisterIDs(registerIds: Array<RegisterID>, ucInstance: Unicorn): Array<Register> {
  let registers: Array<Register> = [];
  if (registerIds) {
    registers = getRegisters(ucInstance, registerIds);
  }
  return registers;
}

export default function getInstructionPointer(unicornInstance: Unicorn): InstructionPointer {
  return {
    address: {
      address: getInstructionPointerRegisterString(unicornInstance),
    },
  };
}
