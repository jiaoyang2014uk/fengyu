/**
 * SimpleTable hooks
 */

import {computed} from "vue";
import lodashCloneDeep from "lodash/cloneDeep";
import {trace} from "../logger";
import type {ColumnOptions, PaginationOptions, Slots, SortOptions, TableData} from "../types";
import {SORT_ORDER} from "../const";

/**
 * 分页总数取值
 * @param {ColumnOptions} columns 表格列配置
 * @param {Slots} slots 插槽
 * @returns {ColumnOptions} headerColumns 表格头配置
 * @returns {ColumnOptions} bodyColumns 表格列配置
 */
export function useColumnsMethod(columns: ColumnOptions[], slots: Slots) {
    trace(
        '[SimpleTable-useColumnsMethod]: ',
        `columns: ${JSON.stringify(columns)}, slots: ${JSON.stringify(slots)}`
    )
    // 根据名称取 slot，注入到 column 配置中
    const headerColumns = (columns?.map(column => ({
        ...column,
        slot: slots[`header__${column.dataIndex}`]
    })) || []) as ColumnOptions[];
    const bodyColumns = (columns?.map(column => ({
        ...column,
        slot: slots[`body__${column.dataIndex}`]
    })) || []) as ColumnOptions[];

    return {
        headerColumns,
        bodyColumns
    };
};

/**
 * 根据排序和分页获取格式化后的数据
 * @param {TableOptions} props 表格配置
 * @returns {TableData} formattedData 格式化后数据
 */
export function useFormattedDataMethod(props: {
    data: TableData[],
    sortOptions: SortOptions,
    columns: ColumnOptions[],
    paginationOptions: PaginationOptions,
}) {
    trace(
        '[SimpleTable-useFormattedDataMethod]: ',
        `props: ${JSON.stringify(props)}`
    )
    const sortHandler = ({data, sortOptions, columns}: {
        data: TableData[],
        sortOptions: SortOptions,
        columns: ColumnOptions[]
    }) => {
        if (sortOptions.remote || sortOptions.sortOrder === SORT_ORDER.NONE) {
            return data;
        }

        const sortColumn = columns?.find(col => col.dataIndex === sortOptions.sortBy);
        let defaultFn = (a: TableData, b: TableData) => a[sortOptions.sortBy] > b[sortOptions.sortBy] ? 1 : -1;
        const sortFn = sortColumn?.sortFn || defaultFn;
        const descSortFn = (a: TableData, b: TableData) => -sortFn(a, b);

        data.sort(sortOptions.sortOrder === SORT_ORDER.ASC ? sortFn : descSortFn);

        return data;
    };
    const paginationHandler = ({data, paginationOptions}: {
        data: TableData[],
        paginationOptions: PaginationOptions
    }) => {
        if (paginationOptions.remote || !paginationOptions.enable) {
            return data;
        }

        const start = paginationOptions.limit * (paginationOptions.page - 1);
        const end = start + paginationOptions.limit;
        return data.slice(start, end);
    };
    return computed(() => {

        // 先排序再分页
        let data = sortHandler({
            data: lodashCloneDeep(props.data),
            sortOptions: props.sortOptions,
            columns: props.columns
        });
        data = paginationHandler({
            data: lodashCloneDeep(data),
            paginationOptions: props.paginationOptions
        });
        return data;
    });
}

/**
 * 分页总数取值
 * @param {PaginationOptions} paginationOptions 分页配置
 * @param {TableData[]} data 显示数据
 * @returns {number} total 条目总数
 */
export function usePaginationMethod(paginationOptions: PaginationOptions, data: TableData[]) {
    trace(
        '[SimpleTable-usePaginationMethod]: ',
        `paginationOptions: ${JSON.stringify(paginationOptions)}, data: ${JSON.stringify(data)}`
    )
    // 远端分页 total 由外部传入，本地分页 total = data.length
    return computed(() => paginationOptions.remote ? paginationOptions.total : data.length);
}