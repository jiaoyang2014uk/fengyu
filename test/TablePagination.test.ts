import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import SimpleTable from "../src/components/SimpleTable";

const mountTable = (options?: Record<string, unknown>) => mount(SimpleTable, options);

test('pagination: limit > data.length', async () => {
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
                enable: true,
                limit: 5,
                page: 1
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
                enable: true,
                limit: 2,
                page: 1
            }
        },
    });

    //共2页，当前第1页
    expect(wrapper.html()).toContain('( 1 / 2 )');

    // 在第一页点击上一页，无效果
    await wrapper.findAll('.pagination__previous')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();

    // 点击下一页
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.emitted('updatePaginationOptions')).toHaveLength(1)
    expect(wrapper.emitted('updatePaginationOptions')).toEqual([[{enable: true, limit: 2, page: 2}]])
    expect(wrapper.html()).toMatchSnapshot();

    // 在最后一页点击下一页，无效果
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();
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
                enable: true,
                limit: 2,
                page: 1,
                remote: true
            }
        },
    });


    // 点击下一页，无效果
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();

});

