<template>
  <div>
    <el-dialog
      title="添加运输信息"
      :visible.sync="addTransportRecordVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addTransportRecordRules"
        ref="addTransportRecordForm"
        :model="addTransportRecordForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="出发地:" prop="start">
              <el-input
                class="filter-item"
                placeholder="请输入出发地"
                v-model="addTransportRecordForm.start"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="目的地:" prop="end">
              <el-input
                class="filter-item"
                placeholder="请输入目的地"
                v-model="addTransportRecordForm.end"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="车牌号:" prop="licensePlate">
              <el-input
                class="filter-item"
                placeholder="请输入车牌号"
                v-model="addTransportRecordForm.licensePlate"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="司机:" prop="driver">
              <el-select
                v-model="addTransportRecordForm.driver"
                placeholder="请选择司机"
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
            <el-form-item label="货物类别:" prop="goodsId">
              <el-select
                v-model="addTransportRecordForm.goodsId"
                placeholder="请选择货物类别"
              >
                <el-option
                  v-for="item in goodsInfoList"
                  :key="item.goodsId"
                  :label="item.goodsName"
                  :value="item.goodsId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select
                v-model="addTransportRecordForm.recordPerson"
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
        <el-button @click="addTransportRecordVisibility = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewTransportRecord()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllGoodsInfo, getAllPerson, addTransportRecord } from "@/api/test";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      addTransportRecordForm: {},
      addTransportRecordVisibility: false,
      addTransportRecordRules: {},
      personList: [],
      goodsInfoList: [],
    };
  },
  mounted() {
    this.getGoodsInfoList();
    this.getPersonList();
  },
  methods: {
    addNewTransportRecord() {
      console.log("addTransportRecordForm:", this.addTransportRecordForm);
      addTransportRecord(this.addTransportRecordForm).then((res) => {
        console.log("res:", res);
      });
      this.addTransportRecordVisibility = false;
    },

    getGoodsInfoList() {
      getAllGoodsInfo().then((res) => {
        this.goodsInfoList = res.data.data;
      });
    },

    getPersonList() {
      getAllPerson().then((res) => {
        this.personList = res.data.data;
      });
    },
  },
  watch: {
    addTransportRecordVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addTransportRecordForm = {};
      }
    },
  },
};
</script>
<style>
</style>