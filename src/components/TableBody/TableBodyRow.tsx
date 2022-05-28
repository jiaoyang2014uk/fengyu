import {defineComponent} from "vue";
import TableBodyCell from "./TableBodyCell";
import {trace} from "../../common/logger";
import type {TableBodyRowProps} from "../../common/types";
import {tableBodyRowProps} from "../../common/const";

export default defineComponent({
    name: "TableBodyRow",
    props: tableBodyRowProps,
    setup(props: TableBodyRowProps) {
        return () => {
            trace(
                '[TableBodyRow]: ',
                `data: ${JSON.stringify(props.data)}, columns: ${JSON.stringify(props.columns)}, record: ${JSON.stringify(props.record)}`
            )
            return (
                <tr class="table__body-row">
                    {props.columns.map(column => (
                        <TableBodyCell column={column} data={props.record}/>
                    ))}
                </tr>
            );
        };
    },
});

