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
 <div class="currentInstructionAssemblyBlock" :id="idAssemblyBlock">
   <div class="assemblyText">{{ currentInstructionAssembly }}</div>
 </div>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator';
import htmlId from '@/services/helper/htmlIds';

@Component({ })
export default class CurrentInstructionAssemblyBlock extends Vue {
  @Prop()
  currentInstructionAssembly!: string;

  private idAssemblyBlock = htmlId.currentInstructionAssemblyBlock;
}
</script>

<style scoped>
.currentInstructionAssemblyBlock {
  --localPadding: calc(var(--paddingSize) * 0.66);
  background-color: var(--currentInstructionAssemblyBlockColor);
  color: var(--currentInstructionAssemblyFontColor);
  display: block;
  border-radius: calc(var(--borderRadiusSize) * 0.66);
  padding: var(--localPadding);
  height: calc(calc(var(--localPadding) * 2) + var(--byteSize));
}
.assemblyText {
  font-size: var(--byteSize);
  font-weight: bold;
  line-height: var(--byteSize);
}
</style>
