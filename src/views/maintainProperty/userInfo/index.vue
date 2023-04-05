<template>
  <div class="app-container mainDiv">
    <my-card title="账号维护">
      <div class="filter-container">
        <el-button class="filter-item addButton" type="primary" v-waves icon="el-icon-circle-plus-outline"
          @click="add()">添加
        </el-button>
      </div>
      <table-list :data="list" :columns="columns" class="dataTable"></table-list>
    </my-card>

    <!-- 添加用户 -->
    <AddUserDialog ref="AddUserDialog" @refresh="refresh()" />
  </div>
</template>

<script>
import AddUserDialog from "@/components/system/addUserDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllPerson, deleteUserBasicInfo, updateUserBasicInfo, changeState } from "@/api/system";

export default {
  name: "UserInfo",
  components: {
    tableList,
    MyCard,
    AddUserDialog,
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
          text: "id",
          value: "userBasicInfoId",
          width: 200
        },
        {
          text: "姓名",
          value: "name",
        },
        {
          text: "年龄",
          value: "age",
        },
        {
          text: "性别",
          value: "gender",
          filter: genderTransform,
        },
        {
          text: "电话号码",
          value: "phoneNumber",
        },
        {
          text: "薪资",
          value: "salary",
        },
        {
          text: "微信",
          value: "wechat",
        },
        {
          text: "角色",
          value: "roleName",
        },
        {
          text: "工作时间",
          value: "workYear",
        },
        {
          text: "入职时间",
          value: "entryTime",
          filter: parseTime,
          filterParams: ["{y}/{m}/{d}"],
        },
        {
          text: "账号状态",
          render: (...val) => this.createStateTag(...val)
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
      this.$refs.AddUserDialog.dialogForm = val.row
      this.$refs.AddUserDialog.type = 0
      this.$refs.AddUserDialog.dialogFormVisibility = true;
    },

    delete(val) {
      deleteUserBasicInfo(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      //清空dialog里面的对象，type设置为1
      this.$refs.AddUserDialog.type = 1
      this.$refs.AddUserDialog.dialogForm = {}
      this.$refs.AddUserDialog.dialogFormVisibility = true;
    },

    // 表格操作按鈕
    operButton(val) {
      const temp = [
        { class: "iconzidingyipoumian", value: "编辑", click: this.update },
        { class: "iconshanchu", value: "删除", click: this.delete },
        { class: "iconxitong", value: "修改状态", click: this.changeState },
      ];
      return temp;
    },

    getList() {
      getAllPerson().then((res) => {
        this.list = res.data.data;
        console.log("userInfo-list:", this.list);
      });
    },

    refresh() {
      this.getList();
    },

    createStateTag(h, row) {
      const divStyle = 'text-align:center'
      let type = ''
      let text = ''
      if (row.row.state === 1) {
        type = 'success'
        text = '启用'
      } else if (row.row.state === 0) {
        type = 'danger'
        text = '禁用'
      }
      return (
        <div style={divStyle}>
          <el-tag type={type} effect={'plain'}>
            {text}
          </el-tag>
        </div>
      )
    },

    changeState(val) {
      //调用接口
      changeState(val.row).then((res) => {
        this.$message(res.data.data)
        this.getList()
      })
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
