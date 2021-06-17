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
    <MemoryAddress :address="memoryLine.address"/>
    <div class="memoryLineBytes" v-for="byte in memoryLine.dataBytes" :key="byte.locationId">
      <ByteVue :byte="byte" :byte-information="byteInformation"/>
    </div>
  </div>
</template>

<script lang="ts">
import MemoryAddress from '@/components/general/MemoryAddress.vue';
import ByteVue from '@/components/general/ByteVue.vue';

import { Prop, Vue, Component } from 'vue-property-decorator';
import MemoryDataLine from '@/services/interfaces/MemoryDataLine';
import ByteInformation from '@/services/interfaces/ByteInformation';

@Component({
  components: {
    MemoryAddress,
    ByteVue,
  },
})
export default class MemoryLine extends Vue {
  @Prop()
  memoryLine!: MemoryDataLine;

  @Prop()
  byteInformation!: ByteInformation;
}
</script>

<style scoped>
.memoryLineBytes {
  display: inline;
}
</style>
