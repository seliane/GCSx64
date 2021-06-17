<!-- SPDX-License-Identifier: GPL-2.0-only -->
<!--
/* GCSx64 - x86_64 Graphical CPU Simulator
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
-->

<template>
  <div class="cpu-cycle-steps">
    <div class="flexTitle">
      <div class="cpuCycleTitle">CPU CYCLE</div>
      <StepButton :disable-button="disableButton" class="step-button-container" :is-last-step="isLastStep" v-on:nextStep="nextStep"></StepButton>
    </div>
    <div class="steps-container" v-for="step in allSteps" :key="step.number" >
      <Step :step="step" :current-step="currentStep" :is-last-step="isLastStep" v-on:changeStepAnimate="changeStepAnimate"></Step>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StepButton from '@/components/simulatorControls/StepButton.vue';
import StepVue from '@/components/simulatorControls/Step.vue';
import CpuCycleStep from '@/services/interfaces/CpuCycleStep';

@Component({
  components: {
    Step: StepVue,
    StepButton,
  },
})
export default class CpuCycle extends Vue {
  @Prop()
  currentStep!: CpuCycleStep;

  @Prop()
  allSteps!: Array<CpuCycleStep>;

  @Prop()
  isLastStep!: boolean;

  @Prop()
  disableButton!: boolean;

  nextStep() {
    this.$emit('nextStep');
  }

  changeStepAnimate(currentStep: number) {
    this.$emit('changeStepAnimate', currentStep);
  }
}
</script>

<style scoped>
  .flexTitle {
    display: flex;
    justify-content: space-between;
    padding-right: var(--paddingSize);
    padding-top: var(--paddingSize);
  }
  .steps-container {
    display: block;
  }
  .cpu-cycle-steps, .step-button-container, .cpuCycleTitle {
    display: inline-block
  }

  .cpu-cycle-steps {
    border-radius: var(--borderRadiusSize);
    padding: 0 0 calc(var(--paddingSize) * 0.5) var(--paddingSize);
    border: solid 2px var(--cpuCycleBoxBorderColor);
  }

  .cpuCycleTitle {
    margin-top: var(--paddingSize);
    margin-bottom: var(--paddingSize);
    font-size: calc(var(--byteSize) * 1.6);
    line-height: 0;
  }

</style>
