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

export const demoProgramLabels = {
  one: 'Add',
  two: 'Swap',
  three: 'Multiply',
  four: 'Stack',
};

const demoProgramOne = {
  label: demoProgramLabels.one,
  program: 'BITS 64\n'
    + 'mov rax, [0x0]\n'
    + 'mov rbx, [0x30]\n'
    + 'add rbx, rax\n'
    + 'mov [0x20], rbx\n'
    + `; ${demoProgramLabels.one}`,
};

const demoProgramTwo = {
  label: demoProgramLabels.two,
  program: 'BITS 64\n'
    + 'SECTION .data\n'
    + '\tfirstVar:\n'
    + '\t\tdq 0x1337\n'
    + '\totherVar:\n'
    + '\t\tdq 0xcafe\n'
    + ' \n'
    + 'SECTION .text\n'
    + '\tmov rax , [ firstVar ]\n'
    + '\tmov rbx , [ otherVar ]\n'
    + '\tmov [ firstVar ], rbx\n'
    + '\tmov [ otherVar ], rax\n'
    + `; ${demoProgramLabels.two}`,
};

const demoProgramThree = {
  label: demoProgramLabels.three,
  program: 'BITS 64\n'
    + 'SECTION .text\n'
    + '\tmov rax, 0x4E\n'
    + '\tmov rbx, 0x3\n'
    + '\tloop:\n'
    + '\t\tadd rcx, rax\n'
    + '\t\tdec rbx\n'
    + '\t\tcmp rbx, 0\n'
    + '\t\tjne loop\n'
    + '\tmov [0x50], rcx\n'
    + '\txor rax, rax\n'
    + '\txor rcx, rcx\n'
    + `; ${demoProgramLabels.three}`,
};

const demoProgramFour = {
  label: demoProgramLabels.four,
  program: 'BITS 64\n'
    + 'SECTION .text\n'
    + '\tpush 0x6\n'
    + '\tpush qword [0x6]\n'
    + '\tmov rax, qword [0x0]\n'
    + '\tpush rax\n'
    + '\tpop rbx\n'
    + '\tpop qword [0x40]\n'
    + `; ${demoProgramLabels.four}`,
};

const demoPrograms: Array<{label: string; program: string}> = [demoProgramOne, demoProgramTwo, demoProgramThree, demoProgramFour];
export default demoPrograms;
