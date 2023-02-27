<template>
  <div class="app-container mainDiv">
    <my-card title="出苗情况记录">
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

    <AddTransportRecordDialog
      ref="AddTransportRecordDialog"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import AddTransportRecordDialog from "@/components/transport/addTransportRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import {
  getAllOutputRecord,
  deleteOutputRecord,
  deleteTransportRecord,
  getAllTransportRecord,
} from "@/api/transport";
export default {
  name: "IndividualDeathRecord",
  components: {
    tableList,
    MyCard,
    AddTransportRecordDialog,
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
          text: "运输记录id",
          value: "transportRecordId",
        },
        {
          text: "出发地",
          value: "start",
        },
        {
          text: "目的地",
          value: "end",
        },
        {
          text: "车牌号",
          value: "licensePlate",
        },
        {
          text: "司机",
          value: "driver",
        },
        {
          text: "货物类别",
          value: "goodsId",
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
      this.$refs.AddTransportRecordDialog.dialogForm = val.row;
      this.$refs.AddTransportRecordDialog.type = 0;
      this.$refs.AddTransportRecordDialog.dialogFormVisibility = true;
    },

    delete(val) {
      deleteTransportRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddTransportRecordDialog.type = 1;
      this.$refs.AddTransportRecordDialog.dialogForm = {};
      this.$refs.AddTransportRecordDialog.dialogFormVisibility = true;
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
      getAllTransportRecord().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
    },

    refresh() {
      this.getList();
    },
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
