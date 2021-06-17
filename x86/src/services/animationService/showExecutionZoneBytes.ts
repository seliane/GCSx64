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

import {
  getAnimationZoneIdFlags, getAnimationZoneIdImmediate,
  getAnimationZoneIdMemory, getAnimationZoneIdRegister,
} from '@/services/helper/htmlIdService';
import { htmlClass } from '@/services/helper/htmlIds';

export function showBytesLocationIDs(locationIds: string[], show: boolean) {
  locationIds.forEach((locationId) => {
    const byteToShowOrHide = document.getElementById(locationId);

    if (byteToShowOrHide) {
      if (show) {
        byteToShowOrHide.classList.add(htmlClass.showBytes);
      } else {
        byteToShowOrHide.classList.remove(htmlClass.showBytes);
      }
    }
  });
}

export function showRegisterBytesExecutionZone(registerName: string, writeAccess: boolean, index: number) {
  const locationId = getAnimationZoneIdRegister(registerName, writeAccess, index);
  return showBytesLocationIDs([locationId], true);
}

export function showMemoryBytesExecutionZone(memoryLineAddress: string, writeAccess: boolean, index: number) {
  const locationId = getAnimationZoneIdMemory(memoryLineAddress, writeAccess, index);
  return showBytesLocationIDs([locationId], true);
}

export function showImmediateBytesExecutionZone(immediateAddress: string, show: boolean) {
  const locationId = getAnimationZoneIdImmediate(immediateAddress);
  return showBytesLocationIDs([locationId], show);
}

export function showFlagBytesExecutionZone(writeAccess: boolean, show: boolean) {
  const locationId = getAnimationZoneIdFlags(writeAccess);
  return showBytesLocationIDs([locationId], show);
}
