import {expect, test} from "vitest";
import {mountTable, propsPartial} from './common'
import cloneDeep from 'lodash/cloneDeep';
import TableBodyCell from "../src/components/TableBody/TableBodyCell";

test('pagination: pageSize > data.length', () => {
    const wrapper = mountTable({
        props: {
            ...cloneDeep(propsPartial),
            paginationOptions: {
                pageSize: 5,
                current: 1
            }
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
});

test('pagination: pageSize < data.length', async () => {
    const wrapper = mountTable({
        props: {
            ...cloneDeep(propsPartial),
            paginationOptions: {
                pageSize: 2,
                current: 1
            }
        },
    });

    //共2页，当前第1页
    expect(wrapper.find('.pagination__page').html()).toContain('( 1 / 2 )');

    // 在第一页点击上一页，无效果
    await wrapper.findAll('.pagination__previous')[0].trigger('click')
    expect(wrapper.findAllComponents(TableBodyCell)[0].html()).toContain('Bob');

    // 点击下一页
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.findAllComponents(TableBodyCell)[0].html()).not.toContain('Bob');
    expect(wrapper.findAllComponents(TableBodyCell)[0].html()).toContain('Alice');


    // 在最后一页点击下一页，无效果
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.findAllComponents(TableBodyCell)[0].html()).toContain('Alice');

    // 跳页到第一页
    wrapper.findAll('.pagination__goto-input')[0].setValue(1)
    await wrapper.findAll('.pagination__goto-input')[0].trigger('blur')
    expect(wrapper.findAllComponents(TableBodyCell)[0].html()).toContain('Bob');
});

test('pagination: remote', async () => {
    const wrapper = mountTable({
        props: {
            ...propsPartial,
            paginationOptions: {
                pageSize: 2,
                current: 1,
                remote: true
            }
        },
    });


    // 点击下一页，无效果
    await wrapper.findAll('.pagination__next')[0].trigger('click')
    expect(wrapper.findAllComponents(TableBodyCell)[0].html()).toContain('Bob');

});

