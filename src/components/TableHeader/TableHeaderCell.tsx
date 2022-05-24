import {defineComponent} from "vue";
import TableHeaderSort from "./TableHeaderSort";
import {useSortData} from '../../common/hooks/useSortData'
import {debug, warn, info} from "../../common/logger";
import type {TableHeaderCellProps, SortOptions} from "../../common/types";
import {tableHeaderCellProps} from "../../common/const";

export default defineComponent({
    name: "TableHeaderCell",
    props: tableHeaderCellProps,
    setup(props: TableHeaderCellProps, {attrs, emit, slots}) {
        let {nextOrder} = useSortData(props);
        const onChangeSort = () => {
            if (!props.column.sortable) {
                warn(
                    '[TableHeaderCell-onChangeSort]: ',
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
                `onChangeSort emit changeSort with nextSortOptions: ${JSON.stringify(nextSortOptions)}`
            )
            info(
                '[TableHeaderCell]: ',
                `exec onChangeSort success`
            )
            emit('changeSort', nextSortOptions);
        };
        return () => {
            return (
                <th onClick={onChangeSort} class="table__header-cell">
                    <span class="table__header-cell__value">
                        {props.column.slot ? props.column.slot({
                            value: props.column.header,
                            data: props.column
                        }) : props.column.header}
                      </span>
                    {
                        props.column.sortable &&
                        <TableHeaderSort column={props.column}
                                         sortOptions={props.sortOptions}
                                         onChangeSort={onChangeSort}/>
                    }
                </th>
            );
        };
    },
});