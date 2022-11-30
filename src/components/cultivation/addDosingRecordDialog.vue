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
            <el-form-item label="投药量:" prop="dosingAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入投药量"
                v-model="dialogForm.dosingAmount"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="投药种类:" prop="medicineId">
              <el-select
                v-model="dialogForm.medicineId"
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
              <el-select v-model="dialogForm.batchId" placeholder="请选择批次">
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
                v-model="dialogForm.dosingPerson"
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
                v-model="dialogForm.recordPerson"
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

          <el-col :span="24">
            <el-form-item label="记录时间:" prop="recordPerson">
              <el-date-picker
                placement="bottom-start"
                v-model="dialogForm.recordTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
                style="width: 100%"
              >
              </el-date-picker>
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
import { getAllMedicine, getAllBatch } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
import { addDosingRecord, updateDosingRecord } from "@/api/cultivation";
export default {
  name: "AddDosingRecordDialog",
  data() {
    return {
      type: 1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
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
    add() {
      console.log(this.dialogForm);
      addDosingRecord(this.dialogForm).then((res) => {
        console.log("res:", res);
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updateDosingRecord(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
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