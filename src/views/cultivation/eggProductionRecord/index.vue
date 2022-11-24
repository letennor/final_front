<template>
  <div class="app-container mainDiv">
    <my-card title="产蛋量情况记录">
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

    <!-- 添加产蛋量记录 -->
    <AddEggProductionRecordDialog ref="AddEggProductionRecordDialog" @refresh="refresh"/>

  </div>
</template>

<script>
import AddEggProductionRecordDialog from "@/components/cultivation/addEggProductionRecordDialog.vue"
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllEggProductionRecord, deleteEggProductionRecord } from "@/api/cultivation";
export default {
  name: "EggProductionRecord",
  components: {
    tableList,
    MyCard,
    AddEggProductionRecordDialog
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
          text: "批次",
          value: "batchId",
        },
        {
          text: "产蛋量",
          value: "eggProductionAmount",
        },
        {
          text: "产蛋率",
          value: "eggProductionRate",
        },
        {
          text: "坏蛋量",
          value: "badEggProductionAmount",
        },
        {
          text: "坏蛋率",
          value: "badEggProductionRate",
        },
        {
          text: "捡蛋员",
          value: "pickEggPerson",
        },
        {
          text: "记录员",
          value: "recordPerson",
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
        deleteEggProductionRecord(val.row).then((res)=>{
            console.log('res:', res)
            this.getList()
        })
    },

    // 新增
    add() {
      this.$refs.AddEggProductionRecordDialog.addEggProductionVisibility = true;
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
      getAllEggProductionRecord().then((res) => {
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
