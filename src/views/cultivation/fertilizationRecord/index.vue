<template>
  <div class="app-container mainDiv">
    <my-card title="受精情况记录">
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

    <!-- 添加受精记录 -->
    <AddFertilizationRecordDialog ref="AddFertilizationRecordDialog" @refresh="refresh" />
  </div>
</template>

<script>
import AddFertilizationRecordDialog from "@/components/cultivation/addFertilizationRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllFertilizationRecord, deleteFertilizationRecord } from "@/api/cultivation";
export default {
  name: "DosingRecord",
  components: {
    tableList,
    MyCard,
    AddFertilizationRecordDialog,
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
          text: "受精率",
          value: "fertilizationRate",
        },
        {
          text: "受精时间",
          value: "fertilizationTime",
          filter: parseTime,
        },
        {
          text: "操作员",
          value: "operatePerson",
        },
        {
          text: "记录员",
          value: "recordPerson",
        },
        {
          text: "记录时间",
          value: "recordTime",
          filter: parseTime,
          filterParams: ["{y}年{m}月{d}日"],
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
    update(val) {
      this.$refs.AddFertilizationRecordDialog.dialogForm = val.row;
      this.$refs.AddFertilizationRecordDialog.type = 0;
      this.$refs.AddFertilizationRecordDialog.dialogFormVisibility = true;
    },

    delete(val) {
      console.log("val:", val)
      deleteFertilizationRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddFertilizationRecordDialog.type = 1;
      this.$refs.AddFertilizationRecordDialog.dialogForm = {};
      this.$refs.AddFertilizationRecordDialog.dialogFormVisibility = true;
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
      getAllFertilizationRecord().then((res) => {
        console.log("res1231231:", res )
        this.list = res.data.data;
      });
    },

    refresh() {
      this.getList();
    },

    myParseTime(time, cformat){
        return parseTime(time, "{y}-{m}-{d}")
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
