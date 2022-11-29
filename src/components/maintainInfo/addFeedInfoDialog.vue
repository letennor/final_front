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
            <el-form-item label="用料名称:" prop="feedName">
              <el-input
                class="filter-item"
                placeholder="请输入用料名称"
                v-model="dialogForm.feedName"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="总量:" prop="totalAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入总量"
                v-model="dialogForm.totalAmount"
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
import { addFeedInfo, updateFeedInfo } from "@/api/maintainInfo";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      type:1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
    };
  },
  mounted() {},
  methods: {
    add() {
      console.log(this.dialogForm);
      addFeedInfo(this.dialogForm).then((res) => {
        this.$emit("refresh");
      });
      this.dialogFormVisibility = false;
    },

    update() {
      updateFeedInfo(this.dialogForm).then((res) => {
        console.log("res:", res);
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