<template>
  <div>
    <el-dialog
      title="添加个体死亡记录"
      :visible.sync="addIndividualDeathRecordVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addIndividualDeathRecordRules"
        ref="addIndividualDeathRecordForm"
        :model="addIndividualDeathRecordForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="死亡记录:" prop="deathRecordId">
              <el-select
                v-model="addIndividualDeathRecordForm.deathRecordId"
                placeholder="请选择死亡记录"
              >
                <el-option
                  v-for="item in deathRecordList"
                  :key="item.deathRecordId"
                  :label="myParsetime(item.gmtCreate)"
                  :value="item.deathRecordId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="死亡原因:" prop="deathReason">
              <el-input
                class="filter-item"
                type="textarea"
                autosize
                placeholder="请输入死亡原因"
                v-model="addIndividualDeathRecordForm.deathReason"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select
                v-model="addIndividualDeathRecordForm.recordPerson"
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
        <el-button @click="addIndividualDeathRecordVisibility = false"
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
import request from "@/utils/request";
import { getAllBatch } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
import { getAllDeathRecord, addIndividualDeathRecord } from "@/api/cultivation";
import { parseTime } from "@/utils/index";
export default {
  name: "AddIndividualDeathRecord",
  data() {
    return {
      addIndividualDeathRecordForm: {},
      addIndividualDeathRecordVisibility: false,
      addIndividualDeathRecordRules: {},
      batchList: [],
      personList: [],
      deathRecordList: [],
    };
  },
  mounted() {
    this.getDeathRecordList();
    this.getPersonList();
  },
  methods: {
    addNewFeedRecord() {
      addIndividualDeathRecord(this.addIndividualDeathRecordForm).then(
        (res) => {
          console.log("res:", res);
          this.$emit("refresh")
        }
      );
      this.addIndividualDeathRecordVisibility = false;
    },
    getPersonList() {
      //调用接口获取person
      getAllPerson().then((res) => {
        this.personList = res.data.data;
        console.log("personList:", this.personList);
      });
    },

    getDeathRecordList() {
      getAllDeathRecord().then((res) => {
        this.deathRecordList = res.data.data;
      });
    },

    myParsetime(time, cFormat) {
      return parseTime(time, "{y}-{m}-{d}");
    },
  },
  watch: {
    addIndividualDeathRecordVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addIndividualDeathRecordForm = {};
      }
    },
  },
};
</script>
<style>
</style>