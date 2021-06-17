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
    <div class="registerElement">
      <div class="registerName">{{ register.name }}</div>
      <div class="registerBytes" v-for="byte in register.content" :key="byte.locationId">
        <ByteVue :byte="byte"/>
      </div>
    </div>
    <div v-if=isPointer class="registerAddress">
      <MemoryAddress :address=address></MemoryAddress>
    </div>
    <q-tooltip v-if=isPointer content-style="font-size: 16px" anchor="center right" self="center right" :offset="[200, 0]">
      <span>{{ pointerName() }} Register</span>
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import ByteVue from '@/components/general/ByteVue.vue';
import Register from '@/services/interfaces/Register';
import { Prop, Vue, Component } from 'vue-property-decorator';
import Address from '@/services/interfaces/Address';
import MemoryAddress from '@/components/general/MemoryAddress.vue';

@Component({
  components: {
    ByteVue,
    MemoryAddress,
  },
})
export default class RegisterVue extends Vue {
  @Prop()
  register!: Register;

  get isPointer() {
    return this.register.name === 'RSP' || this.register.name === 'RBP';
  }

  get address() {
    const address = this.isPointer ? this.getAddressFromRegister() : undefined;
    if (address) {
      address.pointerName = this.register.name;
    }
    return address;
  }

  private pointerName(): string {
    let pointerName = '';
    if (this.isPointer) {
      if (this.register.name === 'RSP') {
        pointerName = 'Stack Pointer';
      } else if (this.register.name === 'RBP') {
        pointerName = 'Base Pointer';
      }
    }
    return pointerName;
  }

  private getAddressFromRegister(): Address {
    const firstByte = this.register.content[0].content;
    const secondByte = this.register.content[1].content;
    const addressString = secondByte.concat(firstByte);
    return {
      address: addressString,
    };
  }
}
</script>

<style scoped>
.registerElement {
  background-color: var(--registerColor);
  border-radius: 100px;
  padding: calc(var(--byteSize) * 0.1);
  display: inline-block;
  font-size: calc(var(--byteSize) * 0.8);
}
.registerAddress, .registerName, .registerBytes {
  display: inline;
}
.registerName {
  font-size: calc(var(--byteSize) * 1);
  line-height: 0;
  padding-left: calc(var(--byteSize) * 0.3);
}
.registerBytes {
  font-size: calc(var(--byteSize) * 0.5);
}
</style>
