import {defineComponent, ref, computed} from "vue";
import {useClassMethod} from '../common/hooks'
import {info, trace} from '../common/utils'
import type {PaginationProps} from "../common/types";
import {paginationProps} from "../common/const";

export default defineComponent({
    name: "Pagination",
    props: paginationProps,
    setup(props: PaginationProps, {attrs, emit, slots}) {
        let jumpPage = ref(0)
        const totalPage = computed(() => Math.ceil(props.total / props.limit));
        const {previousCls, nextCls} = useClassMethod(props, totalPage.value);
        const onPageChange = (targetPage: number) => {
            if (targetPage <= 0 || targetPage > totalPage.value || isNaN(jumpPage.value)) {
                return;
            }
            trace(
                'Pagination: ',
                `onPageChange emit updatePage with targetPage: ${JSON.stringify(targetPage)}`
            )
            emit('updatePage', targetPage);
        };
        return () => {
            info(
                'Pagination: ',
                `page: ${props.page}, total: ${props.total}, limit: ${props.limit}, totalPage: ${totalPage.value}`
            )
            return (
                <div class="pagination">
                    <span class="pagination__total">
                        Total {props.total} items
                    </span>
                    <span onClick={() => onPageChange(props.page - 1)}
                          class={previousCls.value}
                    >
                        Previous
                    </span>
                    <span onClick={() => onPageChange(props.page + 1)}
                          class={nextCls.value}>
                        Next
                    </span>
                    <span class="pagination__page">( {props.page} / {totalPage.value} )</span>
                    <span class="pagination__goto">
                        Go to
                        <input type="text"
                               v-model={jumpPage.value}
                               onBlur={() => onPageChange(jumpPage.value)}
                               class='pagination__goto-input'/>
                    </span>
                </div>
            );
        };
    },
});
