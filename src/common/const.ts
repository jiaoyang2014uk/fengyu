/**
 * 常量
 */

import {PropType} from "vue";
import type {PaginationOptions, ColumnOptions, SortOptions, TableData,} from './types'

// 定义排序顺序常量
export enum SORT_ORDER {
    /* 无排序 */
    NONE = 'NONE',
    /* 升序排序 */
    ASC = 'ASC',
    /* 降序排序 */
    DESC = 'DESC'
}

//  定义 SimpleTable 的props常量
export const tableProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        default: () => [],
    },
    /* 显示数据配置 */
    data: {
        type: Array as PropType<TableData[]>,
        default: () => [],
    },
    /* 排序配置 */
    sortOptions: {
        type: Object as PropType<SortOptions>,
        default: () => ({})
    },
    paginationOptions: {
        type: Object as PropType<PaginationOptions>,
        default: () => ({})
    },
} as const;

//   定义 TableHeader 的props常量
export const tableHeaderProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        default: () => [],
    },
    /* 排序配置 */
    sortOptions: {
        type: Object as PropType<SortOptions>,
        default: () => ({})
    },
    /* 更新排序方法 */
    onUpdateSortOptions: {
        type: Function,
        default: () => {
        },
    }
} as const;

//   定义 TableHeaderCell 的props常量
export const tableHeaderCellProps = {
    /* 表格列配置 */
    column: {
        type: Object as PropType<ColumnOptions>,
        default: () => [],
    },
    /* 排序配置 */
    sortOptions: {
        type: Object as PropType<SortOptions>,
        default: () => ({})
    },
    /* 更新排序方法 */
    onUpdateSortOptions: {
        type: Function,
        default: () => {
        },
    }
} as const;

//   定义 TableBody 的props常量
export const tableBodyProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        default: () => [],
    },
    /* 显示数据配置 */
    data: {
        type: Array as PropType<TableData[]>,
        default: () => [],
    },
} as const;

//   定义 TableBodyCell 的props常量
export const tableBodyCellProps = {
    /* 表格列配置 */
    column: {
        type: Object as PropType<ColumnOptions>,
        default: () => ({}),
    },
    /* 显示数据配置 */
    data: {
        type: Object as PropType<TableData>,
        default: () => ({}),
    },
} as const;

//   定义 Pagination 的props常量
export const paginationProps = {
    /* 是否支持远端分页 */
    remote: {
        type: Boolean,
        default: false
    },
    /* 是否支持分页 */
    enable: {
        type: Boolean,
        default: true
    },
    /* 每页显示条目个数 */
    limit: {
        type: Number,
        default: 10
    },
    /* 页数 */
    page: {
        type: Number,
        default: 1
    },
    /* 总条目数 */
    total: {
        type: Number,
        default: 0
    },
    /* 更新分页方法 */
    onUpdatePage: {
        type: Function,
        default: () => {
        },
    }
} as const;
