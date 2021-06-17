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
<div class="instructionPointerBlock" :id="instructionPointerBlock">
  <div class="title">Instruction Pointer</div>
  <MemoryAddress id="ipBlock" :address="instructionPointerAddress"/>
</div>
</template>

<script lang="ts">
import MemoryAddress from '@/components/general/MemoryAddress.vue';

import { Prop, Vue, Component } from 'vue-property-decorator';
import InstructionPointer from '@/services/interfaces/InstructionPointer';
import htmlId from '@/services/helper/htmlIds';

@Component({
  components: {
    MemoryAddress,
  },
})
export default class InstructionPointerBlock extends Vue {
  @Prop()
  instructionPointer!: InstructionPointer;

  get instructionPointerAddress() {
    const { address } = this.instructionPointer;
    const instructionPointerRegister = 'RIP';
    address.pointerName = instructionPointerRegister;
    return address;
  }

  private instructionPointerBlock = htmlId.instructionPointerBlock;
}
</script>

<style scoped>
.instructionPointerBlock {
  background-color: var(--instructionPointerBlockColor);
  display: block;
  border-radius: var(--borderRadiusSize);
  padding: var(--paddingSize);
  margin-bottom: var(--paddingSize);
  font-size: var(--byteSize);
}

.title {
  display: inline;
}
</style>
