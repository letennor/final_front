<template>
  <div>
    <el-dialog
      title="添加投药记录"
      :visible.sync="addDeathRecordVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addDeathRecordRules"
        ref="addDeathRecordForm"
        :model="addDeathRecordForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="死亡数:" prop="deathNumber">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入死亡数"
                v-model="addDeathRecordForm.deathNumber"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="批次:" prop="batchId">
              <el-select
                v-model="addDeathRecordForm.batchId"
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
            <el-form-item label="统计员:" prop="deathRecordPerson">
              <el-select
                v-model="addDeathRecordForm.deathRecordPerson"
                placeholder="请选择统计员"
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
                v-model="addDeathRecordForm.recordPerson"
                placeholder="请选择捡记录员"
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
        <el-button @click="addDeathRecordVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewDeathRecord()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import {
  getAllMedicine,
  getAllPerson,
  getAllBatch,
  addDeathRecord,
} from "@/api/test";
export default {
  name: "AddDeathRecordDialog",
  data() {
    return {
      addDeathRecordForm: {},
      addDeathRecordVisibility: false,
      addDeathRecordRules: {},
      personList: [],
      medicineList: [],
      batchList: [],
    };
  },
  mounted() {
    this.getMedicineList();
    this.getPersonList();
    this.getBatchList();
  },
  methods: {
    addNewDeathRecord() {
      
      this.addDeathRecordForm.deathRate = this.addDeathRecordForm.deathNumber / 1000.00
      console.log(this.addDeathRecordForm);
      addDeathRecord(this.addDeathRecordForm).then((res) => {
        console.log("res:", res);
      });

      this.addDeathRecordVisibility = false;
    },

    getMedicineList() {
      getAllMedicine().then((res) => {
        this.medicineList = res.data.data;
      });
    },

    getPersonList() {
      getAllPerson().then((res) => {
        this.personList = res.data.data;
      });
    },
    getBatchList() {
      getAllBatch().then((res) => {
        this.batchList = res.data.data;
      });
    },
  },
  watch: {
    addDeathRecordVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addDeathRecordForm = {};
      }
    },
  },
};
</script>
<style>
</style>