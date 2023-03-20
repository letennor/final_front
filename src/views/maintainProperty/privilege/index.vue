<template>
  <div class="app-container mainDiv">
    <my-card title="权限信息维护">
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

    <AddPrivilegeDialog ref="AddPrivilegeDialog" @refresh="refresh()"/>
  </div>
</template>

<script>
import AddPrivilegeDialog from "@/components/maintainInfo/addPrivilegeDialog.vue"
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { addPrivilege, getAllPrivilege, deletePrivilege } from "@/api/maintainInfo";
export default {
  name: "Privilege",
  components: {
    tableList,
    MyCard,
    AddPrivilegeDialog,
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
          text: "权限id",
          value: "privilegeId",
        },
        {
          text: "权限名称",
          value: "privilegeName",
        },
        {
          text: "权限代码",
          value: "privilegeCode",
        },
        {
          text: "权限描述",
          value: "privilegeDescription",
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
    update(val) {
      this.$refs.AddPrivilegeDialog.dialogForm = val.row;
      this.$refs.AddPrivilegeDialog.type = 0;
      this.$refs.AddPrivilegeDialog.dialogFormVisibility = true;
      console.log("点击编辑");
    },

    delete(val) {
      deletePrivilege(val.row).then((res)=>{
        console.log("res:", res)
        this.getList()
      })
    },

    // 新增
    add() {
      this.$refs.AddPrivilegeDialog.type = 1;
      this.$refs.AddPrivilegeDialog.dialogForm = {};
      this.$refs.AddPrivilegeDialog.dialogFormVisibility = true;
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
      getAllPrivilege().then((res) => {
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
