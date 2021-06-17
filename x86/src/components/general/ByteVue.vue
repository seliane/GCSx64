<template>
  <div
    :id=byte.locationId
    class="shadowAndBorder"
    :class="{
      'instructionPointer': isInstructionPointer(),
      'unusedByteShadowAndBorder': !isUsedByte(),
    }">
    <div
      v-if="byte && byte.content"
      class="byteElement"
      :class="{
      'unusedByte': !isUsedByte(),
      'instructionByte': isUsedByte() && isInstructionByte(),
      'stackByte': isUsedByte() && isStackByte(),
      'baseByte': isUsedByte() && isBaseByte() && !isStackByte(),
    }">
      {{ byte.content }}
    </div>
    <div v-if="isStackPointer()"
      :class="{'stackPointer': isStackPointer(),}
    ">
    </div>
    <div v-if="isBasePointer()"
       :class="{'basePointer': isBasePointer(),}
    ">
    </div>
    <div v-if="isStackPointer()"
       class="stackPointerText">STACK POINTER
    </div>
    <div v-if="isInstructionPointer()"
       class="instructionPointerText">INSTRUCTION POINTER
    </div>
    <div v-if="isBasePointer()"
       class="basePointerText">BASE POINTER
    </div>
  </div>
</template>

<script lang="ts">
import Byte from '@/services/interfaces/Byte';
import { Prop, Vue, Component } from 'vue-property-decorator';
import ByteInformation, { CodeInformation, PointerInformation } from '@/services/interfaces/ByteInformation';

@Component({})
export default class ByteVue extends Vue {
  @Prop()
  byte!: Byte;

  @Prop()
  byteInformation?: ByteInformation;

  private instructionInfo = this.byteInformation ? this.byteInformation.instructionPointerInformation : undefined;

  private stackInfo = this.byteInformation ? this.byteInformation.stackPointerInformation : undefined;

  private baseInfo = this.byteInformation ? this.byteInformation.basePointerInformation : undefined;

  private localID = parseInt(this.byte.locationId, 16);

  private compareLocalID(other: number): boolean {
    return this.localID === other;
  }

  private containsLocalID(strings: Array<number>): boolean {
    return (strings.findIndex(this.compareLocalID) >= 0);
  }

  private isInRange(code: CodeInformation): boolean {
    return (this.localID >= code.from && this.localID < code.to);
  }

  private isUsedByte(): boolean {
    const code = this.byteInformation ? this.byteInformation.code : undefined;
    if (code && this.isInRange(code)) {
      return true;
    }
    const usedBytes = this.byteInformation ? this.byteInformation.usedBytes : undefined;
    if (usedBytes) {
      return this.containsLocalID(usedBytes);
    }
    return true;
  }

  private isPointer(pointerInfo?: PointerInformation) {
    if (pointerInfo) {
      return this.compareLocalID(pointerInfo.pointerAddress);
    }
    return false;
  }

  private isPointerByte(pointerInfo?: PointerInformation) {
    if (pointerInfo) {
      return this.containsLocalID(pointerInfo.pointerBytes);
    }
    return false;
  }

  private isInstructionPointer() {
    return this.isPointer(this.instructionInfo);
  }

  private isInstructionByte() {
    return this.isPointerByte(this.instructionInfo);
  }

  private isStackPointer() {
    return this.isPointer(this.stackInfo);
  }

  private isStackByte() {
    return this.isPointerByte(this.stackInfo);
  }

  private isBasePointer() {
    return this.isPointer(this.baseInfo);
  }

  private isBaseByte() {
    return this.isPointerByte(this.baseInfo);
  }
}
</script>

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

<style scoped>
.byteElement {
  --margin-ratio: 16;
  border-radius: var(--size);
  background-color: var(--byteBackgroundColor);
  color: var(--byteFontColor);
  display: inline-table;
  font-family: "Roboto Mono", "Fira code", "Fira Mono", Consolas, Menlo, Courier, monospace;
  font-size: var(--size);
  line-height: 1;
  width: calc(var(--size) * 1.5);
  text-align: center;
  padding-bottom: calc(var(--size) / 16);
  z-index: 1;
}

.shadowAndBorder {
  --margin-ratio: 8;
  display: inline-block;
  margin: calc(var(--size) / var(--margin-ratio));
  border-radius: 1000px;
  line-height: 0;
  box-shadow: 0 0 calc(var(--size) / 3) calc(var(--size) / 10) var(--shadowIntensity);
}

.shadowAndBorder, .byteElement {
  --size: var(--byteSize);
  position: relative;
}

.unusedByte {
  background-color: var(--unusedByteBackgroundColor);
  color: var(--unusedByteFontColor);
}

.unusedByteShadowAndBorder {
  box-shadow: none;
}

.instructionByte {
  background-color: var(--instructionByteBackgroundColor);
}

