<template>
  <div>
    <el-dialog
      title="添加投药记录"
      :visible.sync="addDosingRecordVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addDosingRecordRules"
        ref="addDosingRecordForm"
        :model="addDosingRecordForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="投药量:" prop="dosingAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入投药量"
                v-model="addDosingRecordForm.dosingAmount"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="投药种类:" prop="medicineId">
              <el-select
                v-model="addDosingRecordForm.medicineId"
                placeholder="请选择投药种类"
              >
                <el-option
                  v-for="item in medicineList"
                  :key="item.medicineId"
                  :label="item.medicineName"
                  :value="item.medicineId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="批次:" prop="batchId">
              <el-select
                v-model="addDosingRecordForm.batchId"
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
            <el-form-item label="投药员:" prop="dosingPerson">
              <el-select
                v-model="addDosingRecordForm.dosingPerson"
                placeholder="请选择投药员"
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
                v-model="addDosingRecordForm.recordPerson"
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
        <el-button @click="addDosingRecordVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewDosingRecord()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import { getAllMedicine, getAllBatch } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
import {
  addDosingRecord,
} from "@/api/cultivation";
export default {
  name: "AddDosingRecordDialog",
  data() {
    return {
      addDosingRecordForm: {},
      addDosingRecordVisibility: false,
      addDosingRecordRules: {},
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
    addNewDosingRecord() {
      console.log(this.addDosingRecordForm);
      addDosingRecord(this.addDosingRecordForm).then((res) => {
        console.log("res:", res);
        this.$emit("refresh");
      });
      this.addDosingRecordVisibility = false;
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
        console.log("批次:", res);
        this.batchList = res.data.data;
      });
    },
  },
  watch: {
    addDosingRecordVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addDosingRecordForm = {};
      }
    },
  },
};
</script>
<style>
</style>