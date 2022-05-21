import {mount} from "@vue/test-utils";
import {expect, test} from "vitest";
import SimpleTable from "../src/components/SimpleTable";
import type {TableData} from "../src/common/types";
import {SORT_ORDER} from "../src/common/const";

const mountTable = (options?: Record<string, unknown>) => mount(SimpleTable, options);

test('sort: build-in sort', async () => {
    let wrapper = mountTable({
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
            sortOptions: {
                sortBy: '',
                sortOrder: SORT_ORDER.NONE
            }
        },
    });

    //点击一次升序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.emitted('updateSortOptions')).toHaveLength(1)
    expect(wrapper.emitted('updateSortOptions')).toEqual([[{
        remote: undefined,
        sortBy: 'age',
        sortOrder: SORT_ORDER.ASC
    }]])
    expect(wrapper.html()).toMatchSnapshot();

    //点击一次降序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();

    //点击一次无序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();

    //点击未排序列 无效
    await wrapper.findAll('.table__header-cell__value')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();
});

test('sort: custom sort', async () => {
    const sortFn = (a: TableData, b: TableData) => a.age < b.age ? 1 : -1;
    const wrapper = mountTable({
        props: {
            columns: [
                {header: 'Name', dataIndex: 'name'},
                {header: 'Age', dataIndex: 'age', sortable: true, sortFn}
            ],
            data: [
                {name: 'Bob', age: '27'},
                {name: 'Tom', age: '20'},
                {name: 'Alice', age: '23'}
            ]
        },
    });

    //点击一次升序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();

    //点击一次降序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();

    //点击一次无序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();

    //点击未排序列 无效
    await wrapper.findAll('.table__header-cell__value')[0].trigger('click')
    expect(wrapper.html()).toMatchSnapshot();
});

test('sort: remote sort', async () => {
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
            sortOptions: {
                sortBy: '',
                sortOrder: SORT_ORDER.NONE,
                remote: true
            }
        },
    });

    // 点击无效果
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.html()).not.toContain('table__header-cell_sort_asc');
    expect(wrapper.html()).toMatchSnapshot();
});

