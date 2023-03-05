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
            <el-form-item label="产蛋量:" prop="eggProductionAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入产蛋量"
                v-model="dialogForm.eggProductionAmount"
              >
                <template slot="append">公斤</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="坏蛋量:" prop="badEggProductionAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入坏蛋量"
                v-model="dialogForm.badEggProductionAmount"
              >
                <template slot="append">公斤</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="捡蛋员:" prop="pickEggPerson">
              <el-select
                v-model="dialogForm.pickEggPerson"
                placeholder="请选择捡蛋员"
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
import { getAllBatch } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
import {
  addEggProductionRecord,
  updateEggProductionRecord,
} from "@/api/cultivation";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      type: 1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
      batchList: [],
      personList: [],
    };
  },
  mounted() {
    this.getBatchList();
    this.getPersonList();
  },
  methods: {
    add() {
      const eggProductionRate = this.dialogForm.eggProductionAmount / 1000.0;
      const badEggProductionRate =
        this.dialogForm.badEggProductionAmount / 1000.0;

      this.dialogForm.eggProductionRate = eggProductionRate;
      this.dialogForm.badEggProductionRate = badEggProductionRate;
      addEggProductionRecord(this.dialogForm).then((res) => {
        console.log("res:", res);
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updateEggProductionRecord(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    getBatchList() {
      getAllBatch().then((res) => {
        console.log("批次:", res);
        this.batchList = res.data.data;
      });
    },

    getPersonList() {
      getAllPerson().then((res) => {
        this.personList = res.data.data;
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