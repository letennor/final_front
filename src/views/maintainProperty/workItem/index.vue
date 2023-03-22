<template>
  <div class="app-container mainDiv">
    <my-card title="路线信息维护">
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

    <AddWorkItemInfoDialog ref="AddWorkItemInfoDialog" @refresh="refresh()" />
  </div>
</template>
  
  <script>
import AddWorkItemInfoDialog from "@/components/maintainInfo/addWorkItemInfoDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import {
  getAllPrivilege,
  getWorkItem,
  deleteWorkItem,
} from "@/api/maintainInfo";
export default {
  name: "WorkItem",
  components: {
    tableList,
    MyCard,
    AddWorkItemInfoDialog,
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
          text: "工作名称",
          value: "workName",
        },
        {
          text: "工作描述",
          value: "workDescription",
        },
        {
          text: "工作权限",
          value: "privilegeName",
        },
        {
          text: "创建时间",
          value: "gmtCreate",
          filter: parseTime,
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
        this.$refs.AddWorkItemInfoDialog.dialogForm = val.row;
        this.$refs.AddWorkItemInfoDialog.type = 0;
        this.$refs.AddWorkItemInfoDialog.dialogFormVisibility = true;
        console.log("点击编辑");
    },

    delete(val) {
      console.log(val.row.workItemId);
      deleteWorkItem({ workItemId: val.row.workItemId }).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddWorkItemInfoDialog.type = 1;
      this.$refs.AddWorkItemInfoDialog.dialogForm = {};
      this.$refs.AddWorkItemInfoDialog.dialogFormVisibility = true;
    },

    // 表格操作按钮
    operButton(val) {
      const temp = [
        { class: "iconzidingyipoumian", value: "编辑", click: this.update },
        { class: "iconshanchu", value: "删除", click: this.delete },
      ];
      return temp;
    },

    getList() {
      getWorkItem().then((res) => {
        this.list = res.data.data;
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
  