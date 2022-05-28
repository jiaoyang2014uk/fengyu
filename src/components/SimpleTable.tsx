import {defineComponent, watch, ref} from "vue";
import TableCol from "./TableCol";
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Pagination from "./Pagination";
import lodash from "lodash";
import {useFormattedData} from '../common/hooks/useFormattedData'
import {useSortable} from '../common/hooks/useSortable'
import {usePagination} from '../common/hooks/usePagination'
import {useColumns} from '../common/hooks/useColumns'
import {trace} from "../common/logger";
import '../common/Table.less';
import type {TableProps, TableData} from "../common/types";
import {tableProps} from "../common/const";

export default defineComponent({
    name: "SimpleTable",
    props: tableProps,
    setup(props: TableProps, {emit, slots}) {
        let cloneDeepData = ref<TableData[]>(props.data)
        const {headerColumns, bodyColumns} = useColumns(props.columns, slots);
        const {sortField, onChangeSort} = useSortable(props.sortOptions, emit);
        const {
            paginationOpts,
            onChangePage
        } = usePagination(props.paginationOptions, cloneDeepData.value, emit)
        const formattedData = useFormattedData({
            data: cloneDeepData.value,
            columns: props.columns,
        }, sortField, paginationOpts);

        watch(() => props.data, (newVal, oldVal) => {
            if (!lodash.isEqual(newVal, oldVal)) {
                cloneDeepData.value = newVal
            }
        }, {deep: true, immediate: true})
        return () => {
            trace(
                '[SimpleTable]: ',
                `columns: ${JSON.stringify(props.columns)}, data: ${JSON.stringify(cloneDeepData.value)}, sortOptions: ${JSON.stringify(props.sortOptions)}, paginationOptions: ${JSON.stringify(props.paginationOptions)}`
            )
            return (
                <div class='table'>
                    <table class="table__table">
                        <TableCol columns={headerColumns}/>
                        <TableHeader columns={headerColumns}
                                     sortOptions={sortField}
                                     onChangeSort={onChangeSort}/>
                        <TableBody columns={bodyColumns} data={formattedData.value}/>
                    </table>
                    <Pagination pageSize={paginationOpts.pageSize}
                                current={paginationOpts.current}
                                total={paginationOpts.total}
                                onChangePage={onChangePage}/>
                </div>
            );
        };
    },
});
