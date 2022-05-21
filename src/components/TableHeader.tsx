import {defineComponent} from "vue";
import TableHeaderCell from "./TableHeaderCell";
import {debug, trace} from "../common/logger";
import type {TableHeaderProps, SortOptions} from "../common/types";
import {tableHeaderProps} from "../common/const";

export default defineComponent({
    name: "TableHeader",
    props: tableHeaderProps,
    setup(props: TableHeaderProps, {attrs, emit, slots}) {
        const onUpdateSortOptions = (options: SortOptions) => {
            debug(
                '[TableHeader]: ',
                `onUpdateSortOptions emit updateSortOptions with options: ${JSON.stringify(options)}`
            )
            emit('updateSortOptions', options);
        };
        return () => {
            trace(
                '[TableHeader]: ',
                `columns: ${JSON.stringify(props.columns)}, sortOptions: ${JSON.stringify(props.sortOptions)}`
            )
            return (
                <thead>
                <tr>
                    {props.columns.map(column => (
                        <TableHeaderCell column={column} sortOptions={props.sortOptions}
                                         onUpdateSortOptions={onUpdateSortOptions}/>
                    ))}
                </tr>
                </thead>
            );
        };
    },
});
