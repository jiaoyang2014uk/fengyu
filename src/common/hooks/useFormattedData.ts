/**
 * SimpleTable hooks
 */

import {computed} from "vue";
import lodashIsNaN from 'lodash/isNaN'
import {debug, trace, error} from "../logger";
import type {ColumnOptions, PaginationOptions, SortOptions, TableData} from "../types";
import {SORT_ORDER} from "../const";

/**
 * 根据排序获取格式化后的数据
 * @param {TableData[]} data 显示数据配置
 * @param {SortOptions} sortOptions 排序配置
 * @param {ColumnOptions[]} columns 表格列配置
 * @returns {TableData[]} data 格式化后数据
 */
function sortHandler({data, sortOptions, columns}: {
    data: TableData[],
    sortOptions: SortOptions,
    columns: ColumnOptions[]
}) {
    trace(
        '[SimpleTable-sortHandler]: ',
        `data: ${JSON.stringify(data)}, sortOptions: ${JSON.stringify(sortOptions)}, columns: ${JSON.stringify(columns)}`
    )

    if (sortOptions.remote || sortOptions.sortOrder === SORT_ORDER.NONE) {
        return data;
    }

    const sortColumn = columns?.find(col => col.dataIndex === sortOptions.sortBy);
    let defaultFn = (a: TableData, b: TableData) => a[sortOptions.sortBy] > b[sortOptions.sortBy] ? 1 : -1;
    const sortFn = sortColumn?.sortFn || defaultFn;
    const descSortFn = (a: TableData, b: TableData) => -sortFn(a, b);

    data.sort(sortOptions.sortOrder === SORT_ORDER.ASC ? sortFn : descSortFn);
    debug(
        '[SimpleTable-sortHandler]: ',
        `exec sortHandler, result: ${JSON.stringify(data)}`
    )
    return data;
};

/**
 * 根据分页获取格式化后的数据
 * @param {TableData[]} data 显示数据配置
 * @param {PaginationOptions} paginationOptions 分页配置
 * @returns {TableData[]} data 格式化后数据
 */
function paginationHandler({data, paginationOptions}: {
    data: TableData[],
    paginationOptions: PaginationOptions
}) {
    trace(
        '[SimpleTable-paginationHandler]: ',
        `data: ${JSON.stringify(data)}, paginationOptions: ${JSON.stringify(paginationOptions)}`
    )
    if (paginationOptions.remote) {
        return data;
    }

    let start = paginationOptions.pageSize * (paginationOptions.current - 1);
    let end = start + paginationOptions.pageSize;
    if (lodashIsNaN(start) || lodashIsNaN(end)) {
        error(
            '[SimpleTable-paginationHandler]: ',
            `pageSize or current is not a number. pageSize: ${paginationOptions.pageSize}, current: ${paginationOptions.current} `,
            `Please correct pageSize or current with valid number`,
        )
        if (lodashIsNaN(start)) {
            start = 0;
        }
        if (lodashIsNaN(end)) {
            end = data.length;
        }
    }
    debug(
        '[SimpleTable-paginationHandler]: ',
        `exec paginationHandler, result: ${JSON.stringify(data.slice(start, end))}`
    )
    return data.slice(start, end);
};

/**
 * 根据排序和分页获取格式化后的数据
 * @param {TableOptions} props 表格配置
 * @returns {TableData[]} formattedData 格式化后数据
 */
export function useFormattedData(props: {
    data: TableData[],
    columns: ColumnOptions[],
}, sortField: SortOptions, paginationOpts: PaginationOptions) {
    trace(
        '[SimpleTable-useFormattedData]: ',
        `props: ${JSON.stringify(props)}, sortField: ${JSON.stringify(sortField)}, paginationOpts: ${JSON.stringify(paginationOpts)}`
    )
    return computed(() => {

        // 先排序再分页
        let data = sortHandler({
            data: props.data,
            sortOptions: sortField,
            columns: props.columns
        });
        data = paginationHandler({
            data: data,
            paginationOptions: paginationOpts
        });
        return data;
    });
}