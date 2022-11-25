<template>
  <div>
    <el-dialog
      title="添加批次"
      :visible.sync="addBatchInfoVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addBatchInfoRules"
        ref="addBatchInfoForm"
        :model="addBatchInfoForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="批次名称:" prop="batchName">
              <el-input
                class="filter-item"
                placeholder="请输入用料名称"
                v-model="addBatchInfoForm.batchName"
              >
              </el-input>

            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select
                v-model="addBatchInfoForm.recordPerson"
                placeholder="请选择记录员"
              >
                <el-option
                  v-for="item in personList"
                  :key="item.userBasicInfoId"
                  :label="item.name"
                  :value="item.userBasicInfoId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBatchInfoVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewBatchInfo()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import { addBatchInfo} from "@/api/maintainInfo";
import { getAllPerson } from '@/api/system';
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      addBatchInfoForm: {},
      addBatchInfoVisibility: false,
      addBatchInfoRules: {},
      personList:[]
    };
  },
  mounted() {
    this.getPersonList()
  },
  methods: {
    addNewBatchInfo() {
      console.log(this.addBatchInfoForm);
      addBatchInfo(this.addBatchInfoForm).then((res)=>{
        this.$emit("refresh")
      })
      this.addBatchInfoVisibility = false
    },

     getPersonList() {
      getAllPerson().then((res) => {
        console.log('personList:', res)
        this.personList = res.data.data;
      });
    },
  },
  watch: {
    addBatchInfoVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addBatchInfoForm = {};
      }
    },
  },
};
</script>
<style>
</style>