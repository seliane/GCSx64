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
  <div class="flagElements">
    <div class="flagTitle">Flags:</div>
    <div  class="flagContainer" v-for="(flag, index) in flags" :key="index">
      <div class="flag">{{ flag.name }}</div>
      <ByteVue :byte="flag.content"/>
    </div>
  </div>
</template>

<script lang="ts">
import ByteVue from '@/components/general/ByteVue.vue';
import { Prop, Vue, Component } from 'vue-property-decorator';
import Flag from '@/services/interfaces/Flag';

@Component({
  components: {
    ByteVue,
  },
})
export default class FlagsVue extends Vue {
  @Prop()
  flags!: Array<Flag>;
}
</script>

<style scoped>
.flagElements {
  background-color: var(--registerColor);
  display: inline-block;
  border-radius: 100px;
  padding: calc(var(--byteSize) * 0.1);
}

.flagContainer, .flag, .flagTitle{
  display: inline;
}

.flagTitle {
  font-size: calc(var(--byteSize) * 1);
  line-height: 0;
  padding-left: calc(var(--byteSize) * 0.3);
}

.flag, .flagElements {
  font-size: calc(var(--byteSize) * 0.8);
}

.flag, ByteVue {
  margin-right: 2px;
}

</style>
