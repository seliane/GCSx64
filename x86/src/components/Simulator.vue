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
  <div>
    <div class="SimulatorContainer">
      <CPU v-if="dataIsLoaded" :current-state="currentState"/>
      <div class="MemoryContainer">
        <div class="topContainer">
          <CpuCycle
            v-if="dataIsLoaded"
            :disable-button="disableNextButton"
            :current-step="currentStep"
            :all-steps="allSteps"
            :is-last-step="isLastStep"
            v-on:nextStep="nextStep"
            v-on:changeStepAnimate="changeStepAnimate"
          />
          <Controls
            v-if="dataIsLoaded"
            :assembly-code="assemblyCode"
            :change-history="currentState.changeHistory"/>
        </div>
        <Memory v-if="dataIsLoaded" :current-state="currentState"/>
      </div>
    </div>
    <AnimationHelper/>
  </div>
</template>

<script lang="ts">
import CPU from '@/components/cpu/Cpu.vue';
import Memory from '@/components/memory/Memory.vue';
import CpuCycle from '@/components/simulatorControls/CpuCycle.vue';
import StepController from '@/services/controller';
import Controls from '@/components/simulatorControls/Controls.vue';
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import State from '@/services/interfaces/State';
import CpuCycleStep from '@/services/interfaces/CpuCycleStep';
import AnimationHelper from '@/components/general/AnimationHelper.vue';
import Program from '@/services/interfaces/Progam';
import startEmulator from '@/services/startSimulatorService';

@Component({
  components: {
    AnimationHelper,
    CpuCycle,
    Memory,
    CPU,
    Controls,
  },
})
export default class Simulator extends Vue {
  @Prop()
  machineCodeFromURLSimulator!: string;

  @Prop()
  base64AssemblyFromURLSimulator!: string;

  private assemblyCode: string = atob(this.base64AssemblyFromURLSimulator);

  private dataIsLoaded = false;

  private isLastStep = false;

  private disableNextButton = false;

  private currentState?: State;

  private currentStep?: CpuCycleStep;

  private stepController?: StepController;

  private allSteps?: Array<CpuCycleStep>;

  private program?: Program;

  // eslint-disable-next-line class-methods-use-this
  data() {
    return {
      currentState: undefined,
      currentStep: undefined,
      stepController: undefined,
      program: undefined,
      allSteps: undefined,
    };
  }

  @Watch('$route', { immediate: true, deep: true })
  async loadDataFromURL() {
    this.dataIsLoaded = false;
    try {
      const program = await startEmulator(this.machineCodeFromURLSimulator);
      program.vm = this;
      this.program = program;
      this.stepController = new StepController(program);
      this.currentState = this.stepController.getState();
      this.currentStep = this.stepController.getCurrentStep();
      this.allSteps = this.stepController.getAllSteps();
      this.isLastStep = false;
    } catch {
      await this.$router.push('/fail');
    }
    this.dataIsLoaded = true;
  }

  async nextStep(): Promise<void> {
    if (this.isLastStep) {
      window.location.reload();
    } else if (this.stepController) {
      this.currentStep = this.stepController.getCurrentStep();
      this.disableNextButton = true;
      this.stepController.nextStep()
        .then((isNotLastStep: boolean) => {
          if (!isNotLastStep) {
            this.terminate();
          }
          this.disableNextButton = false;
        });
    }
  }

  closeEmulator() {
    if (this.program) {
      this.program.ucInstance.close();
      this.program.disassemblerInstance.delete();
    }
  }

  terminate() {
    this.isLastStep = true;
    this.closeEmulator();
  }

  get codeAsNumberArray(): Array<number> {
    const stringArray = this.machineCodeFromURLSimulator.split(',');
    return stringArray.map((value) => parseInt(value, 16));
  }

  changeStepAnimate(currentStep: number) {
    if (this.stepController) {
      this.stepController.changeStepAnimate(currentStep);
    }
  }
}
</script>

<style scoped>
.SimulatorContainer {
  align-content: center;
  align-items: center;
}

.MemoryContainer {
  flex-direction: column;
  align-content: space-around;
}

.MemoryContainer, .SimulatorContainer {
  display: flex;
  height: 100vh;
  justify-content: space-evenly;
}

.topContainer {
  display: flex;
  justify-content: space-between;
}
</style>
