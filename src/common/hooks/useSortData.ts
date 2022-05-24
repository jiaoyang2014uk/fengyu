/**
 * TableHeaderCell hooks
 */

import {computed} from "vue";
import {trace} from "../logger";
import type {ColumnOptions, SortOptions} from "../types";
import {SORT_ORDER, sortClsMap, nextSortOrderMap} from "../const";

/**
 * 排序处理方法
 * @param {TableHeaderCellProps} props TableHeaderCell 的props
 * @returns {string} sortCls 排序样式
 * @returns {string} nextOrder 下一次排序顺序
 */
export function useSortData(props: {
    column: ColumnOptions,
    sortOptions: SortOptions
}) {
    trace(
        '[TableHeaderCell-useSort]: ',
        `props: ${JSON.stringify(props)}`
    )
    const curOrder = computed(() => props.column.dataIndex === props.sortOptions.sortBy ? props.sortOptions.sortOrder : SORT_ORDER.NONE);
    const nextOrder = computed(() => nextSortOrderMap[curOrder.value]);
    const sortCls = computed(() => sortClsMap[props.column.dataIndex === props.sortOptions.sortBy ? props.sortOptions.sortOrder : SORT_ORDER.NONE]);
    return {
        sortCls,
        nextOrder
    };
}