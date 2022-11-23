<template>
  <div>
    <el-table
      ref="multipleTable"
      :header-cell-style="rowClass"
      :data="data"
      :height="tableHeight"
      :max-height="height"
      :highlight-current-row="true"
      :row-key="row_key"
      tooltip-effect="dark"
      :expand-row-keys="expandRowKeys"
      @expand-change="expandChange"
      select-on-indeterminate
      border
      stripe
      size="small"
      v-loading="listLoading"
      element-loading-text="加载中..."
      @selection-change="selectChange"
      @row-click="rowClick"
      @row-dblclick="dblclick"
      @filter-change="filterChange"
      @sort-change="sortChange"
      :span-method="spanMethod"
      :cell-style="cellStyle"
      empty-text="暂无数据"
      style="width: 100%"
    >
      <!-- :span-method="spanMethod ? spanMethod: false" -->
      <el-table-column type="selection" v-if="select" width="55" />
      <el-table-column
        v-if="showIndex"
        type="index"
        align="center"
        label="序号"
        width="60"
      />
      <el-table-column type="expand" v-if="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item
              v-bind:style="{ width: expandList[0].width }"
              :label="item.text"
              :key="index"
              v-for="(item, index) in expandList"
            >
              <span
                v-html="
                  formatter(
                    scope.row[item.value],
                    item.formatter,
                    scope.row,
                    item.filter,
                    item.filterParams
                  )
                "
              />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        :fixed="item.fixed"
        :label="item.text"
        :width="item.width"
        v-for="(item, index) in columns"
        :filter-multiple="item.filterMultiple ? item.filterMultiple : false"
        :key="index"
        :prop="item.value"
        :column-key="item.value"
        align="center"
        :sortable="dealSortable(item)"
        :filters="item.headFilters ? item.headFilters : null"
      >
      
      <template v-for="(child, index) in item.children">
        <my-column
          v-if="item.children"
          :key="index"
          :item="child"
        />
      </template>
        
        <template slot-scope="scope">
          <my-render
            v-if="item.render"
            :row="scope.row"
            :render="item.render"
          />
          <span
            v-html="
              formatter(
                scope.row[item.value],
                item.formatter,
                scope.row,
                item.filter,
                item.filterParams
              )
            "
            v-if="!item.type"
            v-bind:style="item.style ? item.style : ''"
            v-bind:class="item.classFun ? item.classFun(scope.row) : ''"
            @click="item.click ? item.click(scope.row, $event) : false"
          />
          <img
            :src="item.getSrc(scope.row)"
            :height="item.imgHeight"
            v-if="item.type === 'img'"
          />

          <div v-if="item.type === 'button'">
            <el-button
              v-button-privilege="key.privilege"
              size="mini"
              @click="key.click(scope, $event)"
              v-for="(key, num) in item.list(scope.row)"
              :key="num"
              :type="key.type"
            >{{ key.value }}
            </el-button>
          </div>
          <div v-if="item.type === 'iconButton'">
            <span v-if="item.value" style="margin-right: 5px">{{
              scope.row[item.value]
            }}</span>
            <span v-for="(key, num) in item.list(scope.row)" :key="num">
              <el-tooltip
                :content="key.value"
                placement="top"
                v-button-privilege="key.privilege"
              >
                <i
                  style="font-size: 25px; padding-right: 5px"
                  class="icon iconfont projectColor pointer"
                  :class="key.class"
                  @click="key.click(scope, $event)"
                />
              </el-tooltip>
              <span
                class="projectColor"
                style="position: absolute; margin-left: -4px; font-weight: 700"
                v-if="num < item.list(scope.row).length - 1"
              >|</span>
            </span>
          </div>
          <div v-if="item.type === 'switch'">
            <el-switch
              v-model="scope.row[item.model]"
              @change="item.change(scope, scope.row[item.model])"
              :active-value="item.activeValue"
              :inactive-value="item.inactiveValue"
              :active-text="item.activeText"
              :inactive-text="item.inactiveText"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination && total > pageSize"
      style="margin-top: 10px"
      :current-page="pageNum"
      :page-size="pageSize"
      @current-change="currentChange"
      layout="total, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>
