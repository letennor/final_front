<template>
  <div>
    <el-dialog
      title="添加投喂记录"
      :visible.sync="addFeedRecordVisiblility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addFeedRecordRules"
        ref="addFeedRecordForm"
        :model="addFeedRecordForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="批次:" prop="batchId">
              <el-select
                v-model="addFeedRecordForm.batchId"
                placeholder="请选择批次"
              >
                <el-option
                  v-for="item in batchList"
                  :key="item.batchId"
                  :label="item.batchName"
                  :value="item.batchId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="用料类型:" prop="feedId">
              <el-select
                v-model="addFeedRecordForm.feedId"
                placeholder="请选择批次"
              >
                <el-option
                  v-for="item in feedList"
                  :key="item.feedId"
                  :label="item.feedName"
                  :value="item.feedId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="用料量:" prop="feedAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入用料量"
                v-model="addFeedRecordForm.feedAmount"
              >
                <template slot="append">公斤</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="饲养员:" prop="feedPerson">
              <el-select
                v-model="addFeedRecordForm.feedPerson"
                placeholder="请选择批次"
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

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select
                v-model="addFeedRecordForm.recordPerson"
                placeholder="请选择批次"
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
        <el-button @click="addFeedRecordVisiblility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewFeedRecord()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import {
  getAllPerson,
  addFeedRecord,
  getAllFeed,
  getAllBatch,
} from "@/api/test";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      addFeedRecordForm: {},
      addFeedRecordVisiblility: false,
      addFeedRecordRules: {},
      batchList: [],
      feedList: [],
      personList: [],
    };
  },
  mounted() {
    this.getPersonList();
    this.getFeedList();
    this.getBatchList();
  },
  methods: {
    addNewFeedRecord() {
      console.log("addFeedRecordForm:",this.addFeedRecordForm);
      addFeedRecord(this.addFeedRecordForm).then((res) => {
        console.log("suc");
      });
      this.addFeedRecordVisiblility = false;
    },
    getPersonList() {
      //调用接口获取person
      getAllPerson().then((res) => {
        this.personList = res.data.data;
        console.log("personList:", this.personList);
      });
    },

    getFeedList() {
      getAllFeed().then((res) => {
        console.log("res:", res);
        this.feedList = res.data.data;
      });
    },

    getBatchList() {
      getAllBatch().then((res) => {
        console.log("getAllBatch:", res);
        this.batchList = res.data.data;
      });
    },
  },
  watch: {
    addFeedRecordVisiblility(newValue, oldValue) {
      if (newValue === false) {
        this.addFeedRecordForm = {};
      }
    },
  },
};
</script>
<style>
</style>