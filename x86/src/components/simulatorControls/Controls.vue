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
  <div class="menus">
    <q-btn outline class="editor-button" :loading="isLoading" color="secondary" @click="backToEditor()" label="Back to Editor">
      <q-tooltip content-style="font-size: 16px" anchor="bottom middle" self="top middle">
        <span>Go back to code editor</span>
      </q-tooltip>
    </q-btn>
    <q-btn class="menu" color="accent" label="Assembly Code" @click="showingCode = false">
      <q-menu fit>
        <q-item class="menuItemContainer">
          <q-item-section>
            <q-item-label class="menuItemText codeText">{{assemblyCode}}</q-item-label>
          </q-item-section>
          <q-tooltip content-style="font-size: 16px" anchor="bottom middle" self="top middle">
            <span>Go back to the editor to change your code.</span>
          </q-tooltip>
        </q-item>
      </q-menu>
      <q-tooltip v-model="showingCode" content-style="font-size: 16px" anchor="bottom middle" self="top middle">
        <span>Show the input program code</span>
      </q-tooltip>
    </q-btn>
    <q-btn class="menu" color="accent" label="Change Log" @click="showingLog = false">
      <q-menu fit>
        <div v-if="changeHistory.length > 0">
          <q-list v-for="(changeHistoryItem, index) in changeHistory" :key="index">
            <q-item class="menuItemContainer changeLogCard">
              <q-item-section>
                <q-item-label class="menuItemText">{{changeHistoryItem.instruction}}</q-item-label>
                <div v-for="(element, indexElement) in changeHistoryItem.changedElements" :key="indexElement">
                  <q-item-label class="menuItemText" caption lines="2">{{ element }}</q-item-label>
                </div>
              </q-item-section>
              <q-item-section side top>
                <q-badge outline color="primary">
                  {{ index + 1 }}
                </q-badge>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div v-else>
          <q-item class="menuItemContainer changeLogCardEmpty">
            <q-item-section>
              <q-item-label class="menuItemText">Nothing has changed yet</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-menu>
      <q-tooltip v-model="showingLog" content-style="font-size: 16px" anchor="bottom middle" self="top middle">
        <span>Show past instructions and changes</span>
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ChangeHistory } from '@/services/interfaces/State';
import { routeCodeEditorWithCode } from '@/router';

@Component({ })
export default class Controls extends Vue {
    @Prop()
    assemblyCode!: string;

    @Prop()
    changeHistory!: Array<ChangeHistory>;

    private showingLog = false;

    private showingCode = false;

    private isLoading = false;

    // eslint-disable-next-line class-methods-use-this
    data() {
      return {
        showingLog: false,
        showingCode: false,
      };
    }

    backToEditor() {
      this.isLoading = true;
      const wait = new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
      Promise.all([wait]).then(async () => {
        const base64AssemblyFromURLEditor = this.$route.params.base64AssemblyFromURLSimulator;
        await this.$router.push({ name: routeCodeEditorWithCode, params: { base64AssemblyFromURLEditor } });
      });
    }
}
</script>

<style scoped>
.menus {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.menu, .editor-button {
  width: var(--buttonWidth);
}
.menuItemText {
  letter-spacing: +1px;
  margin-bottom: 5px;
}
.menuItemContainer {
  margin-top: 10px;
  margin-bottom: 10px;
}
.codeText {
  white-space: pre;
  line-height: 1.8em !important;
  min-width: 150px;
}
.changeLogCard {
  min-width: 310px;
}
.changeLogCardEmpty {
  min-width: 250px;
}
</style>