.baseByte {
  background-color: var(--baseByteBackgroundColor);
}

.stackByte {
  background-color: var(--stackByteBackgroundColor);
}

.basePointer, .stackPointer {
  width: 0;
  height: 0;
  border-left: calc(var(--byteSize) * 0.4375) solid transparent;
  border-right: calc(var(--byteSize) * 0.4375) solid transparent;
  position: absolute;
  left: calc(var(--byteSize) * 0.3125);
  z-index: 2;
}

.basePointer {
  animation: basePointerAnimation 1s;
  border-bottom: calc(var(--byteSize) * 0.4375) solid var(--basePointerColor);
  bottom: calc(var(--byteSize) * -0.125);
}

.stackPointer {
  animation: stackPointerAnimation 1s;
  border-top: calc(var(--byteSize) * 0.4375) solid var(--stackPointerColor);
  top: calc(var(--byteSize) * -0.125);
}

/* Make sure no animation is triggered during cloning */
/* This class is added dynamically in the services. Look at htmlClass in htmlIds.ts */
.CopyNode > .basePointer, .CopyNode > .stackPointer {
  animation: none;
}

.shadowAndBorder:hover > .stackPointer {
  transform: rotate(270deg) translate(calc(var(--byteSize) * -0.4375), calc(var(--byteSize) * -0.75));
}

@keyframes stackPointerAnimation {
  0% {
    transform: scale(0.5, 0.5);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityStackPointer);
  }
  50% {
    transform: scale(3, 3);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityStackPointerTransparent);
  }
  100% {
    transform: scale(1, 1);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityStackPointerTransparent);
  }
}

@keyframes basePointerAnimation {
  0% {
    transform: scale(0.5, 0.5);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityBasePointer);
  }
  50% {
    transform: scale(3, 3);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityBasePointerTransparent);

  }
  100% {
    transform: scale(1, 1);
    box-shadow: 0 0 calc(var(--byteSize) * 1.25) calc(var(--byteSize) * 0.9375) var(--shadowIntensityBasePointerTransparent);
  }
}

.stackPointerText, .basePointerText, .instructionPointerText {
  display: none;
}

.shadowAndBorder:hover > .stackPointerText,
.shadowAndBorder:hover > .basePointerText,
.shadowAndBorder:hover > .instructionPointerText {
  line-height: initial;
  font-size: calc(var(--byteSize) * 0.9);
  display: inline;
  width: calc(var(--byteSize) * 4);
  height: calc(var(--byteSize) * 2.5);
  position: absolute;
  text-align: center;
  border-radius: calc(var(--byteSize) * 0.375);
  z-index: 158000;
}

.shadowAndBorder:hover > .stackPointerText {
  bottom: calc(var(--byteSize) * -1);
  left: calc(var(--byteSize) * -4.125);
  color: var(--stackPointerTextFontColor);
  background-color: var(--stackPointerTextBackgroundColor);
  animation: stackPointerTextAnimation 0.2s;
}

@keyframes stackPointerTextAnimation {
  0% {
    left: calc(var(--byteSize) * -1.25);
    transform: scale(0.5, 0.5);
  }
  50% {
    left: calc(var(--byteSize) * -1.25);
    transform: scale(1, 1);
  }
  100% {
  }
}

.shadowAndBorder:hover > .basePointerText {
  bottom: calc(var(--byteSize) * -2.5);
  left: calc(var(--byteSize) * -1.25);
  color: var(--basePointerTextFontColor);
  background-color: var(--basePointerTextBackgroundColor);
  animation: basePointerTextAnimation 0.4s;
}

@keyframes basePointerTextAnimation {
  0% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(0.5, 0.5);
  }
  50% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(1, 1);
  }
  100% {
  }
}

.instructionPointer {
  --borderWidth: calc(var(--byteSize) * 0.125);
  margin: calc(calc(var(--size) / var(--margin-ratio)) - var(--borderWidth));
  border: solid var(--borderWidth) var(--instructionPointerByteBorderColor);
}

.shadowAndBorder:hover > .instructionPointerText {
  line-height: initial;
  width: calc(var(--byteSize) * 6.4);
  height: calc(var(--byteSize) * 2.5);
  bottom: calc(var(--byteSize) * -2.5);
  left: calc(var(--byteSize) * -4.5);
  border: solid var(--instructionPointerTextBorderColor) calc(var(--byteSize) * 0.125);
  background-color: var(--instructionPointerTextBackgroundColor);
  color: var(--instructionPointerTextFontColor);
  animation: instructionPointerTextAnimation 0.4s;
}

@keyframes instructionPointerTextAnimation {
  0% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(0.5, 0.5);
  }
  50% {
    bottom: calc(var(--byteSize) * -0.5);
    transform: scale(1, 1);
  }
  100% {
  }
}
</style>
