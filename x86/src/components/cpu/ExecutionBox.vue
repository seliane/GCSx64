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
  <div class="animationBytesContainer">
    <div class="leftAnimationBytes">

      <!-- Imm -->
      <div v-if="accessedElements.immediateAccess">
        <div v-for="(line, index) in accessedElements.immediateAccess" :key="index">
          <div class="animationBytesZone" :id="animationZoneIdImmediate(line.address.address)">
            <div class="animationByte" v-for="byte in line.dataBytes" :key="byte.locationId">
              <!-- Duplication to get start and end for animation -->
              <ByteVue class="offsetImmediateToInstructionBox" :byte="byte" :id="byte.locationId"/>
              <ByteVue class="hideBytes" :byte="byte" :id="animationIdImmediate(byte.locationId)"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Memory Read -->
      <div v-if="accessedElements.memoryReadAccess">
        <div v-for="(line, index) in accessedElements.memoryReadAccess" :key="index">
          <div class="animationBytesZone" :id="animationZoneIdMemory(line.address.address, false, index)">
            <div class="animationByte hideBytes" v-for="(byte) in line.dataBytes" :key="byte.locationId">
              <ByteVue :byte="byte" :id="animationIdMemory(byte.locationId, false, index)"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Register Read-->
      <div v-if="accessedElements.registerReadAccess">
        <div v-for="(line, index) in accessedElements.registerReadAccess" :key="index">
          <div class="animationBytesZone" :id="animationZoneIdRegister(line.name, false, index)">
            <div class="animationByte hideBytes" v-for="(byte) in line.content" :key="byte.locationId">
              <ByteVue :byte="byte" :id="animationIdRegister(byte.locationId, false, index)"/>
            </div>
          </div>
        </div>
      </div>

      <!-- FlagTest -->
      <div v-if="accessedElements.flagTestAccess">
        <div class="animationBytesZone" :id="animationZoneIdFlags(false)">
          <div class="animationByte hideBytes" v-for="flag in accessedElements.flagTestAccess" :key="flag.name">
            <ByteVue :byte="flag.content" :id="animationIdFlag(flag.content.locationId, false)"/>
          </div>
        </div>
      </div>

    </div>
    <div class="rightAnimationBytes">

      <!-- MemWrite -->
      <div v-if="accessedElements.memoryWriteAccess">
        <div v-for="(line, index) in accessedElements.memoryWriteAccess" :key="index">
          <div class="animationBytesZone" :id="animationZoneIdMemory(line.address.address, true, index)">
            <div class="animationByte" v-for="(byte) in line.dataBytes" :key="byte.locationId">
              <ByteVue :byte="byte" :id="animationIdMemory(byte.locationId, true, index)"/>
            </div>
          </div>
        </div>
      </div>

      <!-- RegWrite -->
      <div v-if="accessedElements.registerWriteAccess">
        <div v-for="(line, index) in accessedElements.registerWriteAccess" :key="index">
          <div class="animationBytesZone" :id="animationZoneIdRegister(line.name, true, index)">
            <div class="animationByte" v-for="(byte) in line.content" :key="byte.locationId">
              <ByteVue :byte="byte" :id="animationIdRegister(byte.locationId, true, index)"/>
            </div>
          </div>
        </div>
      </div>

      <!-- FlagWrite -->
      <div v-if="accessedElements.flagWriteAccess">
        <div class="animationBytesZone" :id="animationZoneIdFlags(true)">
          <div class="animationByte"  v-for="flag in accessedElements.flagWriteAccess" :key="flag.name">
            <ByteVue :byte="flag.content" :id="animationIdFlag(flag.content.locationId, true)"/>
          </div>
        </div>
      </div>

    </div>
    <div :id="magicBox" class="magicBox">
      <div class="leftText">
        <div v-for="(item, index) in leftText" :key="index">
          <div class="leftTextItem">{{item}}</div>
        </div>
      </div>
      <div class="instructionNameClass">
        {{instructionName}}
      </div>
      <div class="rightText">
        <div v-for="(item, index) in rightText" :key="index">
          <div class="rightTextItem">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ByteVue from '@/components/general/ByteVue.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  getInputNamesForExecutionBox,
  getOutputNamesForExecutionBox,
} from '@/services/dataServices/accessedElementsService';
import AccessedElements from '@/services/interfaces/AccessedElements';
import {
  getAnimationIdFlag,
  getAnimationIdImmediate,
  getAnimationIdMemory,
  getAnimationIdRegister,
  getAnimationZoneIdFlags,
  getAnimationZoneIdImmediate,
  getAnimationZoneIdMemory,
  getAnimationZoneIdRegister,
} from '@/services/helper/htmlIdService';
import htmlId from '@/services/helper/htmlIds';

@Component({
  components: {
    ByteVue,
  },
})
export default class ExecutionBox extends Vue {
  @Prop()
  accessedElements!: AccessedElements;

  @Prop()
  instructionName!: string;

  private magicBox = htmlId.magicBox;

  get leftText() {
    return getInputNamesForExecutionBox(this.accessedElements);
  }

  get rightText() {
    return getOutputNamesForExecutionBox(this.accessedElements);
  }

