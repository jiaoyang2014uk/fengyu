import {mount} from "@vue/test-utils";
import SimpleTable from "../src/components/SimpleTable";
import {TableData} from "../src/common/types";

export const columns = [
    {header: 'Name', dataIndex: 'name', width: 200},
    {header: 'Age', dataIndex: 'age', sortable: true}
]

export const data = [
    {name: 'Bob', age: '27'},
    {name: 'Tom', age: '20'},
    {name: 'Alice', age: '23'}
]

export const propsPartial = {
    columns,
    data
}

export const sortFn = (a: TableData, b: TableData) => a.age > b.age ? 1 : -1;
export const customSortFn = (a: TableData, b: TableData) => -sortFn(a, b);

export const mountTable = (options?: Record<string, unknown>) => mount(SimpleTable, options);


