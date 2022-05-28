import {expect, test} from "vitest";
import {mountTable, propsPartial} from './common'
import cloneDeep from 'lodash/cloneDeep';

test("mount component without props", () => {
    const wrapper = mountTable();

    expect(wrapper.html()).toMatchSnapshot();
});

test('props with columns and data', async () => {
    const wrapper = mountTable({props: cloneDeep(propsPartial)});

    expect(wrapper.html()).toMatchSnapshot();
});

test('header slot and body slot', async () => {
    const wrapper = mountTable({
        props: cloneDeep(propsPartial),
        slots: {
            header__name: 'NAME',
            body__age: '<template v-slot:body__age="obj">\n' +
                '            {{ obj.data.name + \'(\' + obj.data.age + \')\' }}\n' +
                '        </template>'
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
});

