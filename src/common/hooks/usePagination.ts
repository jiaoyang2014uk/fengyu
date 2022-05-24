/**
 * SimpleTable hooks
 */

import {computed, reactive, SetupContext} from "vue";
import lodashMerge from 'lodash/merge';
import {debug, trace} from "../logger";
import type {PaginationOptions, SortOptions, TableData} from "../types";

/**
 * 当前current状态维护
 * @returns {SortOptions} sortField 当前sort
 * @returns {Function} onSortChange 排序函数
 */
export function usePagination(paginationOptions: PaginationOptions, data: TableData[], emit: SetupContext['emit']) {
    trace(
        '[TableHeaderCell-usePagination]: ',
        `paginationOptions: ${JSON.stringify(paginationOptions)}, data: ${JSON.stringify(data)}`
    )

    // 远端分页 total 由外部传入，本地分页 total = data.length
    let total =  computed(() => paginationOptions.remote ? paginationOptions.total : data.length);
    let paginationOpts = reactive(lodashMerge({}, paginationOptions, {total: total.value}))

    const onChangePage = (targetPage: number) => {
        paginationOpts.current = targetPage;
        emit('updatePaginationOptions', targetPage);
    }
    debug(
        '[SimpleTable-usePagination]: ',
        `exec usePagination, result: ${JSON.stringify(paginationOpts)}`
    )
    return {
        paginationOpts,
        onChangePage
    }
}