<script setup lang="ts">
    // This starter template is using Vue 3 <script setup> SFCs
    // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
    import SimpleTable from "./components/SimpleTable";
    import {SORT_ORDER} from './common/const'

    const tableOptions = {
        columns: [
            {header: 'Name', dataIndex: 'name'},
            {header: 'Age', dataIndex: 'age', sortable: true}
        ],
        data: [
            {name: 'Bob', age: '27'},
            {name: 'Tom', age: '20'},
            {name: 'Alice', age: '23'}
        ],
        sortOptions: {
            sortBy: '',
            sortOrder: SORT_ORDER.NONE,
        },
        paginationOptions: {
            pageSize: 2,
            current: 1,
        },
    }

    function updateSortOptions() {
    };

    function updatePaginationOptions() {
    };
</script>

<template>
    <SimpleTable :data="tableOptions.data"
                 :columns="tableOptions.columns"
                 :sortOptions="tableOptions.sortOptions"
                 :paginationOptions="tableOptions.paginationOptions"
                 @updateSortOptions="updateSortOptions"
                 @updatePaginationOptions="updatePaginationOptions">
        <template v-slot:header__name>
            NAME
        </template>

        <template v-slot:body__age="obj">
            {{ obj.data.name + '(' + obj.data.age + ')' }}
        </template>
    </SimpleTable>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 60px;
    }
</style>
