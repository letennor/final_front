<template>
  <div>
    <el-dialog
      title="添加货物信息"
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
            <el-form-item label="货物名称:" prop="goodsName">
              <el-input
                class="filter-item"
                placeholder="请输入货物名称"
                v-model="dialogForm.goodsName"
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
          @click="add()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import {
  addGoodsInfo
} from "@/api/maintainInfo";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
    };
  },
  mounted() {

  },
  methods: {
    add() {
      console.log("dialogForm:",this.dialogForm);
      addGoodsInfo(this.dialogForm).then((res)=>{
        this.$emit("refresh")
      })
      this.dialogFormVisibility = false;
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