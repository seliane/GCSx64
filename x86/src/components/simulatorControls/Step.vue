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
  <div v-if="step" class="step-container" >
    <q-chip :class="[isCurrentStep ? 'current-step' : 'past-step']">
      <q-avatar :class="[isCurrentStep ? 'current-step-avatar':'past-step-avatar']">
        {{ step.numberInCycleSequence + 1 }}
      </q-avatar>
      {{step.name}}
    </q-chip>
    <q-toggle
      class="toggle-icon"
      :value="isAnimated"
      @input="changeStepAnimate"
      color="secondary"
      unchecked-icon="bi-x-lg"
      checked-icon="bi-check2"
      size="lg"
    >
      <q-tooltip content-style="font-size: 16px" anchor="bottom middle" self="top middle">
        <span v-if="isAnimated" >Animations for this step are enabled</span>
        <span v-else>Animations for this step are disabled</span>
      </q-tooltip>
    </q-toggle>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CpuCycleStep from '@/services/interfaces/CpuCycleStep';

@Component({ })
export default class StepVue extends Vue {
  @Prop()
  step!: CpuCycleStep;

  @Prop()
  currentStep!: CpuCycleStep;

  @Prop()
  isLastStep!: boolean;

  get isAnimated() {
    return this.step.animate;
  }

  get isCurrentStep() {
    return !this.isLastStep && this.step.numberInCycleSequence === this.currentStep.numberInCycleSequence;
  }

  changeStepAnimate() {
    this.$emit('changeStepAnimate', this.step.numberInCycleSequence);
  }
}
</script>

<style scoped>
.toggle-icon {
  font-family: bootstrap-icons;
}

.current-step, .past-step {
  width: calc(var(--byteSize) * 16);
}
.past-step {
  color: var(--pastStepFontColor);
}
.current-step {
  background: var(--currentStepBackgroundColor);
  color: var(--currentStepFontColor);
}
.past-step-avatar {
  background: var(--pastStepAvatarBackgroundColor);
  color: var(--pastStepAvatarFontColor);
}
.current-step-avatar {
  background: var(--currentStepAvatarBackgroundColor);
  color: var(--currentStepAvatarFontColor);
}

.step-container {
  width: calc(var(--byteSize) * 21);
  display: inline-block;
}

.q-chip {
  font-size: calc(var(--byteSize) * 0.9);
  margin: calc(var(--paddingSize) * 0.5) 0;
}

/* Some classes are in Layout.vue */
/* .q-toggle__inner */
</style>
