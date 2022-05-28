/**
 * SimpleTable hooks
 */

import {trace} from "../logger";
import type {ColumnOptions, Slots} from "../types";

/**
 * 根据名称取 slot，注入到 column 配置中
 * @param {ColumnOptions} columns 表格列配置
 * @param {Slots} slots 插槽
 * @returns {ColumnOptions} headerColumns 表格头配置
 * @returns {ColumnOptions} bodyColumns 表格列配置
 */
export function useColumns(columns: ColumnOptions[], slots: Slots) {
    trace(
        '[SimpleTable-useColumns]: ',
        `columns: ${JSON.stringify(columns)}, slots: ${JSON.stringify(slots)}`
    )
    const headerColumns = (columns?.map(column => ({
        ...column,
        slot: slots[`header__${column.dataIndex}`]
    }))) as ColumnOptions[];
    const bodyColumns = (columns?.map(column => ({
        ...column,
        slot: slots[`body__${column.dataIndex}`]
    }))) as ColumnOptions[];

    return {
        headerColumns,
        bodyColumns
    };
};