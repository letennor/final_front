<template>
  <div class="app-container mainDiv">
    <my-card title="批次信息维护">
      <div class="filter-container">
        <el-button
          class="filter-item addButton"
          type="primary"
          v-waves
          icon="el-icon-circle-plus-outline"
          @click="add()"
          >添加
        </el-button>
      </div>
      <table-list
        :data="list"
        :columns="columns"
        class="dataTable"
      ></table-list>
    </my-card>

    <AddBatchInfoDialog ref="AddBatchInfoDialog" @refresh="refresh()"/>
  </div>
</template>

<script>
import AddBatchInfoDialog from "@/components/maintainInfo/addBatchInfoDialog.vue"
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllBatch, deleteBatchInfo } from "@/api/maintainInfo";
export default {
  name: "FeedInfo",
  components: {
    tableList,
    MyCard,
    AddBatchInfoDialog,
  },
  directives: {
    waves,
    dragDialog,
  },
  data() {
    return {
      // 表头名称和字段
      columns: [
        {
          text: "批次id",
          value: "batchId",
        },
        {
          text: "批次名称",
          value: "batchName",
        },
        {
          text: "记录员",
          value: "recordPerson",
        },
        {
          text: "创建时间",
          value: "gmtCreate",
          filter: parseTime
        },
        {
          text: "操作",
          type: "iconButton",
          width: 180,
          fixed: "right",
          list: this.operButton,
        },
      ],
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    update() {
      console.log("点击编辑");
    },

    delete(val) {
      deleteBatchInfo(val.row).then((res)=>{
        console.log("res:", res);
        this.getList()
      })
      console.log("点击删除");
    },

    // 新增
    add() {
      this.$refs.AddBatchInfoDialog.addBatchInfoVisibility = true;
    },

    // 表格操作按鈕
    operButton(val) {
      const temp = [
        { class: "iconzidingyipoumian", value: "编辑", click: this.update },
        { class: "iconshanchu", value: "删除", click: this.delete },
      ];
      return temp;
    },

    getList() {
      getAllBatch().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
    },

    refresh(){
      this.getList()
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.CheckDialog {
  .el-row {
    padding: 10px;
  }
}
</style>
