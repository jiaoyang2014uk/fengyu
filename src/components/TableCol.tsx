import {defineComponent} from "vue";
import {trace} from "../common/logger";
import type {TableColProps} from "../common/types";
import {tableColProps} from "../common/const";

export default defineComponent({
    name: "TableCol",
    props: tableColProps,
    setup(props: TableColProps) {
        return () => {
            trace(
                '[TableCol]: ',
                `columns: ${JSON.stringify(props.columns)}`
            )
            return (
                <colgroup>
                    {props.columns.map((column) => <col width={column.width}/>)}
                </colgroup>
            );
        };
    },
});
