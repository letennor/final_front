<template>
  <div>
    <el-dialog
      title="添加产蛋记录"
      :visible.sync="addEggProductionVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addEggProductionRules"
        ref="addEggProductionForm"
        :model="addEggProductionForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="批次:" prop="batchId">
              <el-select
                v-model="addEggProductionForm.batchId"
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
            <el-form-item label="产蛋量:" prop="eggProductionAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入产蛋量"
                v-model="addEggProductionForm.eggProductionAmount"
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
                v-model="addEggProductionForm.badEggProductionAmount"
              >
              <template slot="append">公斤</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="捡蛋员:" prop="pickEggPerson">
              <el-select
                v-model="addEggProductionForm.pickEggPerson"
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
                v-model="addEggProductionForm.recordPerson"
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEggProductionVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewEggProduction()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllBatch, getAllPerson,addEggProductionRecord } from "@/api/test";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      addEggProductionForm: {},
      addEggProductionVisibility: false,
      addEggProductionRules: {},
      batchList: [],
      personList: [],
    };
  },
  mounted() {
    this.getBatchList();
    this.getPersonList();
  },
  methods: {
    addNewEggProduction() {
      console.log(this.addEggProductionForm);
      const eggProductionRate = this.addEggProductionForm.eggProductionAmount / 1000.00
      const badEggProductionRate = this.addEggProductionForm.badEggProductionAmount / 1000.00

      this.addEggProductionForm.eggProductionRate = eggProductionRate;
      this.addEggProductionForm.badEggProductionRate = badEggProductionRate;

      addEggProductionRecord(this.addEggProductionForm).then((res)=>{
        console.log('res:',res)
      })

      this.addEggProductionVisibility = false;
    },

    getBatchList() {
      getAllBatch().then((res) => {
        console.log('批次:', res)
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
    addEggProductionVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addEggProductionForm = {};
      }
    },
  },
};
</script>
<style>
</style>