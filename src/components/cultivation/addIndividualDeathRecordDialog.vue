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
            <el-form-item label="死亡记录:" prop="deathRecordId">
              <el-select
                v-model="dialogForm.deathRecordId"
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
                v-model="dialogForm.deathReason"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select
                v-model="dialogForm.recordPerson"
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
import { getAllBatch } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
import {
  getAllDeathRecord,
  addIndividualDeathRecord,
  updateIndividualDeathRecord,
} from "@/api/cultivation";
import { parseTime } from "@/utils/index";
export default {
  name: "AddIndividualDeathRecord",
  data() {
    return {
      type: 1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
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
    add() {
      addIndividualDeathRecord(this.dialogForm).then((res) => {
        console.log("res:", res);
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updateIndividualDeathRecord(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
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