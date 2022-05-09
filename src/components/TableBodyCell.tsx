import {defineComponent, computed} from "vue";
import type{TableBodyCellProps} from "../common/types";
import {tableBodyCellProps} from "../common/const";

export default defineComponent({
    name: "TableBodyCell",
    props: tableBodyCellProps,
    setup(props: TableBodyCellProps, {attrs, emit, slots}) {
        const value = computed(() => props.data[props.column.dataIndex]);
        return () => {
            return (
                <td class="table__body-cell">
                    <span>{props.column.slot ? props.column.slot({
                        value: value.value,
                        data: props.data
                    }) : value.value}</span>
                </td>
            );
        };
    },
});