<script>
import buttonPrivilege from '@/directive/buttonPrivilege'
import myColumn from './myColumn'
import MyRender from './MyRender'

export default {
  name: 'TableList',
  directives: {
    buttonPrivilege
  },
  components: {
    myColumn,
    MyRender
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: Number,
      default: () => {
        return
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    styleObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    select: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isAccordion: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    rowkey: {
      type: String,
      default: () => {
        return 'id'
      }
    },
    pageNum: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    total: { type: Number, default: 0 },
    listLoading: { type: Boolean, default: false },
    showPagination: { type: Boolean, default: true },
    expand: { type: Boolean, default: false },
    showIndex: { type: Boolean, default: false },
    expandList: {
      type: Array,
      default: () => {
        return []
      }
    },
    headColor: { type: String, default: '' },
    spanMethod: {
      type: Function,
      default: () => function() {}
    },
    heightlightRows: {
      type: Array,
      default: () => {
        return []
      }
    },
    myCellStyle: { type: Function, default: null },
    tableHeight: {
      type: Number,
      default: () => {
        return
      }
    }
  },
  data() {
    return {
      expandRowKeys: [],
      oldrowkey: null
    }
  },
  mounted() {
    // console.log(this.$refs.multipleTable)
  },
  methods: {
    dealSortable(item) {
      if (item.sortable) {
        return true
      } else {
        return false
      }
    },
    filterChange(filters) {
      this.$emit('filterChange', filters)
    },
    sortChange(val) {
      // ascending 表示升序，descending 表示降序，null 表示还原为原始顺序
      this.$emit('sortChange', val)
    },
    rowClass({ row, rowIndex }) {
      // console.log(rowIndex)
      return 'background:' + this.headColor
    },
    selectChange(e) {
      this.$emit('selectChange', e)
    },
    rowClick(e) {
      this.$emit('rowClick', e)
    },
    clear() {
      this.$refs.multipleTable.clearSelection()
      return true
    },
    addSerch(rows) {
      rows.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    },
    dblclick(e) {
      // 双击表格触发事件
      this.$emit('dbclick', e)
    },
    formatter(value, formatter, row, filter, filterParams) {
      if (!formatter) {
        if (filter) {
          if (filterParams) {
            const tempArr = [value, ...filterParams]
            return filter(...tempArr)
          } else {
            return filter(value)
          }
        }
        return value
      } else {
        return formatter(row)
      }
    },
    highlight(row) {
      this.$refs.multipleTable.setCurrentRow(row)
    },
    currentChange(val) {
      this.$emit('currentChange', val)
    },
    // row 中有{row, column, rowIndex, columnIndex}
    cellStyle(row) {
      if (this.myCellStyle) {
        return this.myCellStyle(row)
      }
    },
    row_key(row) {
      return row[this.rowkey]
    },
    expandChange(e) {
      this.$emit('expandChange', e)
      if (this.isAccordion) {
        if (
          this.oldrowkey === e[this.rowkey] &&
          this.expandRowKeys.length !== 0
        ) {
          this.expandRowKeys = []
        } else {
          this.expandRowKeys = [e[this.rowkey]]
        }
      }
      this.oldrowkey = e[this.rowkey]
    }
  }
}
</script>
<!-- table测试组件 -->
<style rel="stylesheet/scss" lang="scss">
.el-tooltip__popper {
  max-width: 30%;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  /*background: #EAF3F8*/
}

.el-table th {
  height: 40px;
  background-color: #F5F7FA !important;
  color: #7488C9;
  border-radius: 6px;
  font-size:16px
}

.current-row td {
  background: #bae7ff !important;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}

.el-table__row {
  td {
    height: 50px;
  }
}

.el-table thead {
  color: #333;
}
</style>
