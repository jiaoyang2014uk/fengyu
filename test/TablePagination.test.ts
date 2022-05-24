import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import SimpleTable from "../src/components/SimpleTable";

const mountTable = (options?: Record<string, unknown>) => mount(SimpleTable, options);

test('pagination: limit > data.length',  () => {
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
            ],
            paginationOptions: {
                pageSize: 5,
                current: 1
            }
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
});

test('pagination: limit < data.length', async () => {
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
            ],
            paginationOptions: {
                pageSize: 2,
                current: 1
            }
        },
    });

    //共2页，当前第1页
    expect(wrapper.html()).toContain('( 1 / 2 )');

    // 在第一页点击上一页，无效果
    await wrapper.findAll('.pagination__previous')[0].trigger('click')
    expect(wrapper.html()).toContain('Bob');

    // 点击下一页
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.html()).not.toContain('Bob');
    expect(wrapper.html()).toContain('Alice');


    // 在最后一页点击下一页，无效果
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.html()).toContain('Alice');
});

test('pagination: remote', async () => {
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
            ],
            paginationOptions: {
                pageSize: 2,
                current: 1,
                remote: true
            }
        },
    });


    // 点击下一页，无效果
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.html()).toContain('Bob');

});

