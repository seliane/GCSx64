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
<div v-if="currentInstruction" class="currentInstructionBlock" :id="instructionBlockID">
  <div>Current Instruction</div>
  <div class="instructionBytes" v-for="byte in currentInstruction.content" :key="byte.locationId">
    <ByteVue :byte="byte" :id="byte.locationId"/>
  </div>
  <CurrentInstructionAssemblyBlock :current-instruction-assembly="currentInstruction.assemblyInterpretation"/>
</div>
</template>

<script lang="ts">
import CurrentInstructionAssemblyBlock from '@/components/cpu/CurrentInstructionAssemblyBlock.vue';

import { Prop, Vue, Component } from 'vue-property-decorator';
import Instruction from '@/services/interfaces/Instruction';
import ByteVue from '@/components/general/ByteVue.vue';
import htmlId from '@/services/helper/htmlIds';

@Component({
  components: {
    ByteVue,
    CurrentInstructionAssemblyBlock,
  },
})
export default class CurrentInstructionBlock extends Vue {
  @Prop()
  currentInstruction!: Instruction;

  private instructionBlockID = htmlId.currentInstructionBlock;
}

</script>

<style scoped>
.currentInstructionBlock {
  background-color: var(--currentInstructionBlockColor);
  display: block;
  border-radius: var(--borderRadiusSize);
  padding: var(--paddingSize);
  margin-bottom: var(--paddingSize);
  font-size: var(--byteSize);
}

.instructionBytes {
  display: inline;
}
</style>
