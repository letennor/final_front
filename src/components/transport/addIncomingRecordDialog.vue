<template>
  <div>
    <el-dialog
      title="添加进货信息"
      :visible.sync="addIncomingRecordVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="addIncomingRules"
        ref="addIncomingRecordForm"
        :model="addIncomingRecordForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="批次:" prop="batchId">
              <el-select
                v-model="addIncomingRecordForm.batchId"
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
            <el-form-item label="进货量:" prop="incomingAmount">
              <el-input
                class="filter-item"
                type="number"
                placeholder="请输入进货量"
                v-model="addIncomingRecordForm.incomingAmount"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="货物类别:" prop="goodsId">
              <el-select
                v-model="addIncomingRecordForm.goodsId"
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
            <el-form-item label="运输记录:" prop="transportRecordId">
              <el-select
                v-model="addIncomingRecordForm.transportRecordId"
                placeholder="请选择运输记录"
              >
                <el-option
                  v-for="item in transportInfoList"
                  :key="item.transportRecordId"
                  :label="item.start + '->' + item.end + ' | ' + myParsetime(item.gmtCreate)"
                  :value="item.transportRecordId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addIncomingRecordVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="addNewIncomingRecord()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {parseTime} from "@/utils/index"
import {
  getAllPerson,
  getAllGoodsInfo,
  getAllTransportRecord,
  getAllBatch,
  addIncomingRecord,
} from "@/api/transport";
export default {
  name: "AddIncomingRecordDialog",
  data() {
    return {
      addIncomingRecordForm: {},
      addIncomingRecordVisibility: false,
      addIncomingRules: {},
      personList: [],
      batchList: [],
      goodsInfoList: [],
      transportInfoList: [],
    };
  },
  mounted() {
    this.getGoodsInfoList();
    this.getPersonList();
    this.getBatchList();
    this.getTransportRecordList();
  },
  methods: {
    addNewIncomingRecord() {
      console.log("addIncomingRecordForm:", this.addIncomingRecordForm);
      addIncomingRecord(this.addIncomingRecordForm).then((res) => {
        console.log("res:", res);
      });
      this.addIncomingRecordVisibility = false;
    },

    getGoodsInfoList() {
      getAllGoodsInfo().then((res) => {
        console.log("==", res);
        this.goodsInfoList = res.data.data;
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
    
    myParsetime(time, cFormat){
        return parseTime(time, "{y}-{m}-{d}")
    }
  },
  watch: {
    addIncomingRecordVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.addIncomingRecordForm = {};
      }
    },
  },
};
</script>
<style>
</style>