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

import { expect } from 'chai';
import { ndisasm } from '@/services/nasm/ndisasm';
import {
  disassembledCode0, disassembledCode1, machineCode0, machineCode1,
} from './testDataNasm';

describe('Compare built in ndisasm output with native command line tool', () => {
  it('succeeds if ndisasm output matches command line for test code 0', async () => {
    const result = await ndisasm(machineCode0);
    expect(result).to.equal(disassembledCode0);
  });
  it('succeeds if ndisasm output matches command line for test code 1', async () => {
    const result = await ndisasm(machineCode1);
    expect(result).to.equal(disassembledCode1);
  });
});
