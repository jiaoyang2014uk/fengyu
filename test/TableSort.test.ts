import {expect, test} from "vitest";
import {SORT_ORDER} from "../src/common/const";
import TableBodyCell from "../src/components/TableBody/TableBodyCell";
import {mountTable, propsPartial, data, sortFn, customSortFn} from './common'
import cloneDeep from 'lodash/cloneDeep';

test('sort: build-in sort', async () => {
    let wrapper = mountTable({
        props: {
            ...cloneDeep(propsPartial),
            sortOptions: {
                sortBy: '',
                sortOrder: SORT_ORDER.NONE
            }
        },
    });
    //点击一次升序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    expect(wrapper.html()).toContain('table__header-cell_sort_asc');
    let sortedData = cloneDeep(data).sort(sortFn)
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }

    //点击一次降序
    await wrapper.findAll('.table__header-cell_sort_asc')[0].trigger('click')
    expect(wrapper.html()).not.toContain('table__header-cell_sort_asc');
    expect(wrapper.html()).toContain('table__header-cell_sort_desc');
    sortedData = cloneDeep(data).sort(customSortFn)
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }

    //点击一次无序
    await wrapper.findAll('.table__header-cell_sort_desc')[0].trigger('click')
    expect(wrapper.html()).not.toContain('table__header-cell_sort_desc');
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }

    //点击未排序列 无效
    await wrapper.findAll('.table__header-cell__value')[0].trigger('click')
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }
});

test('sort: custom sort', async () => {
    const wrapper = mountTable({
        props: {
            columns: [
                {header: 'Name', dataIndex: 'name'},
                {header: 'Age', dataIndex: 'age', sortable: true, sortFn: customSortFn}
            ],
            data: cloneDeep(data)
        },
    });

    //点击一次降序
    await wrapper.findAll('.table__header-cell_sort')[0].trigger('click')
    let sortedData = cloneDeep(data).sort(customSortFn)
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }

    //点击一次升序
    await wrapper.findAll('.table__header-cell_sort_asc')[0].trigger('click')
    sortedData = cloneDeep(data).sort(sortFn)
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }

    //点击一次无序
    await wrapper.findAll('.table__header-cell_sort_desc')[0].trigger('click')
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }

    //点击未排序列 无效
    await wrapper.findAll('.table__header-cell__value')[0].trigger('click')
    for (let i = 0; i < sortedData.length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(sortedData[i].age);
    }
});

test('sort: remote sort', async () => {
    const wrapper = mountTable({
        props: {
            ...cloneDeep(propsPartial),
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
    for (let i = 0; i < cloneDeep(data).length; i++) {
        expect(wrapper.findAllComponents(TableBodyCell)[(i * 2) + 1].html()).toContain(cloneDeep(data)[i].age);
    }
});

