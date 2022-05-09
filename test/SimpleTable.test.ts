import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import SimpleTable from "../src/components/SimpleTable";

const mountTable = (options?: Record<string, unknown>) => mount(SimpleTable, options);

test("mount component without props", () => {
    const wrapper = mountTable();

    expect(wrapper.html()).toMatchSnapshot();
});

test('props with columns and data', async () => {
    const wrapper = mountTable({
        props: {
            columns: [
                {header: 'Name', dataIndex: 'name'},
                {header: 'Age', dataIndex: 'age', sortable: true}
            ],
            data: [
                {name: 'Bob', age: '27'},
                {name: 'Tom', age: '20'},
                {name: 'Alice', age: '23'}
            ]
        }
    });

    expect(wrapper.html()).toMatchSnapshot();
});

test('header slot and body slot', async () => {
    const wrapper = mountTable({
        props: {
            columns: [
                {header: 'Name', dataIndex: 'name'},
                {header: 'Age', dataIndex: 'age', sortable: true}
            ],
            data: [
                {name: 'Bob', age: '27'},
                {name: 'Tom', age: '20'},
                {name: 'Alice', age: '23'}
            ]
        },
        slots: {
            header__name: 'NAME',
            body__age: '<template v-slot:body__age="obj">\n' +
                '            {{ obj.data.name + \'(\' + obj.data.age + \')\' }}\n' +
                '        </template>'
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
});

