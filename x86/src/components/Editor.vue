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
  <div class="screenFlex">
    <div class="assemblyBox">
      <div class="boxTitle">x64 GRAPHICAL CPU SIMULATOR</div>
      <div>Load Example Programs</div>
      <div class="buttonFlex">
        <q-btn class="programButtons" v-for="(program, index) in demoPrograms" :key="index" color="primary" @click="loadDemoCode(program.program)">
          {{program.label}}
        </q-btn>
      </div>
      <div>x64 Assembly (Nasm Syntax)</div>
      <div class="editorBox">
        <div class="editorOutside" :class="{ 'editorOnError': hasError() }">
          <div class="editorFlex">
            <prism-editor class="editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
          </div>
        </div>
        <div class="errorBox" v-if="hasError()">{{ error }}</div>
        <div class="startButton">
          <q-btn color="secondary" label="Start Program" :loading="isLoading" @click="goToSimulator"/>
        </div>
      </div>
    </div>
    <LicenseButton class="licenseMenuButton"></LicenseButton>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-nasm';
import 'prismjs/themes/prism-tomorrow.css';
import { nasm } from '@/services/nasm/nasm';
import uInt8ArrayToHexStringArray from '@/services/helper/uInt8ArrayHelper';
import demoPrograms from '@/services/editorService/demoPrograms';
import LicenseButton from './licenseButton/licenseButton.vue';

@Component({
  components: {
    PrismEditor,
    LicenseButton,
  },
})
export default class Editor extends Vue {
  @Prop()
  base64AssemblyFromURLEditor!: string;

  private code: string = this.loadDefaultCode();

  private machineCode = Uint8Array.from([]);

  private base64code = '';

  private error = '';

  private isLoading = false;

  private demoPrograms = demoPrograms;

  private hasError(): boolean {
    return (this.error !== '');
  }

  @Watch('$route', { immediate: true, deep: true })
  async loadDataFromURL() {
    try {
      if (this.base64AssemblyFromURLEditor) {
        this.base64Decode();
      }
    } catch {
      await this.$router.push('/fail');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  highlighter(codeToHighlight: string) {
    return highlight(codeToHighlight, languages.nasm, 'nasm');
  }

  base64Encode() {
    this.base64code = btoa(this.code);
  }

  base64Decode() {
    this.code = atob(this.base64AssemblyFromURLEditor);
  }

  async assembleCode() {
    this.machineCode = Uint8Array.from([]);
    this.error = '';

    try {
      this.machineCode = await nasm(this.code);
      if (this.machineCode.length === 0) {
        this.error = 'The machine code of your assembly program is empty.';
        this.isLoading = false;
      }
      this.base64Encode();
    } catch (e) {
      this.isLoading = false;
      this.error = e;
    }
  }

  getMachineCodeStringForURL(): string {
    const uInt8ArrayMachineCode = Uint8Array.from(this.machineCode);
    return uInt8ArrayToHexStringArray(uInt8ArrayMachineCode).toString();
  }

  async setBase64CodeToEditorURL() {
    const newRoute = `/editor/${this.base64code}`;
    if (newRoute !== this.$router.currentRoute.path) {
      return this.$router.push({ path: `/editor/${this.base64code}` });
    }
    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  loadDefaultCode() {
    return demoPrograms[0].program;
  }

  loadDemoCode(code: string) {
    this.code = code;
  }

  async navigateToSimulator() {
    return this.$router.push({ path: `/simulator/${this.getMachineCodeStringForURL()}/${this.base64code}` });
  }

  async goToSimulator() {
    this.isLoading = true;
    // Without wait, loading spinner on button does not appear.
    const wait = new Promise((resolve) => {
      setTimeout(resolve, 540);
    });

    Promise.all([this.assembleCode(), wait]).then(async () => {
      if (this.error === '') {
        await this.setBase64CodeToEditorURL().then(async () => {
          await this.navigateToSimulator();
        });
      }
    });
  }
}
</script>

<style scoped>
.licenseMenuButton {
  display: flex;
}

.editorOutside, .editorFlex, .editorBox {
  overflow: hidden;
  display: flex;
  width: 100%;
}

.editorOutside {
  border-radius: var(--borderRadiusSize);
  margin-bottom: var(--paddingSize);
}

.editorBox {
  flex-direction: column;
}

.editor {
  background: var(--editorBackgroundColor);
  color: var(--editorFontColor);
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  width: 100%;
  padding: var(--paddingSize);
  height: calc(var(--byteSize) * 25);
  max-height: calc(var(--byteSize) * 36.875);
}

.editorOnError {
  margin-bottom: 0;
  border-radius: var(--borderRadiusSize) var(--borderRadiusSize) 0 0;
}

.errorBox {
  background-color: var(--editorErrorBoxColor);
  color: var(--editorErrorBoxFontColor);
  padding: var(--paddingSize);
  border-radius: 0 0 var(--borderRadiusSize) var(--borderRadiusSize);
  margin-bottom: var(--paddingSize);
  width: 100%;
}

.assemblyBox, .screenFlex, .buttonFlex, .startButton {
  display: flex;
}

.assemblyBox {
  background-color: var(--editorBoxBackgroundColor);
  border-radius: var(--borderRadiusSize);
  padding: var(--paddingSize);
  max-height: 98vh;
  width: 50%;
  box-shadow: 0 0 calc(var(--byteSize) / 0.3) calc(var(--byteSize) / 0.6) var(--shadowIntensity);
  flex-direction: column;
}

.screenFlex {
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  align-items: center;
  align-content: center;
  justify-content: space-evenly;
}

.boxTitle {
  margin-top: var(--paddingSize);
  margin-bottom: var(--paddingSize);
  font-size: calc(var(--byteSize) * 1.6);
  display: inline-block;
  line-height: 0;
}

.programButtons {
  width: calc(var(--byteSize) * 6.5);
  margin-right: var(--paddingSize);
}

.buttonFlex {
  margin-bottom: var(--paddingSize);
}

.startButton {
  justify-content: center;
}
</style>
