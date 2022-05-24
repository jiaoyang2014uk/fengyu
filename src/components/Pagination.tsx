import {defineComponent, ref, computed} from "vue";
import {useClass} from '../common/hooks/useClass'
import {debug, trace, error, info} from '../common/logger'
import type {PaginationProps} from "../common/types";
import {paginationProps} from "../common/const";

export default defineComponent({
    name: "Pagination",
    props: paginationProps,
    setup(props: PaginationProps, {attrs, emit, slots}) {
        let jumpPage = ref(0)
        const totalPage = computed(() => Math.ceil(props.total / props.pageSize));
        const {previousCls, nextCls} = useClass(props, totalPage.value);
        const onChangePage = (targetPage: number) => {
            if (targetPage <= 0 || targetPage > totalPage.value || isNaN(jumpPage.value)) {
                error(
                    '[Pagination-onChangePage]: ',
                    `targetPage is not valid: ${targetPage}`,
                    `targetPage should be a number between (0, ${totalPage.value}]`
                )
                return;
            }
            debug(
                '[Pagination]: ',
                `onChangePage emit changePage with targetPage: ${targetPage}`
            )
            info(
                '[Pagination]: ',
                `exec onChangePage success`
            )
            emit('changePage', targetPage);
        };
        return () => {
            trace(
                '[Pagination]: ',
                `current: ${props.current}, total: ${props.total}, pageSize: ${props.pageSize}, totalPage: ${totalPage.value}`
            )
            return (
                <div class="pagination">
                    <span class="pagination__total">
                        Total {props.total} items
                    </span>
                    <span onClick={() => onChangePage(props.current - 1)}
                          class={previousCls.value}
                    >
                        Previous
                    </span>
                    <span onClick={() => onChangePage(props.current + 1)}
                          class={nextCls.value}>
                        Next
                    </span>
                    <span class="pagination__page">( {props.current} / {totalPage.value} )</span>
                    <span class="pagination__goto">
                        Go to
                        <input type="text"
                               v-model={jumpPage.value}
                               onBlur={() => onChangePage(jumpPage.value)}
                               class='pagination__goto-input'/>
                    </span>
                </div>
            );
        };
    },
});
