<template>
  <div class="app-container mainDiv">
    <my-card title="出苗情况记录">
      <div class="filter-container">
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

    <my-card title="出苗情况记录可视化" style="margin-top: 20px">
      <div class="filter-container">
        <div ref="chart1" style="width: 50%; height: 376px"></div>
      </div>
    </my-card>

    <AddOutputRecordDialog ref="AddOutputRecordDialog" @refresh="refresh" />
  </div>
</template>

<script>
import AddOutputRecordDialog from "@/components/transport/addOutputRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllPerson } from "@/api/system";
import { getAllBatch } from "@/api/maintainInfo";
import {
  getAllOutputRecord,
  deleteOutputRecord,
  getOutputRecordByCondition,
  getOutputRecordChart,
} from "@/api/transport";
export default {
  name: "IndividualDeathRecord",
  components: {
    tableList,
    MyCard,
    AddOutputRecordDialog,
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
          text: "出苗量",
          value: "outputAmount",
        },
        {
          text: "出苗率",
          value: "outputRate",
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
      batchList: [],
      personList: [],
      listQuery: {
        pageSize: 15,
        currPage: 1,
        params: {},
      },
      chartInfo: {},
    };
  },
  mounted() {
    this.getList();
    this.getBatchList();
    this.getPersonList();
    this.getChartList();
  },
  methods: {
    update(val) {
      this.$refs.AddOutputRecordDialog.dialogForm = val.row;
      this.$refs.AddOutputRecordDialog.type = 0;
      this.$refs.AddOutputRecordDialog.dialogFormVisibility = true;
    },

    delete(val) {
      deleteOutputRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddOutputRecordDialog.type = 1;
      this.$refs.AddOutputRecordDialog.dialogForm = {};
      this.$refs.AddOutputRecordDialog.dialogFormVisibility = true;
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
      getAllOutputRecord().then((res) => {
        this.list = res.data.data;
        console.log("list:", this.list);
      });
    },

    refresh() {
      this.getList();
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

      getOutputRecordByCondition(this.listQuery.params).then((res) => {
        this.list = res.data.data;
      });
    },

    getChartList() {
      getOutputRecordChart().then((res) => {
        this.chartInfo.xData = res.data.data.xData;
        this.chartInfo.yData = [];
        //整理数据
        res.data.data.yData.forEach((element) => {
          this.chartInfo.yData.push(element.outputAmount);
        });

        this.chartInfo.xData.reverse();
        this.chartInfo.yData.reverse();

        this.getEchartData();
      });
    },

    getEchartData() {
      const chart1 = this.$refs.chart1;
      if (chart1) {
        const myChart = this.$echarts.init(chart1);
        const option = {
          tooltip: {
            trigger: "axis",
            alwaysShowContent: true,
          },
          title: {
            text: "出苗情况记录表",
            textStyle: {
              fontSize: 15,
            },
          },
          xAxis: {
            name: "日期",
            type: "category",
            data: this.chartInfo.xData,
          },
          yAxis: {
            name: "出苗量",
            type: "value",
          },
          series: [
            {
              name: "出苗量",
              data: this.chartInfo.yData,
              type: "line",
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
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
