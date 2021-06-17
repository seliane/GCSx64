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
<div class="registerBlockElement">
  <div class="registerTitle">Register</div>
  <div class="registerListFlex">
    <div class="registerList">
      <div class="registerArea" v-for="register in registers" :key="register.name">
        <RegisterVue :register="register" />
      </div>
      <Flags :flags="flags" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Register from '@/services/interfaces/Register';
import RegisterVue from '@/components/cpu/RegisterVue.vue';
import { Prop, Vue, Component } from 'vue-property-decorator';
import Flags from '@/components/cpu/Flags.vue';
import Flag from '@/services/interfaces/Flag';

@Component({
  components: {
    Flags,
    RegisterVue,
  },
})
export default class RegisterBlock extends Vue {
  @Prop()
  registers!: Array<Register>;

  @Prop()
  flags!: Array<Flag>;
}
</script>

<style scoped>
.registerBlockElement {
  background-color: var(--registerBlockColor);
  display: flex;
  flex-direction: column;
  border-radius: var(--borderRadiusSize);
  padding: var(--paddingSize);
  min-height: calc(var(--byteSize) * 6.5);
  max-height: calc(var(--byteSize) * 19);
}

.registerListFlex {
  display: flex;
  height: calc(100% - calc(var(--paddingSize) * 1));
  overflow: hidden;
}

.registerList {
  overflow-y: scroll;
  overflow-x: visible;
}

.registerArea {
  line-height: 0;
  margin: calc(var(--byteSize) * 0.3) 0;
}

.registerTitle {
  font-size: calc(var(--byteSize) * 1);
}
</style>
