/**
 * Pagination hooks
 */

import {computed} from "vue";
import {trace} from "../logger";
import type {PaginationOptions} from "../types";

/**
 * 分页上一页/下一页样式
 * @param {PaginationOptions} options 分页配置
 * @param {number} totalPage 总页数
 * @returns {string} previousCls 上一页样式
 * @returns {string} nextCls 下一页样式
 */
export function useClass(options: PaginationOptions, totalPage: number) {
    trace(
        '[Pagination-useClass]: ',
        `options: ${JSON.stringify(options)}, totalPage: ${totalPage}`
    )
    const previousCls = computed(() => `pagination__previous ${options.current <= 1 ? 'disabled' : ''}`);
    const nextCls = computed(() => `pagination__next ${options.current >= totalPage ? 'disabled' : ''}`);
    return {
        previousCls,
        nextCls
    };
}