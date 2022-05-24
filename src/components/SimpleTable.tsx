import {defineComponent, reactive} from "vue";
import TableCol from "./TableCol";
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Pagination from "./Pagination";
import lodashCloneDeep from "lodash/cloneDeep";
import {useFormattedData} from '../common/hooks/useFormattedData'
import {useSortable} from '../common/hooks/useSortable'
import {usePagination} from '../common/hooks/usePagination'
import {useColumns} from '../common/hooks/useColumns'
import {debug, trace} from "../common/logger";
import '../common/Table.less';
import type {TableProps, SortOptions} from "../common/types";
import {tableProps} from "../common/const";

export default defineComponent({
    name: "SimpleTable",
    props: tableProps,
    setup(props: TableProps, {attrs, emit, slots}) {
        const cloneDeepProps = lodashCloneDeep(props)
        const {headerColumns, bodyColumns} = useColumns(cloneDeepProps.columns, slots);
        const {sortField, onChangeSort} = useSortable(cloneDeepProps.sortOptions, emit);
        const {paginationOpts, onChangePage} = usePagination(cloneDeepProps.paginationOptions, cloneDeepProps.data, emit)
        const formattedData = useFormattedData(cloneDeepProps, sortField, paginationOpts);
        return () => {
            trace(
                '[SimpleTable]: ',
                `columns: ${JSON.stringify(cloneDeepProps.columns)}, data: ${JSON.stringify(cloneDeepProps.data)}, sortOptions: ${JSON.stringify(cloneDeepProps.sortOptions)}, paginationOptions: ${JSON.stringify(cloneDeepProps.paginationOptions)}`
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
