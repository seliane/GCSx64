/* SPDX-License-Identifier: GPL-2.0-only */
/*
* GCSx64 - x86_64 Graphical CPU Simulator
*
* Copyright © 2021 by Eliane Schmidli seliane.github@gmail.com and Yves Boillat yvbo@protonmail.com
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
* along with GCSx64.  If not, see https://www.gnu.org/licenses/ .
*/

<template>
  <div class="background">
    <Layout/>
    <Scaling/>
    <Colors/>
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Layout from '@/components/colorAndLayout/Layout.vue';
import Colors from '@/components/colorAndLayout/Colors.vue';
import Scaling from '@/components/colorAndLayout/Scaling.vue';

export default {
  name: 'LayoutDefault',

  components: {
    Scaling,
    Colors,
    Layout,
  },
};
</script>

<style>
.background {
  background-color: var(--backgroundColor);
  font-family: "Roboto Mono", "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
}

body {
  overscroll-behavior: none;
}
</style>
