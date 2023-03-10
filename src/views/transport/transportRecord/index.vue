<template>
  <div class="app-container mainDiv">
    <my-card title="出苗情况记录">
      <div class="filter-container">
        <span style="margin-right: 10px">记录员<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择记录员"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.recordPerson"
        >
          <el-option
            v-for="item in personList"
            :key="item.userBasicInfoId"
            :label="item.name"
            :value="item.userBasicInfoId"
          >
          </el-option>
        </el-select>

        <span style="margin-right: 10px">路线<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择路线"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.transportRoute"
        >
          <el-option
            v-for="item in transportRouteList"
            :key="item.transportRouteId"
            :label="item.startPos + '->' + item.endPos"
            :value="item.transportRouteId"
          >
          </el-option>
        </el-select>

        <span style="margin-right: 10px">司机<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择司机"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.driver"
        >
          <el-option
            v-for="item in personList"
            :key="item.userBasicInfoId"
            :label="item.name"
            :value="item.userBasicInfoId"
          >
          </el-option>
        </el-select>

        <span style="margin-right: 10px">车牌号<strong>:</strong></span>
        <el-input
          class="filter-item"
          placeholder="车牌号"
          v-model="listQuery.params.licensePlate"
          style="background-color: white; width: 200px; margin-top: 10px"
        >
        </el-input>

        <br />
        <span style="margin-right: 10px">记录日期<strong>:</strong></span>
        <el-date-picker
          placement="bottom-start"
          style="width: 400px; margin-bottom: 10px"
          v-model="listQuery.params.recordDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <br />
        <el-button class="filter-item" v-waves @click="reset">重置</el-button>
        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="search"
          >查询</el-button
        >

        <el-button
          class="filter-item addButton"
          type="primary"
          v-waves
          icon="el-icon-circle-plus-outline"
          @click="add()"
          >添加
        </el-button>
      </div>
      <table-list
        :data="list"
        :columns="columns"
        class="dataTable"
      ></table-list>
    </my-card>

    <AddTransportRecordDialog
      ref="AddTransportRecordDialog"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import AddTransportRecordDialog from "@/components/transport/addTransportRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllPerson } from "@/api/system";
import { getAllTransportRouteInfo } from "@/api/maintainInfo";
import {
  getAllOutputRecord,
  deleteOutputRecord,
  deleteTransportRecord,
  getAllTransportRecord,
  getTransportRecordByCondition,
} from "@/api/transport";
export default {
  name: "IndividualDeathRecord",
  components: {
    tableList,
    MyCard,
    AddTransportRecordDialog,
  },
  directives: {
    waves,
    dragDialog,
  },
  data() {
    return {
      // 表头名称和字段
      columns: [
        {
          text: "运输记录id",
          value: "transportRecordId",
        },
        {
          text: "出发地",
          value: "startPos",
        },
        {
          text: "目的地",
          value: "endPos",
        },
        {
          text: "车牌号",
          value: "licensePlate",
        },
        {
          text: "司机",
          value: "driverName",
        },
        {
          text: "货物类别",
          value: "goodsName",
        },
        {
          text: "记录员",
          value: "recordPersonName",
        },
        {
          text: "记录时间",
          value: "recordTime",
          filter: parseTime,
          filterParams: ["{y}年{m}月{d}日"],
        },
        {
          text: "操作",
          type: "iconButton",
          width: 180,
          fixed: "right",
          list: this.operButton,
        },
      ],
      list: [],
      transportRouteList: [],
      personList: [],
      listQuery: {
        pageSize: 15,
        currPage: 1,
        params: {},
      },
    };
  },
  mounted() {
    this.getList();
    this.getPersonList();
    this.getTransportRouteList();
  },
  methods: {
    update(val) {
      this.$refs.AddTransportRecordDialog.dialogForm = val.row;
      this.$refs.AddTransportRecordDialog.type = 0;
      this.$refs.AddTransportRecordDialog.dialogFormVisibility = true;
    },

    delete(val) {
      deleteTransportRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddTransportRecordDialog.type = 1;
      this.$refs.AddTransportRecordDialog.dialogForm = {};
      this.$refs.AddTransportRecordDialog.dialogFormVisibility = true;
    },

    // 表格操作按鈕
    operButton(val) {
      const temp = [
        { class: "iconzidingyipoumian", value: "编辑", click: this.update },
        { class: "iconshanchu", value: "删除", click: this.delete },
      ];
      return temp;
    },

    getList() {
      getAllTransportRecord().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
    },

    refresh() {
      this.getList();
    },

    getTransportRouteList() {
      getAllTransportRouteInfo().then((res) => {
        this.transportRouteList = res.data.data;
      });
    },

    reset() {
      (this.listQuery.params = {}), this.getList();
    },

    getBatchList() {
      getAllBatch().then((res) => {
        this.batchList = res.data.data;
      });
    },

    getPersonList() {
      getAllPerson().then((res) => {
        this.personList = res.data.data;
      });
    },

    search() {
      if ("recordDate" in this.listQuery.params) {
        this.listQuery.params.startDate = this.listQuery.params.recordDate[0];
        this.listQuery.params.endDate = this.listQuery.params.recordDate[1];
      }

      getTransportRecordByCondition(this.listQuery.params).then((res) => {
        this.list = res.data.data;
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.CheckDialog {
  .el-row {
    padding: 10px;
  }
}
</style>
