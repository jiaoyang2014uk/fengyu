/**
 * 类型
 */

import {ExtractPropTypes, VNode} from "vue";
import {
    SORT_ORDER,
    tableProps,
    tableHeaderProps,
    tableHeaderCellProps,
    tableBodyProps,
    tableBodyCellProps,
    paginationProps
} from './const'

// 定义插槽
export type Slot = (...args: any[]) => VNode[]

export type Slots = {
    [key: string]: Slot | undefined
};

//  定义表格列配置
export type ColumnOptions = {
    /* 表头显示的文案 */
    header: string;
    /* 表头取值的key */
    dataIndex: string;
    /* 是否支持排序 */
    sortable?: boolean;
    /* 自定义排序函数 */
    sortFn: (a: TableData, b: TableData) => number;
    /* 表头插槽 */
    slot?: TableHeaderSlot & TableBodySlot;
}

//  定义显示数据
export type TableData = {
    [key: string]: any;
}

//  定义表格头插槽
export type TableHeaderSlot = (options: {
    value: any,
    data: ColumnOptions
}) => VNode;

//  定义表格列插槽
export type TableBodySlot = (options: {
    value: any,
    data: TableData
}) => VNode;

// 定义排序配置
export type SortOptions = {
    /* 是否支持远端排序 */
    remote: boolean;
    /* 排序列名 */
    sortBy: string;
    /* 排序顺序 */
    sortOrder: SORT_ORDER;
}

//  定义分页配置
export type PaginationOptions = {
    /* 是否支持分页 */
    enable: boolean;
    /* 每页显示条目个数 */
    limit: number;
    /* 页数 */
    page: number;
    /* 总条目数 */
    total: number;
    /* 是否支持远端分页 */
    remote?: boolean;
}

//  定义表格配置
export type TableOptions = {
    /* 表格列的配置 */
    columns: ColumnOptions[];
    /* 显示的数据 */
    data: TableData[];
    /* 排序配置 */
    sortOptions: SortOptions;
    /* 分页配置 */
    paginationOptions: PaginationOptions;
}

//  定义 SimpleTable 的props类型
export type TableProps = ExtractPropTypes<typeof tableProps>;

//   定义 TableHeader 的props类型
export type TableHeaderProps = ExtractPropTypes<typeof tableHeaderProps>;

//   定义 TableHeaderCell 的props类型
export type TableHeaderCellProps = ExtractPropTypes<typeof tableHeaderCellProps>;

//   定义 TableBody 的props类型
export type TableBodyProps = ExtractPropTypes<typeof tableBodyProps>;

//   定义 TableBodyCell 的props类型
export type TableBodyCellProps = ExtractPropTypes<typeof tableBodyCellProps>;

//   定义 Pagination 的props类型
export type PaginationProps = ExtractPropTypes<typeof paginationProps>;
