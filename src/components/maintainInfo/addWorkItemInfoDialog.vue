<template>
  <div>
    <el-dialog
      :title="type === 1 ? '添加' : '编辑'"
      :visible.sync="dialogFormVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="dialogFormRules"
        ref="dialogForm"
        :model="dialogForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="工作名称:" prop="workName">
              <el-input
                class="filter-item"
                placeholder="请输入工作名称"
                v-model="dialogForm.workName"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="工作描述:" prop="workDescription">
              <el-input
                class="filter-item"
                type="textarea"
                placeholder="请输入工作描述"
                v-model="dialogForm.workDescription"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="权限:" prop="type">
              <el-select
                v-model="dialogForm.privilegeId"
                placeholder="请选择工作权限"
              >
                <el-option
                  v-for="item in privilegeList"
                  :key="item.privilegeId"
                  :label="item.privilegeName"
                  :value="item.privilegeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="type === 1 ? add() : update()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import request from "@/utils/request";
import {
  addWorkItem,
  getAllWorkItem,
  getAllPrivilege,
  updateWorkItem,
} from "@/api/maintainInfo";
export default {
  name: "addWorkItemInfoDialog",
  data() {
    return {
      type: 1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
      privilegeList: [],
    };
  },
  mounted() {
    this.getPrivilegeList();
  },
  methods: {
    add() {
      console.log(this.dialogForm);
      addWorkItem(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updateWorkItem(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    getPrivilegeList() {
      getAllPrivilege().then((res) => {
        this.privilegeList = res.data.data;
      });
    },
  },
  watch: {
    dialogFormVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.dialogForm = {};
      }
    },
  },
};
</script>
  <style>
</style>