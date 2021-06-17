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
  <div></div>
</template>

<script>
export default {
  name: 'Colors',
};
</script>

<style>
:root {
  /* Main font color */
  --baseFontColor: #000;

  /* Memory */
  --memoryAddressColor:  #ffff64;
  --memoryAddressFontColor: black;
  --memoryBlockColor:  #f9c9d0;

  /* CPU */
  --cpuBlockColor: #ccebf5;
  --currentInstructionBlockColor: #5cafff;
  --currentInstructionAssemblyBlockColor: #ffffff;
  --currentInstructionAssemblyFontColor: black;
  --executionBoxColor:  #7fcc62;
  --executionBoxFontColor: black;
  --executionBoxByteZoneColor: #0000001c;

  --instructionPointerBlockColor: #ffffc6;
  --registerBlockColor: #ff6161;;
  --registerColor: #ffffff7a;

  /* Main background color */
  --backgroundColor: #e9e9e9;

  /* Attention animation color */
  --attentionPulseColor: #ccaa2c;

  /* CPU Cycle Box */
  --cpuCycleBoxBorderColor: #ccc;
  --currentStepBackgroundColor: orange;
  --pastStepAvatarBackgroundColor: floralwhite;
  --pastStepAvatarFontColor: lightgrey;
  --currentStepAvatarBackgroundColor: floralwhite;
  --currentStepAvatarFontColor: black;
  --currentStepFontColor: black;
  --pastStepFontColor: black;

  /* Editor */
  --editorBackgroundColor: #2d2d2d;
  --editorFontColor: #ccc;
  --editorBoxBackgroundColor: #d0d6ff;
  --editorErrorBoxColor: #b32727;
  --editorErrorBoxFontColor: #FFFFFF;
  --licenseButtonColor: #808080;

  /* Byte color */
  --byteBackgroundColor: white;
  --byteFontColor: black;
  --unusedByteBackgroundColor: #ffffff7a;
  --unusedByteFontColor: #00000033;
  --instructionByteBackgroundColor: lightgoldenrodyellow;
  --baseByteBackgroundColor: lightblue;
  --stackByteBackgroundColor: #F9BDA5;
  --basePointerColor: #0004ff;
  --stackPointerColor: #931953;
  --stackPointerTextFontColor: white;
  --basePointerTextFontColor: white;
  --instructionPointerTextFontColor: black;
  --stackPointerTextBackgroundColor: #931953;
  --basePointerTextBackgroundColor: #0004ff;
  --instructionPointerTextBackgroundColor: #fafad2;
  --instructionPointerTextBorderColor: #0e00f2;
  --instructionPointerByteBorderColor: #1000ff;

  /* Quasar related colors like buttons */
  --quasarPrimary: #027BE3;
  --quasarSecondary: #26A69A;
  --quasarAccent: #9C27B0;
  --quasarDark: #1D1D1D;
  --quasarPositive: #21BA45;
  --quasarNegative: #C10015;
  --quasarInfo: #31CCEC;
  --quasarWarning: #F2C037;
}

:root {
  color: var(--baseFontColor);
}
</style>
