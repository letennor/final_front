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
            <el-form-item label="出苗量:" prop="outputAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入出苗量"
                v-model="dialogForm.outputAmount"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="运输记录:" prop="transportRecordId">
              <el-select
                v-model="dialogForm.transportRecordId"
                placeholder="请选择运输记录"
              >
                <el-option
                  v-for="item in transportInfoList"
                  :key="item.transportRecordId"
                  :label="
                    item.startPos +
                    '->' +
                    item.endPos +
                    ' | ' +
                    myParsetime(item.gmtCreate)
                  "
                  :value="item.transportRecordId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select
                v-model="dialogForm.recordPerson"
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
import { parseTime } from "@/utils/index";
import { getAllPerson } from "@/api/system";
import { getAllBatch } from "@/api/maintainInfo";
import {
  getAllTransportRecord,
  addOutputRecord,
  updateOutputRecord,
} from "@/api/transport";
export default {
  name: "AddIncomingRecordDialog",
  data() {
    return {
      type: 1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
      personList: [],
      batchList: [],
      transportInfoList: [],
    };
  },
  mounted() {
    this.getPersonList();
    this.getBatchList();
    this.getTransportRecordList();
  },
  methods: {
    add() {
      console.log("dialogForm:", this.dialogForm);
      this.dialogForm.outputRate = this.dialogForm.outputAmount / 1000.0;
      addOutputRecord(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updateOutputRecord(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
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

    getTransportRecordList() {
      getAllTransportRecord().then((res) => {
        this.transportInfoList = res.data.data;
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