<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserVisiblility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addUserRules"
        ref="addUserForm"
        :model="addUserForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名:" prop="name">
              <el-input
                class="filter-item"
                placeholder="请输入姓名"
                v-model="addUserForm.name"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="账号:" prop="account">
              <el-input
                class="filter-item"
                placeholder="请输入账号"
                v-model="addUserForm.account"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="密码:" prop="password">
              <el-input
                class="filter-item"
                placeholder="请输入密码"
                v-model="addUserForm.password"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="性别" prop="gender">
              <el-radio v-model="addUserForm.gender" label="1">男</el-radio>
              <el-radio v-model="addUserForm.gender" label="0">女</el-radio>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="年龄:" prop="age">
              <el-input
                class="filter-item"
                placeholder="请输入年龄"
                v-model="addUserForm.age"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="入职时间:" prop="entryTime">
              <el-date-picker
                placement="bottom-start"
                v-model="addUserForm.entryTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="薪资:" prop="salary">
              <el-input
                class="filter-item"
                placeholder="请输入薪资"
                v-model="addUserForm.salary"
                type="number"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="电话号码:" prop="phoneNumber">
              <el-input
                class="filter-item"
                placeholder="请输入电话号码"
                v-model="addUserForm.phoneNumber"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="微信:" prop="wechat">
              <el-input
                class="filter-item"
                placeholder="请输入微信"
                v-model="addUserForm.wechat"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="邮箱:" prop="email">
              <el-input
                class="filter-item"
                placeholder="请输入邮箱"
                v-model="addUserForm.email"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserVisiblility = false">取消</el-button>
        <el-button type="primary" class="addButton" v-waves @click="addUser()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addUser } from "@/api/test";
export default {
  name: "AddUserDialog",
  data() {
    return {
      addUserForm: {},
      addUserVisiblility: false,
      addUserRules: {
        // 表单必填项设置
        name: [{ required: true, message: "请填写姓名" }],
        account: [{ required: true, message: "请填写账号名" }],
        gender: [{ required: true, message: "请选择性别" }],
        age: [{ required: true, message: "请输入年龄" }],
        entryTime: [{ required: true, message: "请输入入职时间" }],
        salary: [{ required: true, message: "请输入薪资" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    addUser() {
      console.log("添加用户:", this.addUserForm);
      //调用接口
      addUser(this.addUserForm).then((res) => {
        console.log("res:", res);
        this.addUserVisiblility = false;
      });
    },
  },
  watch: {
    addUserVisiblility(newValue, oldValue) {
      if (newValue === false) {
        this.addUserForm = {};
      }
    },
  },
};
</script>
<style>
</style>