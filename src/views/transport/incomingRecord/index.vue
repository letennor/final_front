<template>
  <div class="app-container mainDiv">
    <my-card title="进货情况记录">
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

    <!-- 添加个体死亡量记录 -->
    <AddIncomingRecordDialog ref="AddIncomingRecordDialog" @refresh="refresh" />
  </div>
</template>

<script>
import AddIncomingRecordDialog from "@/components/transport/addIncomingRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllIncomingRecord, deleteIncomingRecord } from "@/api/transport";
export default {
  name: "IndividualDeathRecord",
  components: {
    tableList,
    MyCard,
    AddIncomingRecordDialog,
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
          text: "进货量",
          value: "incomingAmount",
        },
        {
          text: "进货类型",
          value: "goodsId",
        },
        {
          text: "运输记录",
          value: "transportRecordId",
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
      this.$refs.AddIncomingRecordDialog.dialogForm = val.row;
      this.$refs.AddIncomingRecordDialog.type = 0;
      this.$refs.AddIncomingRecordDialog.dialogFormVisibility = true;
    },

    delete(val) {
      deleteIncomingRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddIncomingRecordDialog.type = 1;
      this.$refs.AddIncomingRecordDialog.dialogForm = {};
      this.$refs.AddIncomingRecordDialog.dialogFormVisibility = true;
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
      getAllIncomingRecord().then((res) => {
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
