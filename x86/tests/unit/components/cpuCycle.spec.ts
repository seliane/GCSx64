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

import CpuCycleStep, { Step } from '@/services/interfaces/CpuCycleStep';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import CpuCycle from '@/components/simulatorControls/CpuCycle.vue';
import StepVue from '@/components/simulatorControls/Step.vue';
import StepButton from '@/components/simulatorControls/StepButton.vue';

const steps: Array<CpuCycleStep> = [{ name: 'Get Instruction', numberInCycleSequence: Step.GET_INSTRUCTION, animate: false }, { name: 'Execute Instruction', numberInCycleSequence: Step.EXECUTE_INSTRUCTION, animate: false }, { name: 'Increment Instr. Pointer', numberInCycleSequence: Step.INCREASE_IP, animate: false }];

describe('CpuCycle.vue Component', () => {
  it('succeeds if StepVues rendered', () => {
    const wrapper = shallowMount(CpuCycle, {
      propsData: { allSteps: steps, currentStep: steps[0] },
    });
    expect(wrapper.findAllComponents(StepVue).length).to.be.equal(3);
  });
  it('succeeds if StepButton rendered', () => {
    const wrapper = shallowMount(CpuCycle, {
      propsData: { allSteps: steps, currentStep: steps[0] },
    });
    expect(wrapper.findAllComponents(StepButton).length).to.be.equal(1);
  });
});
describe('Step.vue Component', () => {
  it('renders Step name when passed', () => {
    const wrapper = shallowMount(StepVue, {
      propsData: { step: steps[0], currentStep: steps[0] },
    });
    expect(wrapper.text()).to.include('1  Get Instruction');
  });
});
