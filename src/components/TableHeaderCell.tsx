import {defineComponent} from "vue";
import {useSortMethod} from '../common/hooks/useHeaderCell'
import {debug, warn, info} from "../common/logger";
import type {TableHeaderCellProps, SortOptions} from "../common/types";
import {tableHeaderCellProps} from "../common/const";

export default defineComponent({
    name: "TableHeaderCell",
    props: tableHeaderCellProps,
    setup(props: TableHeaderCellProps, {attrs, emit, slots}) {
        let {nextOrder, sortCls} = useSortMethod(props);
        const onSortChange = () => {
            if (!props.column.sortable) {
                warn(
                    '[TableHeaderCell-onSortChange]: ',
                    `${props.column.header} column is not sortable`,
                    'Please click sortable column'
                )
                return;
            }
            const nextSortOptions: SortOptions = {
                remote: props.sortOptions.remote,
                sortBy: props.column.dataIndex,
                sortOrder: nextOrder.value,
            };
            debug(
                '[TableHeaderCell]: ',
                `onSortChange emit updateSortOptions with nextSortOptions: ${JSON.stringify(nextSortOptions)}`
            )
            info(
                '[TableHeaderCell]: ',
                `exec onSortChange success`
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
                    {props.column.sortable && <span class={sortCls.value}></span>}
                </th>
            );
        };
    },
});