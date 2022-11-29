<template>
  <div class="app-container mainDiv">
    <my-card title="死亡情况记录">
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
    <AddDeathRecordDialog ref="AddDeathRecordDialog" @refresh="refresh" />
  </div>
</template>

<script>
import AddDeathRecordDialog from "@/components/cultivation/addDeathRecordDialog.vue"
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllDeathRecord, deleteDeathRecord } from "@/api/cultivation";
export default {
  name: "DosingRecord",
  components: {
    tableList,
    MyCard,
    AddDeathRecordDialog,
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
          text: "死亡记录id",
          value: "deathRecordId",
        },
        {
          text: "批次",
          value: "batchId",
        },
        {
          text: "死亡数",
          value: "deathNumber",
        },
        {
          text: "死亡率",
          value: "deathRate",
        },
        {
          text: "死亡统计员",
          value: "deathRecordPerson",
        },
        {
          text: "记录员",
          value: "recordPerson",
        },
        {
          text: "记录时间",
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
      console.log("val:", val)
      deleteDeathRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddDeathRecordDialog.dialogFormVisibility = true;
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
      getAllDeathRecord().then((res) => {
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
