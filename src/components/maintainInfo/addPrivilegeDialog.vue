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
            <el-form-item label="权限名称:" prop="privilegeName">
              <el-input
                class="filter-item"
                placeholder="请输入权限名称"
                v-model="dialogForm.privilegeName"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="权限类型:" prop="type">
              <el-select v-model="dialogForm.type" placeholder="请选择权限类型">
                <el-option
                  v-for="item in privilegeType"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="权限代码:" prop="privilegeCode">
              <el-input
                class="filter-item"
                placeholder="请输入权限代码"
                v-model="dialogForm.privilegeCode"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="权限描述:" prop="privilegeDescription">
              <el-input
                class="filter-item"
                type="textarea"
                placeholder="请输入权限描述"
                v-model="dialogForm.privilegeDescription"
              >
              </el-input>
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
import { addPrivilege, updatePrivilege } from "@/api/maintainInfo";
export default {
  name: "addPrivilegeDialog",
  data() {
    return {
      type: 1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
      privilegeType: [
        {
          typeId: "button",
          typeName: "按钮权限",
        },
        {
          typeId: "menu",
          typeName: "菜单权限",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    add() {
      console.log(this.dialogForm);
      addPrivilege(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updatePrivilege(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
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