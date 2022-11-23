<template>
  <div>
    <el-dialog
      title="添加用料"
      :visible.sync="addFeedInfoVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addFeedInfoRules"
        ref="addFeedInfoForm"
        :model="addFeedInfoForm"
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
                v-model="addFeedInfoForm.feedName"
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
                v-model="addFeedInfoForm.totalAmount"
              >
              </el-input>

            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeedInfoVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewFeed()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import { addFeedInfo} from "@/api/test";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      addFeedInfoForm: {},
      addFeedInfoVisibility: false,
      addFeedInfoRules: {},
    };
  },
  mounted() {
  },
  methods: {
    addNewFeed() {
      console.log(this.addFeedInfoForm);
      addFeedInfo(this.addFeedInfoForm).then((res)=>{
        console.log('suc');
      })
      this.addFeedInfoVisibility = false
    },

  },
  watch: {
    addFeedInfoVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addFeedInfoForm = {};
      }
    },
  },
};
</script>
<style>
</style>