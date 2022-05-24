/**
 * SimpleTable hooks
 */

import {reactive, SetupContext} from "vue";
import {debug} from "../logger";
import type { SortOptions} from "../types";

/**
 * 当前sort状态维护
 * @returns {SortOptions} sortField 当前sort
 * @returns {Function} onSortChange 排序函数
 */
export function useSortable(sortOptions: SortOptions, emit: SetupContext['emit']) {
    let sortField = reactive<SortOptions>(sortOptions)

    const onChangeSort = (nextSortOptions: SortOptions) => {
        if(!nextSortOptions.remote) {
            sortField.remote = nextSortOptions.remote;
            sortField.sortBy = nextSortOptions.sortBy;
            sortField.sortOrder = nextSortOptions.sortOrder;
        }
        emit('updateSortOptions', nextSortOptions);
    }
    debug(
        '[SimpleTable-useSortable]: ',
        `exec useSortable, result: ${JSON.stringify(sortField)}`
    )
    return {
        sortField,
        onChangeSort
    }
}