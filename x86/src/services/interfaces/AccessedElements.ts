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

import MemoryDataLine from '@/services/interfaces/MemoryDataLine';
import Register from '@/services/interfaces/Register';
import Flag from '@/services/interfaces/Flag';

interface AccessedElements {
  memoryWriteAccess: Array<MemoryDataLine>;
  memoryReadAccess: Array<MemoryDataLine>;
  registerReadAccess: Array<Register>;
  registerWriteAccess: Array<Register>;
  immediateAccess: Array<MemoryDataLine>;
  flagTestAccess: Array<Flag>;
  flagWriteAccess: Array<Flag>;
}
export default AccessedElements;

export interface MemoryHookInformation {
  addrLo: number;
  addrHi: number;
  size: number;
  valueLo: number;
  valueHi: number;
}
