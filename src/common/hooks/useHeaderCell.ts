/**
 * TableHeaderCell hooks
 */

import {computed} from "vue";
import {trace} from "../logger";
import type {ColumnOptions, SortOptions} from "../types";
import {SORT_ORDER} from "../const";

/**
 * 排序处理方法
 * @param {TableHeaderCellProps} props TableHeaderCell 的props
 * @returns {string} sortCls 排序样式
 * @returns {string} nextOrder 下一次排序顺序
 */
export function useSortMethod(props: {
    column: ColumnOptions,
    sortOptions: SortOptions
}) {
    trace(
        '[TableHeaderCell-useSortMethod]: ',
        `props: ${JSON.stringify(props)}`
    )
    const sortClsMap = {
        [SORT_ORDER.NONE]: 'table__header-cell_sort',
        [SORT_ORDER.ASC]: 'table__header-cell_sort_asc',
        [SORT_ORDER.DESC]: 'table__header-cell_sort_desc',
    };
    const nextSortOrderMap = {
        [SORT_ORDER.NONE]: SORT_ORDER.ASC,
        [SORT_ORDER.ASC]: SORT_ORDER.DESC,
        [SORT_ORDER.DESC]: SORT_ORDER.NONE
    };
    const curOrder = computed(() => props.column.dataIndex === props.sortOptions.sortBy ? props.sortOptions.sortOrder : SORT_ORDER.NONE);
    const nextOrder = computed(() => nextSortOrderMap[curOrder.value]);
    const sortCls = computed(() => sortClsMap[props.column.dataIndex === props.sortOptions.sortBy ? props.sortOptions.sortOrder : SORT_ORDER.NONE]);
    return {
        sortCls,
        nextOrder
    };
}