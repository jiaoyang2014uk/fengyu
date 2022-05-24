import {defineComponent} from "vue";
import TableHeaderRow from "./TableHeaderRow";
import {debug, trace} from "../../common/logger";
import type {TableHeaderProps, SortOptions} from "../../common/types";
import {tableHeaderProps} from "../../common/const";

export default defineComponent({
    name: "TableHeader",
    props: tableHeaderProps,
    setup(props: TableHeaderProps, {attrs, emit, slots}) {
        const onChangeSort = (options: SortOptions) => {
            debug(
                '[TableHeader]: ',
                `onChangeSort emit changeSort with options: ${JSON.stringify(options)}`
            )
            emit('changeSort', options);
        };
        return () => {
            trace(
                '[TableHeader]: ',
                `columns: ${JSON.stringify(props.columns)}, sortOptions: ${JSON.stringify(props.sortOptions)}`
            )
            return (
                <thead>
                <TableHeaderRow columns={props.columns}
                                sortOptions={props.sortOptions}
                                onChangeSort={onChangeSort}/>
                </thead>
            );
        };
    },
});
