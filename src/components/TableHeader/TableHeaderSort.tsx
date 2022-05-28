import {defineComponent} from "vue";
import {useSortData} from '../../common/hooks/useSortData'
import {debug, info} from "../../common/logger";
import type {TableHeaderSortProps, SortOptions} from "../../common/types";
import {tableHeaderSortProps} from "../../common/const";

export default defineComponent({
    name: "TableHeaderSort",
    props: tableHeaderSortProps,
    setup(props: TableHeaderSortProps, {emit}) {
        let {nextOrder, sortCls} = useSortData(props);
        const onChangeSort = (event: MouseEvent) => {
            event.stopPropagation() //防止冒泡到上层组件，造成用户点击一次，实际出现两次效果
            const nextSortOptions: SortOptions = {
                remote: props.sortOptions.remote,
                sortBy: props.column.dataIndex,
                sortOrder: nextOrder.value,
            };
            debug(
                '[TableHeaderSort]: ',
                `onChangeSort emit changeSort with nextSortOptions: ${JSON.stringify(nextSortOptions)}`
            )
            info(
                '[TableHeaderSort]: ',
                `exec onChangeSort success`
            )
            emit('changeSort', nextSortOptions);
        };
        return () => {
            return (
                <span class={sortCls.value} onClick={onChangeSort}></span>
            );
        };
    },
});