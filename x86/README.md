# GCSx64 - x86_64 Graphical CPU Simulator - Setup

*For all commands make sure you are in the `x86` directory, not in the repository root.*

## Project setup and build
This project uses [npm](https://www.npmjs.com/) for packaging and dependency management. npm comes usually with [node.js](https://nodejs.org/en/).

**1. Navigate to the x86 directory**
```
cd x86
```

**2. Install dependencies**

```
npm install
```
**3. Increase memory limit**

Building can cause out of memory errors to occurs when running node binaries. To avoid this use the NODE_OPTIONS environment variable to increase the memory limit. 

Windows powershell:
```
set NODE_OPTIONS=--max_old_space_size=4096
```

Linux and macOS:
```
export NODE_OPTIONS=--max_old_space_size=4096
```

**4. Build**

Build and pack into a single HTML for production

Can take up to 30 minutes
```
npm run build
```
Build artefact: ```x86/dist/index.html```

## Development

Open the `x86` directory with an IDE like JetBrains WebStorm

**Builds, starts and hot-reloads the app for development**

Takes quite long the first time
```
npm run serve
```
*Use `CTRL`+ `C` to stop the app.*

**Build and pack into a single HTML for production**

Can take up to 30 minutes
```
npm run build
```
Build artefact: ```x86/dist/index.html```

**Run unit tests**

```
npm run test:unit
```

**Lint the project**

```
npm run lint
```

**Lint the project and fixes files**

```
npm run lint --fix
```


## Overview


- Project is written in [TypeScript](https://www.typescriptlang.org) as a [Vue.js](https://vuejs.org/) single page application
- [Quasar Vue CLI Plugin](https://quasar.dev/start/vue-cli-plugin) was used for some GUI elements




## External libraries used

External C/C++ libraries are ported to JavaScript using [Emscripten](https://emscripten.org/).

### Building external libraries
Build manuals and patches for external libraries can be found in [libraryPatches](libraryPatches).

#### Unicorn.js

For the x64 emulation we use the [Unicorn Engine](https://www.unicorn-engine.org/). 
We use converted, modified and extended wrapper code from [Unicorn.js](https://github.com/AlexAltea/unicorn.js/blob/7ccd46b951f1df4c35f540acc5d5bc030a6f593d/src/unicorn-wrapper.js) in the [emulatorService](src/services/emulator/emulatorService.ts).

#### Capstone.js

To get instruction details we use the [Capstone disassembly engine](http://www.capstone-engine.org/).
We use converted, modified and extended wrapper code from [Capstone.js](https://github.com/AlexAltea/capstone.js/blob/75c34477675318ab3423a0c8236eb96b8abed39b/src/capstone-wrapper.js) in the [disassemblerService](src/services/disassembler/disassemblerService.ts).

#### NASM and NDISAM

To assemble and disassemble we use [Netwide Assembler and Disassembler](https://www.nasm.us).

## Project structure
- [lib](lib) contains modified and compiled external libraries. Build manuals and patches can be found in [libraryPatches](libraryPatches).
- [public](public) contains the main html file that Vue injects its code into
- [src](src) contains the project code
    - [components](src/components) contains Vue pages and components
    - [router](src/router) contains Vue router setup for page navigation
    - [services](src/services) contains application logic and access to external libraries
    - [styles](src/styles) contains CSS for Quasar
- [tests](tests) contains unit tests for Vue components and services
- [typescriptTypes](typescriptTypes) contains declarations for TypeScript
- [vue.config.js](vue.config.js) configuration to set up webpack single HTML file bundling
- web project related files


## Introduction to Vue.js

- [VUE Introduction](https://vuejs.org/v2/guide/index.html) (scrolling down on this page should give a good overview)

- [VUE + TypeScript Class decorators Introduction](https://www.sitepoint.com/class-based-vue-js-typescript/) (the @Component and @Prop syntax)

- [More TypeScript with vue](https://ordina-jworks.github.io/frontend/2019/03/04/vue-with-typescript.html)

- [Vue CLI Quasar Plugin](https://quasar.dev/start/vue-cli-plugin)

- [Quasar Vue GUI Component Examples](https://quasar.dev/vue-components/button)
