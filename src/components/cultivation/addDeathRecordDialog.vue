<template>
  <div>
    <el-dialog
      title="添加投药记录"
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
            <el-form-item label="死亡数:" prop="deathNumber">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入死亡数"
                v-model="dialogForm.deathNumber"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="批次:" prop="batchId">
              <el-select
                v-model="dialogForm.batchId"
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
                v-model="dialogForm.deathRecordPerson"
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
import { getAllMedicine, getAllBatch } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
import { addDeathRecord } from "@/api/cultivation";
export default {
  name: "AddDeathRecordDialog",
  data() {
    return {
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
      this.dialogForm.deathRate =
        this.dialogForm.deathNumber / 1000.0;
      console.log(this.dialogForm);
      addDeathRecord(this.dialogForm).then((res) => {
        console.log("res:", res);
        this.$emit("refresh")
      });

      this.dialogFormVisibility = false;
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