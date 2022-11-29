<template>
  <div class="app-container mainDiv">
    <my-card title="个体死亡情况记录">
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

    <!-- 添加投药记录 -->
    <AddDosingRecordDialog ref="AddDosingRecordDialog" @refresh="refresh" />
  </div>
</template>

<script>
import AddDosingRecordDialog from "@/components/cultivation/addDosingRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllDosingRecord, deleteDosingRecord } from "@/api/cultivation";
export default {
  name: "DosingRecord",
  components: {
    tableList,
    MyCard,
    AddDosingRecordDialog,
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
          text: "投药量",
          value: "dosingAmount",
        },
        {
          text: "投药种类",
          value: "medicineId",
        },
        {
          text: "投药员",
          value: "dosingPerson",
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
    update(val) {
      this.$refs.AddDosingRecordDialog.dialogForm = val.row;
      this.$refs.AddDosingRecordDialog.type = 0;
      this.$refs.AddDosingRecordDialog.dialogFormVisibility = true;
      console.log("点击编辑");
    },

    delete(val) {
      console.log("val:", val)
      deleteDosingRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddDosingRecordDialog.type = 1;
      this.$refs.AddDosingRecordDialog.dialogForm = {};
      this.$refs.AddDosingRecordDialog.dialogFormVisibility = true;
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
      getAllDosingRecord().then((res) => {
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
