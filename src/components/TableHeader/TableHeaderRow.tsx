import {defineComponent} from "vue";
import TableHeaderCell from "./TableHeaderCell";
import {debug, trace} from "../../common/logger";
import type {TableHeaderRowProps, SortOptions} from "../../common/types";
import {tableHeaderRowProps} from "../../common/const";

export default defineComponent({
    name: "TableHeaderRow",
    props: tableHeaderRowProps,
    setup(props: TableHeaderRowProps, {attrs, emit, slots}) {
        const onChangeSort = (options: SortOptions) => {
            debug(
                '[TableHeaderRow]: ',
                `onChangeSort emit changeSort with options: ${JSON.stringify(options)}`
            )
            emit('changeSort', options);
        };
        return () => {
            trace(
                '[TableHeaderRow]: ',
                `columns: ${JSON.stringify(props.columns)}, sortOptions: ${JSON.stringify(props.sortOptions)}`
            )
            return (
                <tr>
                    {props.columns.map(column => (
                        <TableHeaderCell column={column} sortOptions={props.sortOptions}
                                         onChangeSort={onChangeSort}/>
                    ))}
                </tr>
            );
        };
    },
});
