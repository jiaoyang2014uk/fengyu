# 表格组件

## 介绍

实现表格组件

## API

### Attribute

| 名称 | 描述 |类型|默认值|可选值|
|----- | ------|------|------|------|
|options | 通用定义的配置，具体见 Options配置 | Options |||
|columns | 表格列的配置，具体见 ColumnOptions配置 | ColumnOptions[] |||
|data | 显示的数据 | TableData[] |||
|sortOptions | 排序配置，具体见 sortOptions配置 | SortOptions |||
|paginationOptions | 分页配置，具体见 paginationOptions配置 | PaginationOptions |||

#### Options配置

| 名称 | 描述 |类型|默认值|可选值|
|----- | ------|------|------|------|
|showHeader | 表头是否展示 | boolean |true|false/true|
|bordered | 是否带边框 | boolean |false|false/true|
|size | 表格大小 | string |'default'|default / middle / small|

#### ColumnOptions配置

| 名称        | 描述       | 类型             |默认值|可选值|
|-----------|----------|----------------|------|------|
| header    | 列表标题     | string         |||
| dataIndex | 表头取值的key | string         |||
| sortable  | 是否支持排序   | boolean        |false|false/true|
| fixed     | 是否固定表格列  | boolean/string |false|true, left, right|
| width     | 表格列宽     | number/string  |||
| rowSpan   | 表格行合并    | number         |0||
| colSpan   | 表格列合并    | number         |0||
| sortFn    | 自定义排序函数  | (a: TableData, b: TableData) => number |||
| filterFn  | 自定义筛选函数  | (value, record：TableData) => boolean |||

#### sortOptions配置

| 名称 | 描述 |类型|默认值|可选值|
|----- | ------|------|------|------|
|remote | 是否支持远端排序 | boolean |false|false/true|
|sortBy | 排序列名 | string |||
|sortOrder | 排序顺序 | string ||'NONE'/'ASC'/'DESC'|

#### paginationOptions配置

| 名称 | 描述 |类型|默认值|可选值|
|----- | ------|------|------|------|
|enable | 是否支持分页 | boolean |false|false/true|
|limit | 每页显示条目个数 | number |10||
|page | 当前页 | number |1||
|total | 总条目数 | number |0||
|remote | 是否支持远端分页 | boolean |false|false/true|
|size | 分页器大小尺寸 | string |'default'|default / middle / small|
|position | 分页器位置 | Array |['bottomRight']|topLeft / topCenter / topRight /bottomLeft / bottomCenter / bottomRight|

### Events

| 名称 | 说明 | 回调参数 |
|----- | ------|------|
|updateSortOptions | 自定义更新排序 |{sortBy,  sortOrder}|
|updatePaginationOptions | 自定义更新分页 |{limit, page}|
|onRowExpand | 表格行展开触发 |{index, selected}|
|onRowSelected | 表格行选择触发 |{record, index}|
|onRowClick | 表格行点击触发 |{record, index}|

### Slot

| 名称 | 说明 | 
|----- | ------|
|header__前缀 | 表格头插槽 |
|body__前缀 | 表格列插槽 |
