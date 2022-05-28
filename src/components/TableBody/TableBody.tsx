import {defineComponent} from "vue";
import TableBodyRow from "./TableBodyRow";
import {trace} from "../../common/logger";
import type {TableBodyProps} from "../../common/types";
import {tableBodyProps} from "../../common/const";

export default defineComponent({
    name: "TableBody",
    props: tableBodyProps,
    setup(props: TableBodyProps) {
        return () => {
            trace(
                '[TableBody]: ',
                `data: ${JSON.stringify(props.data)}, columns: ${JSON.stringify(props.columns)}`
            )
            return (
                <tbody>
                {props.data.map(record => (
                    <TableBodyRow record={record}
                                  columns={props.columns}
                                  data={props.data}/>
                ))}
                </tbody>
            );
        };
    },
});

