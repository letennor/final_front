<template>
  <div>
    <el-dialog
      title="添加货物信息"
      :visible.sync="addGoodsInfoVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addGoodsInfoRules"
        ref="addGoodsInfoForm"
        :model="addGoodsInfoForm"
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
                v-model="addGoodsInfoForm.goodsName"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoodsInfoVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewGoodsInfo()"
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
      addGoodsInfoForm: {},
      addGoodsInfoVisibility: false,
      addGoodsInfoRules: {},
    };
  },
  mounted() {

  },
  methods: {
    addNewGoodsInfo() {
      console.log("addGoodsInfoForm:",this.addGoodsInfoForm);
      addGoodsInfo(this.addGoodsInfoForm).then((res)=>{
        console.log('res:', res)
      })
      this.addGoodsInfoVisibility = false;
    },

  },
  watch: {
    addGoodsInfoVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addGoodsInfoForm = {};
      }
    },
  },
};
</script>
<style>
</style>