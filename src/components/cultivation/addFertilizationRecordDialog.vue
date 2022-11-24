<template>
  <div>
    <el-dialog
      title="添加受精记录"
      :visible.sync="addFertilizationRecordVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addFertilizationRecordRules"
        ref="addFertilizationRecordForm"
        :model="addFertilizationRecordForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="批次:" prop="batchId">
              <el-select
                v-model="addFertilizationRecordForm.batchId"
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
            <el-form-item label="受精时间:" prop="fertilizationTime">
              <el-date-picker
                placement="bottom-start"
                v-model="addFertilizationRecordForm.fertilizationTime"
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
            <el-form-item label="受精率:" prop="fertilizationRate">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入受精率"
                v-model="addFertilizationRecordForm.fertilizationRate"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="操作员:" prop="operatePerson">
              <el-select
                v-model="addFertilizationRecordForm.operatePerson"
                placeholder="请选择人员"
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
                v-model="addFertilizationRecordForm.recordPerson"
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
        <el-button @click="addFertilizationRecordVisibility = false"
          >取消</el-button
        >
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
import {
  getAllPerson,
  getAllBatch,
  addFertilizationRecord,
} from "@/api/cultivation";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      addFertilizationRecordForm: {},
      addFertilizationRecordVisibility: false,
      addFertilizationRecordRules: {},
      batchList: [],
      personList: [],
    };
  },
  mounted() {
    this.getPersonList();
    this.getBatchList();
  },
  methods: {
    addNewFeedRecord() {
      console.log(
        "addFertilizationRecordForm:",
        this.addFertilizationRecordForm
      );
      this.addFertilizationRecordForm.fertilizationRate =
        this.addFertilizationRecordForm.fertilizationRate / 100.0;
      addFertilizationRecord(this.addFertilizationRecordForm).then((res) => {
        console.log("res:", res);
      });
      this.addFertilizationRecordVisibility = false;
    },
    getPersonList() {
      //调用接口获取person
      getAllPerson().then((res) => {
        this.personList = res.data.data;
        console.log("personList:", this.personList);
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
    addFertilizationRecordVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addFertilizationRecordForm = {};
      }
    },
  },
};
</script>
<style>
</style>