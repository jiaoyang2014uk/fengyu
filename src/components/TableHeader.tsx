import {defineComponent} from "vue";
import TableHeaderCell from "./TableHeaderCell";
import {info, trace} from "../common/utils";
import type {TableHeaderProps, SortOptions} from "../common/types";
import {tableHeaderProps} from "../common/const";

export default defineComponent({
    name: "TableHeader",
    props: tableHeaderProps,
    setup(props: TableHeaderProps, {attrs, emit, slots}) {
        const onUpdateSortOptions = (options: SortOptions) => {
            trace(
                'TableHeader: ',
                `onUpdateSortOptions emit updateSortOptions with options: ${JSON.stringify(options)}`
            )
            emit('updateSortOptions', options);
        };
        return () => {
            info(
                'TableHeader: ',
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
