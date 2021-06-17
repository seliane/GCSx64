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
  <div class="licenseButtonContainer">
    <q-btn flat label="Licenses" class="licenseButton">
      <q-menu fit>
        <q-list class="licenseMenu">
          <q-item >
            <q-item-section>Licenses for GCSx64 - x86_64 Graphical CPU Simulator</q-item-section>
          </q-item>
          <div  v-for="(license, index) in licenses" :key="index">
            <q-separator />
            <q-item >
              <q-item-section>
                <q-item-label class="licenseItemHeader">{{ license.name }}</q-item-label>
                <q-item-label class="licenseItemText" caption>{{ license.licenseText }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { licensesToShow } from '@/components/licenseButton/licensesToShow';

@Component({ })
export default class LicenseButton extends Vue {
  private licenses = licensesToShow;
}
</script>

<style scoped>
  .licenseButtonContainer {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  .licenseButton {
    color: var(--licenseButtonColor);
  }
  .licenseItemText {
    font-size: calc(var(--byteSize) * 0.875) !important;
    white-space: pre;
  }
  .licenseItemHeader {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .licenseMenu {
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>
