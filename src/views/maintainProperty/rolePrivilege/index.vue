<template>
  <div class="app-container mainDiv">
    <my-card title="角色信息维护">
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

    <AddRoleInfoDialog ref="AddRoleInfoDialog" @refresh="refresh()" />

    <el-dialog title="配置权限" :visible.sync="authFormVisible">
      <choose-auth
        :data="authList"
        :org-privilges="rolePrivilges"
      ></choose-auth>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authFormVisible = false">取消</el-button>
        <el-button type="primary" @click="configPrivilges" v-waves
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AddRoleInfoDialog from "@/components/maintainInfo/addRoleInfoDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import chooseAuth from "./component/chooseAuth";
import { parseTime } from "@/utils";
import {
  getAllRole,
  getAuthList,
  getRolePriId,
  configRole,
} from "@/api/maintainInfo";
export default {
  name: "RolePrivilege",
  components: {
    tableList,
    MyCard,
    AddRoleInfoDialog,
    chooseAuth,
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
          text: "角色名称",
          value: "roleName",
        },
        {
          text: "角色描述",
          value: "roleDescription",
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
      authList: [], //所有权限
      authFormVisible: false,
      rolePrivilges: [], //角色已拥有的权限
      currentRoleId: "",
    };
  },
  mounted() {
    this.getList();
    this.getAuthList();
  },
  methods: {
    update(val) {
      this.$refs.AddRoleInfoDialog.dialogForm = val.row;
      this.$refs.AddRoleInfoDialog.type = 0;
      this.$refs.AddRoleInfoDialog.dialogFormVisibility = true;
      console.log("点击编辑");
    },

    delete(val) {
      // deleteTransportRouteInfo(val.row).then((res) => {
      //   console.log("res:", res);
      //   this.getList();
      // });
    },

    // 新增
    add() {
      this.$refs.AddRoleInfoDialog.type = 1;
      this.$refs.AddRoleInfoDialog.dialogForm = {};
      this.$refs.AddRoleInfoDialog.dialogFormVisibility = true;
    },

    //获得所有权限
    getAuthList() {
      this.parentPriId = [];
      getAuthList().then((res) => {
        this.authList = res.data.data;
        this.authList.forEach((item) => {
          if (item.children.length > 0) {
            this.parentPriId.push(item.privilegeId);
          }
        });
      });
    },

    // 配置角色
    setPrivilege(val) {
      this.rolePrivilges = [];
      this.currentRoleId = val.row.roleId;
      this.getAuthList();
      // 获取角色权限
      console.log(val.row);
      getRolePriId({ roleId: val.row.roleId }).then((res) => {
        const temp = [];
        res.data.data.forEach((element) => {
          temp.push(element.privilegeId);
        });
        const parentId = [
          "1635930370314407938",
          "1635926637224464385",
          "1635926554345017346",
          "1635926495704453121",
          "1635926426146115586",
          "1635926306667171841",
          "1635926199175548929",
        ]; //工作权限
        temp.forEach((element) => {
          if (!parentId.includes(element)) {
            this.rolePrivilges.push(element);
          }
        });
        // this.rolePrivilges = temp;
        //将父节点去掉
        console.log("rolePrivileges:", this.rolePrivilges);

        this.authFormVisible = true;
      });
    },

    // 配置角色权限
    configPrivilges() {
      configRole({
        roleId: this.currentRoleId,
        privilegeIds: this.$store.getters.checkAuth,
      }).then((response) => {
        if (response.data.data > 0) {
          this.$message("修改成功!");
          this.authFormVisible = false;
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    // 表格操作按钮
    operButton(val) {
      const temp = [
        { class: "iconxitong", value: "配置权限", click: this.setPrivilege },
        { class: "iconzidingyipoumian", value: "编辑", click: this.update },
        { class: "iconshanchu", value: "删除", click: this.delete },
      ];
      return temp;
    },

    getList() {
      getAllRole().then((res) => {
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
