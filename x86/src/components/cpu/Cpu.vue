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
<div class="cpu">
  <div class="upperBlock">
    <div class="cpuTitle">CPU</div>
    <CurrentInstructionBlock :current-instruction="currentState.currentInstruction"/>
    <ExecutionBox :accessed-elements="currentState.currentAccessedElements" :instructionName="instructionName"/>
    <InstructionPointerBlock :instruction-pointer="currentState.instructionPointer"/>
  </div>
  <RegisterBlock :registers="currentState.registers" :flags="currentState.flags"/>
</div>
</template>

<script lang="ts">
import RegisterBlock from '@/components/cpu/RegisterBlock.vue';
import CurrentInstructionBlock from '@/components/cpu/CurrentInstructionBlock.vue';
import InstructionPointerBlock from '@/components/cpu/InstructionPointerBlock.vue';
import { Prop, Vue, Component } from 'vue-property-decorator';
import State from '@/services/interfaces/State';
import ExecutionBox from '@/components/cpu/ExecutionBox.vue';

@Component({
  components: {
    ExecutionBox,
    InstructionPointerBlock,
    CurrentInstructionBlock,
    RegisterBlock,
  },
})
export default class Cpu extends Vue {
  @Prop()
  currentState!: State;

  get instructionName() {
    return this.currentState.currentInstruction.assemblyInterpretation.split(' ', 1)[0];
  }
}
</script>

<style scoped>
.cpu {
  background-color: var(--cpuBlockColor);
  display: flex;
  flex-direction: column;
  border-radius: calc(var(--borderRadiusSize) * 1.5);
  padding: var(--paddingSize);
  max-height: 100vh;
  box-shadow: 0 0 calc(var(--byteSize) / 0.3) calc(var(--byteSize) / 0.6) var(--shadowIntensity);
}

.upperBlock {
  display: block;
}

.cpuTitle {
  margin-top: var(--paddingSize);
  margin-bottom: var(--paddingSize);
  font-size: calc(var(--byteSize) * 1.6);
  display: inline-block;
  line-height: 0;
}
</style>
