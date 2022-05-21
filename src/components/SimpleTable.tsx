import {defineComponent} from "vue";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import {useColumnsMethod, useFormattedDataMethod, usePaginationMethod} from '../common/hooks/useTable'
import {debug, trace} from "../common/logger";
import '../common/Table.less';
import type {TableProps, SortOptions} from "../common/types";
import {tableProps} from "../common/const";

export default defineComponent({
    name: "SimpleTable",
    props: tableProps,
    setup(props: TableProps, {attrs, emit, slots}) {
        const {headerColumns, bodyColumns} = useColumnsMethod(props.columns, slots);
        const formattedData = useFormattedDataMethod(props);
        const total = usePaginationMethod(props.paginationOptions, props.data);
        const onSortChange = (sortOptions: SortOptions) => {
            //todo 当前的sort状态的维护
            debug(
                '[SimpleTable]: ',
                `onSortChange emit updateSortOptions with sortOptions: ${JSON.stringify(sortOptions)}`
            )
            emit('updateSortOptions', sortOptions);
        };
        const onUpdatePage = (page: number) => {
            const options = {
                ...props.paginationOptions,
                page
            };
            debug(
                '[SimpleTable]: ',
                `onUpdatePage emit updatePaginationOptions with options: ${JSON.stringify(options)}`
            )
            emit('updatePaginationOptions', options);
        };
        return () => {
            trace(
                '[SimpleTable]: ',
                `columns: ${JSON.stringify(props.columns)}, data: ${JSON.stringify(props.data)}, sortOptions: ${JSON.stringify(props.sortOptions)}, paginationOptions: ${JSON.stringify(props.paginationOptions)}`
            )
            return (
                <div class='table'>
                    <table class="table__table">
                        <TableHeader columns={headerColumns} sortOptions={props.sortOptions}
                                     onUpdateSortOptions={onSortChange}/>
                        <TableBody columns={bodyColumns} data={formattedData.value}/>
                    </table>
                    {
                        props.paginationOptions.enable &&
                        <Pagination v-show={props.paginationOptions.enable}
                                    limit={props.paginationOptions.limit}
                                    page={props.paginationOptions.page}
                                    total={total.value}
                                    onUpdatePage={onUpdatePage}/>
                    }
                </div>
            );
        };
    },
});
