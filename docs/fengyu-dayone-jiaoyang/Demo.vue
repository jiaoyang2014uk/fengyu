<script setup lang="ts">
    import SimpleTable from "./components/SimpleTable";
    import {SORT_ORDER} from './common/const'

    const tableOptions = {
        options: {
            showHeader: true,
            size: 'small',
            bordered: true,
        },
        columns: [
            {
                header: 'Name',
                dataIndex: 'name',
                sortable: true,
                sortOrder: SORT_ORDER.ASC,
                colSpan: 0,
            },
            {
                header: 'Age',
                dataIndex: 'age',
                sortable: true,
                fixed: true,
                width: 200,
                sortFn: (a, b)=> a.age - b.age,
                filterFn: (value, record)=> record.name.indexOf(value) === 0,
            }
        ],
        data: [
            {name: 'Bob', age: '27'},
            {name: 'Tom', age: '20'},
            {name: 'Alice', age: '23', children: [{name: 'Tom', age: '20'}]}
        ],
        sortOptions: {
            sortBy: '',
            sortOrder: SORT_ORDER.NONE
        },
        paginationOptions: {
            enable: true,
            limit: 2,
            page: 1,
            size: 'small',
            position: [ 'bottomRight' ],
            remote: false
        },
    }

    function updateSortOptions() {
    };
    function updatePaginationOptions() {
    };
    function rowClick() {
    };
    function rowSelections() {
    };
    function rowExpand() {
    };
</script>

<template>
    <SimpleTable :data="tableOptions.data"
                 :options="tableOptions.options"
                 :columns="tableOptions.columns"
                 :sortOptions="tableOptions.sortOptions"
                 :paginationOptions="tableOptions.paginationOptions"
                 @updateSortOptions="updateSortOptions"
                 @updatePaginationOptions="updatePaginationOptions"
                 @rowClick="rowClick"
                 @rowExpand="rowExpand"
                 @rowSelections="rowSelections">
        <template v-slot:header__name>
            NAME
        </template>

        <template v-slot:body__age="obj">
            {{ obj.data.name + '(' + obj.data.age + ')' }}
        </template>
    </SimpleTable>
</template>
