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

//   定义排序样式常量
export const sortClsMap = {
    [SORT_ORDER.NONE]: 'table__header-cell_sort',
    [SORT_ORDER.ASC]: 'table__header-cell_sort_asc',
    [SORT_ORDER.DESC]: 'table__header-cell_sort_desc',
};
//   定义下一次排序顺序
export const nextSortOrderMap = {
    [SORT_ORDER.NONE]: SORT_ORDER.ASC,
    [SORT_ORDER.ASC]: SORT_ORDER.DESC,
    [SORT_ORDER.DESC]: SORT_ORDER.NONE
};

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

//   定义 TableCol 的props常量
export const tableColProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        required: true,
    }
} as const;

//   定义 TableHeader 的props常量
export const tableHeaderProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        required: true,
    },
    /* 排序配置 */
    sortOptions: {
        type: Object as PropType<SortOptions>,
        required: true,
    },
    /* 本地排序方法 */
    onChangeSort: {
        type: Function,
        required: true,
    }
} as const;

//   定义 TableHeaderRow 的props常量
export const tableHeaderRowProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        required: true,
    },
    /* 排序配置 */
    sortOptions: {
        type: Object as PropType<SortOptions>,
        required: true,
    },
    /* 本地排序方法 */
    onChangeSort: {
        type: Function,
        required: true,
    }
} as const;

//   定义 TableHeaderCell 的props常量
export const tableHeaderCellProps = {
    /* 表格列配置 */
    column: {
        type: Object as PropType<ColumnOptions>,
        required: true,
    },
    /* 排序配置 */
    sortOptions: {
        type: Object as PropType<SortOptions>,
        required: true,
    },
    /* 本地排序方法 */
    onChangeSort: {
        type: Function,
        required: true,
    }
} as const;

//   定义 TableHeaderSort 的props常量
export const tableHeaderSortProps = {
    /* 表格列配置 */
    column: {
        type: Object as PropType<ColumnOptions>,
        required: true,
    },
    /* 排序配置 */
    sortOptions: {
        type: Object as PropType<SortOptions>,
        required: true,
    },
    /* 本地排序方法 */
    onChangeSort: {
        type: Function,
        required: true,
    }
} as const;

//   定义 TableBody 的props常量
export const tableBodyProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        required: true,
    },
    /* 显示数据配置 */
    data: {
        type: Array as PropType<TableData[]>,
        required: true,
    },
} as const;

//   定义 TableBodyRow 的props常量
export const tableBodyRowProps = {
    /* 表格列配置 */
    columns: {
        type: Array as PropType<ColumnOptions[]>,
        required: true,
    },
    /* 显示数据配置 */
    data: {
        type: Array as PropType<TableData[]>,
        required: true,
    },
    /* 每行数据 */
    record: {
        type: Object as PropType<TableData>,
        required: true,
    },
} as const;

//   定义 TableBodyCell 的props常量
export const tableBodyCellProps = {
    /* 表格列配置 */
    column: {
        type: Object as PropType<ColumnOptions>,
        required: true,
    },
    /* 显示数据配置 */
    data: {
        type: Object as PropType<TableData>,
        required: true,
    },
} as const;

//   定义 Pagination 的props常量
export const paginationProps = {
    /* 是否支持远端分页 */
    remote: {
        type: Boolean,
        default: false
    },
    /* 每页显示条目个数 */
    pageSize: {
        type: Number,
        default: 10
    },
    /* 页数 */
    current: {
        type: Number,
        default: 1
    },
    /* 总条目数 */
    total: {
        type: Number,
        default: 0
    },
    /* 本地分页方法 */
    onChangePage: {
        type: Function,
        required: true,
    }
} as const;