  // eslint-disable-next-line class-methods-use-this
  animationIdRegister(locationId: string, write: boolean, index: number): string {
    return getAnimationIdRegister(locationId, write, index);
  }

  // eslint-disable-next-line class-methods-use-this
  animationIdMemory(locationId: string, write: boolean, index: number): string {
    return getAnimationIdMemory(locationId, write, index);
  }

  // eslint-disable-next-line class-methods-use-this
  animationIdFlag(locationId: string, write: boolean): string {
    return getAnimationIdFlag(locationId, write);
  }

  // eslint-disable-next-line class-methods-use-this
  animationIdImmediate(locationId: string): string {
    return getAnimationIdImmediate(locationId);
  }

  // eslint-disable-next-line class-methods-use-this
  animationZoneIdRegister(name: string, write: boolean, index: number): string {
    return getAnimationZoneIdRegister(name, write, index);
  }

  // eslint-disable-next-line class-methods-use-this
  animationZoneIdMemory(address: string, write: boolean, index: number): string {
    return getAnimationZoneIdMemory(address, write, index);
  }

  // eslint-disable-next-line class-methods-use-this
  animationZoneIdFlags(write: boolean): string {
    return getAnimationZoneIdFlags(write);
  }

  // eslint-disable-next-line class-methods-use-this
  animationZoneIdImmediate(address: string): string {
    return getAnimationZoneIdImmediate(address);
  }
}
</script>

<style scoped>

/* Execution Box - START */
.magicBox {
  background-color: var(--executionBoxColor);
  color: var(--executionBoxFontColor);
  height: var(--fullHeight);
  width: var(--boxWidth);
  display: flex;
  position: absolute;
  z-index: 1;
  border-radius: calc(var(--borderRadiusSize) * 0.66);
  padding: calc(var(--byteSize) * 0.68) 0;
  justify-content: space-between;
  transform: translateX(calc(var(--fullWidth) - var(--boxWidth)));
  font-size: calc(var(--byteSize) * 1);
  line-height: calc(var(--byteSize) * 1.25);
}

.leftTextItem {
  padding-left: calc(var(--byteSize) * 0.3125);
  margin: calc(var(--byteSize) * 0.125) 0;
}

.rightTextItem {
  padding-right: calc(var(--byteSize) * 0.3125);
  margin: calc(var(--byteSize) * 0.125) 0;
  text-align: end;
}

.instructionNameClass {
  font-size: calc(var(--byteSize) * 2.5);
  padding: calc(var(--byteSize) * 1.5) calc(var(--byteSize) * 4);
  position: absolute;
}
/* This class is added dynamically in the services. Look at htmlClass in htmlIds.ts */
.magicBoxLeft {
  animation: animateMagicBoxLeft 0.5s;
  transform: translateX(0px) !important;
}

@keyframes animateMagicBoxLeft {
  from {
    transform: translateX(calc(var(--fullWidth) - var(--boxWidth)));
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes animateMagicBoxRight {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(calc(var(--fullWidth) - var(--boxWidth)));
  }
}
/* Execution Box - END */

/* Animation Bytes - START */
.animationBytesContainer {
  --fullWidth: calc(var(--byteSize) * 29);
  --fullHeight: calc(var(--byteSize) * 7.6);
  --boxWidth: calc(var(--byteSize) * 14.5);
  --byteZonesWidth: calc(var(--byteSize) * 14);
  --paddingExecBoxY: calc(var(--byteSize) * 0.68);
  --paddingExecBoxX: calc(var(--byteSize) * 0.25);
  display: flex;
  width: var(--fullWidth);
  justify-content: space-between;
  height: var(--fullHeight);
  margin-bottom: var(--paddingSize);
}

.leftAnimationBytes {
  padding: var(--paddingExecBoxY) 0 var(--paddingExecBoxY) var(--paddingExecBoxX);
}

.rightAnimationBytes {
  padding: var(--paddingExecBoxY) var(--paddingExecBoxX) var(--paddingExecBoxY) 0;
}

.animationBytesZone {
  width: var(--byteZonesWidth);
  background-color: var(--executionBoxByteZoneColor);
  border-radius: calc(var(--byteSize) * 0.625);
  padding: 0;
  margin: calc(var(--byteSize) * 0.125) 0;
  line-height: 0;
}

.animationBytesZone .hideBytes {
  visibility: hidden;
}
/* This class is added dynamically in the services. Look at htmlClass in htmlIds.ts */
.showBytes .hideBytes {
  visibility: visible !important;
}

.animationByte {
  display: inline;
}

/* To get a start and end for the immediate animation we duplicate the */
/* immediate byte in html take it out of the flow and move the start   */
/* byte to the current instruction box below the assembly.             */
.offsetImmediateToInstructionBox {
  --offsetPadding: calc(var(--paddingSize) * 2);
  --offsetPaddingBox: calc(var(--paddingExecBoxY) *2);
  --offsetPaddingFinal: calc(calc(var(--offsetPadding) + var(--offsetPaddingBox)) * -1);
  --offsetX: calc(var(--byteSize) * 8);
  transform: translate(var(--offsetX), var(--offsetPaddingFinal));
  position: absolute;
}
/* Animation Bytes - END */
</style>
