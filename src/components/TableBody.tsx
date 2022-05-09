import {defineComponent} from "vue";
import TableBodyCell from "./TableBodyCell";
import {info} from "../common/utils";
import type {TableBodyProps} from "../common/types";
import {tableBodyProps} from "../common/const";

export default defineComponent({
    name: "TableBody",
    props: tableBodyProps,
    setup(props: TableBodyProps, {attrs, emit, slots}) {
        return () => {
            info(
                'TableBody: ',
                `data: ${JSON.stringify(props.data)}, columns: ${JSON.stringify(props.columns)}`
            )
            return (
                <tbody>
                {props.data.map(record => (
                    <tr class="table__body-row">
                        {props.columns.map(column => (
                            <TableBodyCell column={column} data={record}/>
                        ))}
                    </tr>
                ))}
                </tbody>
            );
        };
    },
});

