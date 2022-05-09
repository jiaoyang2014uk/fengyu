import {defineComponent} from "vue";
import {useSortMethod} from '../common/hooks'
import {trace} from "../common/utils";
import type {TableHeaderCellProps, SortOptions} from "../common/types";
import {tableHeaderCellProps} from "../common/const";

export default defineComponent({
    name: "TableHeaderCell",
    props: tableHeaderCellProps,
    setup(props: TableHeaderCellProps, {attrs, emit, slots}) {
        let {nextOrder, sortCls} = useSortMethod(props);
        const onSortChange = () => {
            if (!props.column.sortable) {
                return;
            }
            const nextSortOptions: SortOptions = {
                remote: props.sortOptions.remote,
                sortBy: props.column.dataIndex,
                sortOrder: nextOrder.value,
            };
            trace(
                'TableHeaderCell: ',
                `onSortChange emit updateSortOptions with nextSortOptions: ${JSON.stringify(nextSortOptions)}`
            )
            emit('updateSortOptions', nextSortOptions);
        };
        return () => {
            return (
                <th onClick={onSortChange} class="table__header-cell">
                    <span class="table__header-cell__value">
                        {props.column.slot ? props.column.slot({
                            value: props.column.header,
                            data: props.column
                        }) : props.column.header}
                      </span>
                    <span v-show={props.column.sortable} class={sortCls.value}></span>
                </th>
            );
        };
    },
});