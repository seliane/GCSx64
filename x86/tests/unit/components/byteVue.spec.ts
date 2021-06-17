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

import { shallowMount } from '@vue/test-utils';
import ByteVue from '@/components/general/ByteVue.vue';
import { expect } from 'chai';
import ByteInformation, {
  CodeInformation,
  PointerInformation,
} from '@/services/interfaces/ByteInformation';

describe('ByteVue.vue Component', () => {
  it('renders Byte content when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: { byte: { content: '20', locationId: '8000' } },
    });
    expect(wrapper.text()).to.include('20');
  });
});

const localIdOfTestByte = 0x0002;

const pointerInformationSet: PointerInformation = {
  pointerAddress: localIdOfTestByte,
  pointerBytes: [0x0000, localIdOfTestByte],
};

const pointerInformationNotSet: PointerInformation = {
  pointerAddress: 0x0003,
  pointerBytes: [0x0000, 0x0003],
};

const emptyPointerInformation: PointerInformation = {
  pointerAddress: 0,
  pointerBytes: [],
};

const code: CodeInformation = {
  from: 0,
  to: 0,
};

const byteInformationAllSet: ByteInformation = {
  basePointerInformation: pointerInformationSet,
  stackPointerInformation: pointerInformationSet,
  instructionPointerInformation: pointerInformationSet,
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationInstructionPointerSet: ByteInformation = {
  basePointerInformation: pointerInformationNotSet,
  stackPointerInformation: pointerInformationNotSet,
  instructionPointerInformation: {
    pointerAddress: localIdOfTestByte,
    pointerBytes: [0x0000, 0x0003],
  },
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationStackPointerSet: ByteInformation = {
  basePointerInformation: pointerInformationNotSet,
  stackPointerInformation: {
    pointerAddress: localIdOfTestByte,
    pointerBytes: [0x0000, 0x0003],
  },
  instructionPointerInformation: pointerInformationNotSet,
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationBasePointerSet: ByteInformation = {
  basePointerInformation: {
    pointerAddress: localIdOfTestByte,
    pointerBytes: [0x0000, 0x0003],
  },
  stackPointerInformation: pointerInformationNotSet,
  instructionPointerInformation: pointerInformationNotSet,
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationInstructionBytesSet: ByteInformation = {
  basePointerInformation: pointerInformationNotSet,
  stackPointerInformation: pointerInformationNotSet,
  instructionPointerInformation: {
    pointerAddress: 0x0003,
    pointerBytes: [0x0000, localIdOfTestByte],
  },
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationStackBytesSet: ByteInformation = {
  basePointerInformation: pointerInformationNotSet,
  stackPointerInformation: {
    pointerAddress: 0x0003,
    pointerBytes: [0x0000, localIdOfTestByte],
  },
  instructionPointerInformation: pointerInformationNotSet,
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationBaseBytesSet: ByteInformation = {
  basePointerInformation: {
    pointerAddress: 0x0003,
    pointerBytes: [0x0000, localIdOfTestByte],
  },
  stackPointerInformation: pointerInformationNotSet,
  instructionPointerInformation: pointerInformationNotSet,
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationOnlyStackBytesSet: ByteInformation = {
  basePointerInformation: pointerInformationSet,
  stackPointerInformation: pointerInformationSet,
  instructionPointerInformation: pointerInformationNotSet,
  usedBytes: [0x0000, localIdOfTestByte],
  code,
};

const byteInformationStackBytesNotSetIfUnused: ByteInformation = {
  basePointerInformation: pointerInformationSet,
  stackPointerInformation: pointerInformationSet,
  instructionPointerInformation: pointerInformationNotSet,
  usedBytes: [0x0000],
  code,
};

const byteInformationUnusedByteSet: ByteInformation = {
  basePointerInformation: pointerInformationNotSet,
  stackPointerInformation: pointerInformationNotSet,
  instructionPointerInformation: pointerInformationNotSet,
  usedBytes: [0x0000, 0x0003],
  code,
};

const byteInformationNothingSet: ByteInformation = {
  basePointerInformation: emptyPointerInformation,
  stackPointerInformation: emptyPointerInformation,
  instructionPointerInformation: emptyPointerInformation,
  usedBytes: [localIdOfTestByte],
  code,
};

describe('ByteVue.vue Classes', () => {
  it('renders all Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationAllSet,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement instructionByte stackByte');
  });
  it('renders all pointer classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationAllSet,
      },
    });
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder,instructionPointer');
    expect(wrapper.element.children[1].className).to.eql('stackPointer');
  });

  it('renders instructionPointer Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationInstructionPointerSet,
      },
    });
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder,instructionPointer');
    expect(wrapper.element.children[0].className).to.eql('byteElement');
  });

  it('renders stackPointer Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationStackPointerSet,
      },
    });
    expect(wrapper.element.children[1].className).to.eql('stackPointer');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder');
    expect(wrapper.element.children[0].className).to.eql('byteElement');
  });

  it('renders basePointer Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationBasePointerSet,
      },
    });
    expect(wrapper.element.children[1].className).to.eql('basePointer');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder');
    expect(wrapper.element.children[0].className).to.eql('byteElement');
  });

  it('renders instructionBytes Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationInstructionBytesSet,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement instructionByte');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder');
    expect(wrapper.element.children.length).to.eql(1);
  });

  it('renders stackBytes Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationStackBytesSet,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement stackByte');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder');
    expect(wrapper.element.children.length).to.eql(1);
  });

  it('renders baseBytes Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationBaseBytesSet,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement baseByte');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder');
    expect(wrapper.element.children.length).to.eql(1);
  });

  it('renders only stackBytes Byte classes when stack and base set', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationOnlyStackBytesSet,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement stackByte');
    expect(wrapper.element.children[1].className).to.eql('stackPointer');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder');
  });

  it('renders no stackBytes Byte classes when unused set', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationStackBytesNotSetIfUnused,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement unusedByte');
    expect(wrapper.element.children[1].className).to.eql('stackPointer');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder,unusedByteShadowAndBorder');
  });

  it('renders unusedBytes Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationUnusedByteSet,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement unusedByte');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder,unusedByteShadowAndBorder');
    expect(wrapper.element.children.length).to.eql(1);
  });

  it('renders no Byte classes when passed', () => {
    const wrapper = shallowMount(ByteVue, {
      propsData: {
        byte: { content: '20', locationId: localIdOfTestByte },
        byteInformation: byteInformationNothingSet,
      },
    });
    expect(wrapper.element.children[0].className).to.eql('byteElement');
    expect(wrapper.classes().toString()).to.eql('shadowAndBorder');
    expect(wrapper.element.children.length).to.eql(1);
  });
});
