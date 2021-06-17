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
  <div class="shadowAndBorder">
    <div v-if="address" class="memoryAddressElement" :id="memoryAddressId">
      {{ address.address }}
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator';
import Address from '@/services/interfaces/Address';
import htmlId from '@/services/helper/htmlIds';

@Component({ })
export default class MemoryAddress extends Vue {
  @Prop()
  address!: Address;

  get memoryAddressId() {
    let { addressPrefix } = htmlId;
    if (this.address.pointerName) {
      addressPrefix += `_${this.address.pointerName}`;
    } else {
      addressPrefix += `_${this.address.address}`;
    }
    return addressPrefix;
  }
}
</script>

<style scoped>
.memoryAddressElement {
  border-radius: var(--size);
  background-color: var(--memoryAddressColor);
  color: var(--memoryAddressFontColor);
  font-family: "Roboto Mono", "Fira code", "Fira Mono", Consolas, Menlo, Courier, monospace;
  font-size: var(--size);
  line-height: 1;
  width: calc(var(--size) * 3);
  text-align: center;
  padding-bottom: calc(var(--size) / 16);
  z-index: 1;
}

.shadowAndBorder {
  margin: calc(var(--size) / var(--margin-ratio));
  border-radius: 1000px;
  line-height: 0;
  box-shadow: 0 0 calc(var(--size) / 3) calc(var(--size) / 10) var(--shadowIntensity);
}

.shadowAndBorder, .memoryAddressElement {
  --size: var(--byteSize);
  --margin-ratio: 16;
  display: inline-block;
  position: relative;
}
</style>
