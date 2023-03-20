<template>
  <div class="app-container mainDiv">
    <my-card title="账号维护">
      <div class="filter-container">
      </div>
      <table-list
        :data="list"
        :columns="columns"
        class="dataTable"
      ></table-list>
    </my-card>
  </div>
</template>

<script>
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllUserPasswordInfo } from "@/api/system";
export default {
  name: "UserInfo",
  components: {
    tableList,
    MyCard,
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
          text: "用户信息表id",
          value: "userBasicInfoId",
        },
        {
          text: "账号情况",
          value: "state",
        },
        {
          text: "工号",
          value: "userName",
        },
        {
          text: "密码",
          value: "password",
        },
        {
          text: "组织列表id",
          value: "organizationId",
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

    delete() {
      console.log("点击删除");
    },

    // 新增
    add() {
      this.$refs.AddUserDialog.dialogFormVisibility = true;
    },


    getList() {
      getAllUserPasswordInfo().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
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
