<template>
  <div>
    <el-dialog :title="type === 1 ? '添加' : '编辑'" :visible.sync="dialogFormVisibility" width="600px" v-dragDialog>
      <el-form :rules="dialogFormRules" ref="dialogForm" :model="dialogForm" label-position="center" size="small"
        label-width="110px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名:" prop="name">
              <el-input class="filter-item" placeholder="请输入姓名" v-model="dialogForm.name">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="账号:" prop="userName">
              <el-input class="filter-item" placeholder="请输入账号" v-model="dialogForm.userName">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="密码:" prop="password">
              <el-input class="filter-item" placeholder="请输入密码" v-model="dialogForm.password">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="dialogForm.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="年龄:" prop="age">
              <el-input class="filter-item" placeholder="请输入年龄" v-model="dialogForm.age">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="入职时间:" prop="entryTime">
              <el-date-picker placement="bottom-start" v-model="dialogForm.entryTime" type="date" placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日" value-format="timestamp" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="薪资:" prop="salary">
              <el-input class="filter-item" placeholder="请输入薪资" v-model="dialogForm.salary" type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="电话号码:" prop="phoneNumber">
              <el-input class="filter-item" placeholder="请输入电话号码" v-model="dialogForm.phoneNumber">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="微信:" prop="wechat">
              <el-input class="filter-item" placeholder="请输入微信" v-model="dialogForm.wechat">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="邮箱:" prop="email">
              <el-input class="filter-item" placeholder="请输入邮箱" v-model="dialogForm.email">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="角色:" prop="roleId">
              <el-select v-model="dialogForm.roleId" placeholder="请选择要分配的角色">
                <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibility = false">取消</el-button>
        <el-button type="primary" class="addButton" v-waves @click="type === 1 ? add() : update()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addUser, updateUser } from "@/api/system";
import { getAllRole } from "@/api/maintainInfo";
import { addMessageInfo } from "@/api/message"

export default {
  name: "AddUserDialog",
  data() {
    return {
      type: 1, //如果是1表示添加，如果是0表示编辑
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {
        // 表单必填项设置
        //动态控制require，当关闭的时候，设置为false，当打开的时候设置为true
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        userName: [{ required: true, message: "请填写账号名" }],
        gender: [{ required: true, message: "请选择性别" }],
        age: [{ required: true, message: "请输入年龄" }],
        entryTime: [{ required: true, message: "请输入入职时间" }],
        salary: [{ required: true, message: "请输入薪资" }],
        password: [{ required: true, message: "请输入密码" }],
      },
      roleList: [],
    };
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    add() {
      console.log("添加用户:", this.dialogForm);
      //调用接口
      addUser(this.dialogForm).then((res) => {
        console.log("res:", res);
        this.dialogFormVisibility = false;
        //调用一个emit，触发父组件的getList方法
        this.$emit("refresh");
      });
    },
    update() {
      console.log("更新用户信息:", this.dialogForm);

      updateUser(this.dialogForm).then((res) => {
        console.log("res:", res);
        this.dialogFormVisibility = false;
        this.$emit("refresh");

        console.log("这个dialogForm：", this.dialogForm)
        //发送信息
        let messageObj = {}
        messageObj.isRead = 0
        messageObj.messageSender = this.$store.state.user.userId
        messageObj.messageReceiver = this.dialogForm.userBasicInfoId
        messageObj.messageDate = new Date()
        messageObj.messageContent = this.dialogForm.name + "的基本信息发生了修改"

        addMessageInfo(messageObj).then((res) => {
          console.log("消息发送情况:", res.data.data)
        })

      });
      //调用接口
    },
    getRoleList() {
      getAllRole().then((res) => {
        this.roleList = res.data.data;
      });
    },
  },
  watch: {
    dialogFormVisibility(newValue, oldValue) {
      //关闭
      if (newValue === false) {
        this.dialogForm = {};
      }

      //打开
      if (newValue === true) {
        this.$nextTick(() => {
          //表单验证失效
          this.$refs.dialogForm.clearValidate();
        });
      }
    },
  },
};
</script>
<style></style>