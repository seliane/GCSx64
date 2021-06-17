/* SPDX-License-Identifier: GPL-2.0-only */
/*
 * GCSx64 - x86_64 Graphical CPU Simulator
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

const htmlId = {
  currentInstructionAssemblyBlock: 'currentInstructionAssemblyBlock',
  currentInstructionBlock: 'currentInstructionBlock',
  instructionPointerBlock: 'instructionPointerBlock',
  ipBlock: 'ipBlock',
  magicBox: 'magicBox',
  locationIdPrefixCurrentInstruction: 'CurrInstr',
  locationIdPrefixImmediate: 'immediate',
  addressPrefix: 'Address',
  clonePrefix: 'Clone',
  animateWrite: 'animate_write_',
  animateRead: 'animate_read_',
  animatePrefix: 'animate_',
  animateImmZone: 'animate_imm_zone_',
  animateReadZone: 'animate_read_zone_',
  animateWriteZone: 'animate_write_zone_',
  animateReadZoneFlags: 'animate_read_zone_flags',
  animateWriteZoneFlags: 'animate_write_zone_flags',
};
export default htmlId;

// If you change the class names here you must also
// change them in the corresponding vue components
export const htmlClass = {
  // classes from AnimationHelper.vue
  moveByte: 'moveByte',
  attention: 'attention',
  hide: 'hide',
  pulse: 'pulse',
  attentionPulse: 'attentionPulse',
  // classes from ExecutionBox.vue
  magicBoxLeft: 'magicBoxLeft',
  showBytes: 'showBytes',
  // classes from ByteVue.vue
  copyNode: 'CopyNode',
  // classes from Quasar
  qPageContainer: 'q-page-container',
};
