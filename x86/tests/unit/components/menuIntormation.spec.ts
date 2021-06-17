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

import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import Controls from '@/components/simulatorControls/Controls.vue';
import { ChangeHistory } from '@/services/interfaces/State';

const assemblyCode = 'BITS 64\n'
  + 'SECTION .text\n'
  + '\tglobal _start\n'
  + '\t_start:\n'
  + '    \tmov rax , [ firstVar ]\n'
  + '\t\tmov rbx , [ otherVar ]\n'
  + ' \t\tmov [ firstVar ], rbx\n'
  + ' \t\tmov [ otherVar ], rax';

const emptyChangeHistory: Array<ChangeHistory> = [];

const changeHistory: Array<ChangeHistory> = [
  {
    instruction: 'mov rax, rbx',
    changedElements: ['RAX 00 11 22 33 44 55 66 77 88'],
  },
  {
    instruction: 'push rbx',
    changedElements: [
      '[0x8000] 00 11 22 33 44 55 66 77 88',
      'RSP 00 88 00 00 00 00 00 00',
    ],
  },
  {
    instruction: 'jnz 0xa',
    changedElements: [],
  },
];

const changeHistoryString = 'mov rax, rbxRAX 00 11 22 33 44 55 66 77 88 1 '
  + 'push rbx[0x8000] 00 11 22 33 44 55 66 77 88RSP 00 88 00 00 00 00 00 00 2 '
  + 'jnz 0xa 3';

describe('Controls.vue Component', () => {
  it('succeeds if MenuInformation with empty message rendered', () => {
    const wrapper = shallowMount(Controls, {
      propsData: { assemblyCode, changeHistory: emptyChangeHistory },
    });
    expect(wrapper.text()).to.be.equal(`Go back to code editor${assemblyCode}Go back to the editor to change your code.Show the input program codeNothing has changed yetShow past instructions and changes`);
  });
  it('succeeds if Controls with changeHistory rendered', () => {
    const wrapper = shallowMount(Controls, {
      propsData: { assemblyCode, changeHistory },
    });
    expect(wrapper.text()).to.be.equal(`Go back to code editor${assemblyCode}Go back to the editor to change your code.Show the input program code${changeHistoryString} Show past instructions and changes`);
  });
  it('succeeds if Controls with right number of elements rendered', () => {
    const wrapper = shallowMount(Controls, {
      propsData: { assemblyCode, changeHistory },
    });
    expect(wrapper.element.children[2].children[0].children[0].children.length).to.be.equal(3);
  });
});
