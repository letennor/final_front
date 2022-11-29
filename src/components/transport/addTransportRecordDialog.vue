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
            <el-form-item label="出发地:" prop="start">
              <el-input
                class="filter-item"
                placeholder="请输入出发地"
                v-model="dialogForm.start"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="目的地:" prop="end">
              <el-input
                class="filter-item"
                placeholder="请输入目的地"
                v-model="dialogForm.end"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="车牌号:" prop="licensePlate">
              <el-input
                class="filter-item"
                placeholder="请输入车牌号"
                v-model="dialogForm.licensePlate"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="司机:" prop="driver">
              <el-select v-model="dialogForm.driver" placeholder="请选择司机">
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
                v-model="dialogForm.goodsId"
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibility = false">取消</el-button>
        <el-button type="primary" class="addButton" v-waves @click="type === 1 ? add() : update()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllGoodsInfo } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
import {
  addTransportRecord,
  getAllTransportRecord,
  deleteTransportRecord,
  updateTransportRecord,
} from "@/api/transport";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      type:1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
      personList: [],
      goodsInfoList: [],
    };
  },
  mounted() {
    this.getGoodsInfoList();
    this.getPersonList();
  },
  methods: {
    add() {
      console.log("dialogForm:", this.dialogForm);
      addTransportRecord(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updateTransportRecord(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
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