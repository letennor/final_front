<template>
  <div class="app-container mainDiv">
    <my-card title="产蛋量情况记录">
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

        <span style="margin-right: 10px">捡蛋员<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择捡蛋员"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.pickEggPerson"
        >
          <el-option
            v-for="item in personList"
            :key="item.userBasicInfoId"
            :label="item.name"
            :value="item.userBasicInfoId"
          >
          </el-option>
        </el-select>

        <span style="margin-right: 10px">批次<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择批次"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.batchId"
        >
          <el-option
            v-for="item in batchList"
            :key="item.batchId"
            :label="item.batchName"
            :value="item.batchId"
          >
          </el-option>
        </el-select>

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

    <!-- 添加产蛋量记录 -->
    <AddEggProductionRecordDialog
      ref="AddEggProductionRecordDialog"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import AddEggProductionRecordDialog from "@/components/cultivation/addEggProductionRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import {
  getAllEggProductionRecord,
  deleteEggProductionRecord,
  getEggProductionRecordByCondition,
} from "@/api/cultivation";
import { getAllPerson } from "@/api/system";
import { getAllBatch } from "@/api/maintainInfo";
export default {
  name: "EggProductionRecord",
  components: {
    tableList,
    MyCard,
    AddEggProductionRecordDialog,
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
          text: "批次",
          value: "batchName",
        },
        {
          text: "产蛋量",
          value: "eggProductionAmount",
        },
        {
          text: "产蛋率",
          value: "eggProductionRate",
        },
        {
          text: "坏蛋量",
          value: "badEggProductionAmount",
        },
        {
          text: "坏蛋率",
          value: "badEggProductionRate",
        },
        {
          text: "捡蛋员",
          value: "eggPickPersonName",
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
      listQuery: {
        pageSize: 15,
        currPage: 1,
        params: {},
      },
      personList: {},
      batchList: {},
    };
  },
  mounted() {
    this.getList();
    this.getPersonList();
    this.getBatchList();
  },
  methods: {
    update(val) {
      this.$refs.AddEggProductionRecordDialog.dialogForm = val.row;
      this.$refs.AddEggProductionRecordDialog.type = 0;
      this.$refs.AddEggProductionRecordDialog.dialogFormVisibility = true;
      console.log("点击编辑");
    },

    delete(val) {
      deleteEggProductionRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddEggProductionRecordDialog.type = 1;
      this.$refs.AddEggProductionRecordDialog.dialogForm = {};
      this.$refs.AddEggProductionRecordDialog.dialogFormVisibility = true;
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
      getAllEggProductionRecord().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
    },

    refresh() {
      this.getList();
    },

    getPersonList() {
      getAllPerson().then((res) => {
        this.personList = res.data.data;
        console.log("personList:", this.personList);
      });
    },

    getBatchList() {
      getAllBatch().then((res) => {
        this.batchList = res.data.data;
      });
    },

    reset() {
      (this.listQuery.params = {}), this.getList();
    },

    search() {
      if ("recordDate" in this.listQuery.params) {
        this.listQuery.params.startDate = this.listQuery.params.recordDate[0];
        this.listQuery.params.endDate = this.listQuery.params.recordDate[1];
      }
      console.log("this.listquery:", this.listQuery.params);
      getEggProductionRecordByCondition(this.listQuery.params).then((res) => {
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
