import {computed} from "vue";
import type {ColumnOptions, PaginationOptions, Slots, SortOptions, TableData} from "./types";
import {SORT_ORDER} from "./const";

//SimpleTable hooks
/**
 * 分页总数取值
 * @param {ColumnOptions} columns 表格列配置
 * @param {Slots} slots 插槽
 * @returns {ColumnOptions} headerColumns 表格头配置
 * @returns {ColumnOptions} bodyColumns 表格列配置
 */
export function useColumnsMethod(columns: ColumnOptions[], slots: Slots) {
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
    const sortHandler = ({data, sortOptions, columns}: {
        data: TableData[],
        sortOptions: SortOptions,
        columns: ColumnOptions[]
    }) => {
        let sortedData = [...data];
        if (sortOptions.remote || sortOptions.sortOrder === SORT_ORDER.NONE) {
            return sortedData;
        }

        const sortColumn = columns?.find(col => col.dataIndex === sortOptions.sortBy);
        let defaultFn = (a: TableData, b: TableData) => a[sortOptions.sortBy] > b[sortOptions.sortBy] ? 1 : -1;
        const sortFn = sortColumn?.sortFn || defaultFn;
        const descSortFn = (a: TableData, b: TableData) => -sortFn(a, b);

        sortedData.sort(sortOptions.sortOrder === SORT_ORDER.ASC ? sortFn : descSortFn);

        return sortedData;
    };
    const paginationHandler = ({data, paginationOptions}: {
        data: TableData[],
        paginationOptions: PaginationOptions
    }) => {
        const paginationData = [...data];
        if (paginationOptions.remote || !paginationOptions.enable) {
            return paginationData;
        }

        const start = paginationOptions.limit * (paginationOptions.page - 1);
        const end = start + paginationOptions.limit;
        return paginationData.slice(start, end);
    };
    return computed(() => {
        // 先排序再分页
        let data = sortHandler({
            data: props.data,
            sortOptions: props.sortOptions,
            columns: props.columns
        });
        data = paginationHandler({
            data: data,
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
    // 远端分页 total 由外部传入，本地分页 total = data.length
    return computed(() => paginationOptions.remote ? paginationOptions.total : data.length);
}

// TableHeaderCell hooks

/**
 * 排序处理方法
 * @param {TableHeaderCellProps} props TableHeaderCell 的props
 * @returns {string} sortCls 排序样式
 * @returns {string} nextOrder 下一次排序顺序
 */
export function useSortMethod(props: {
    column: ColumnOptions,
    sortOptions: SortOptions
}) {
    const sortClsMap = {
        [SORT_ORDER.NONE]: 'table__header-cell_sort',
        [SORT_ORDER.ASC]: 'table__header-cell_sort_asc',
        [SORT_ORDER.DESC]: 'table__header-cell_sort_desc',
    };
    const nextSortOrderMap = {
        [SORT_ORDER.NONE]: SORT_ORDER.ASC,
        [SORT_ORDER.ASC]: SORT_ORDER.DESC,
        [SORT_ORDER.DESC]: SORT_ORDER.NONE
    };
    const curOrder = computed(() => props.column.dataIndex === props.sortOptions.sortBy ? props.sortOptions.sortOrder : SORT_ORDER.NONE);
    const nextOrder = computed(() => nextSortOrderMap[curOrder.value]);
    const sortCls = computed(() => sortClsMap[props.column.dataIndex === props.sortOptions.sortBy ? props.sortOptions.sortOrder : SORT_ORDER.NONE]);
    return {
        sortCls,
        nextOrder
    };
}

// Pagination hooks

/**
 * 分页上一页/下一页样式
 * @param {PaginationOptions} options 分页配置
 * @param {number} totalPage 总页数
 * @returns {string} previousCls 上一页样式
 * @returns {string} nextCls 下一页样式
 */
export function useClassMethod(options: PaginationOptions, totalPage: number) {
    const previousCls = computed(() => `pagination__previous ${options.page <= 1 ? 'disabled' : ''}`);
    const nextCls = computed(() => `pagination__next ${options.page >= totalPage ? 'disabled' : ''}`);
    return {
        previousCls,
        nextCls
    };
}