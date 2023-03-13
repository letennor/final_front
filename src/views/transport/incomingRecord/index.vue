<template>
  <div class="app-container mainDiv">
    <my-card title="进货情况记录">
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

        <span style="margin-right: 10px">货物类型<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择货物类型"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.goodsId"
        >
          <el-option
            v-for="item in goodsList"
            :key="item.goodsId"
            :label="item.goodsName"
            :value="item.goodsId"
          >
          </el-option>
        </el-select>

        <!--
        <span style="margin-right: 10px">进货量<strong>:</strong></span>
        <el-input
          class="filter-item"
          type="number"
          placeholder="最小值"
          v-model="listQuery.params.minAmount"
          style="background-color: white; width: 200px; margin-top: 10px"
        >
        </el-input>
        -
        <el-input
          class="filter-item"
          type="number"
          placeholder="最大值"
          v-model="listQuery.params.maxAmount"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
        >
        </el-input> 
        -->

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

    <my-card title="进货情况记录可视化" style="margin-top: 20px">
      <div class="filter-container">
        <span style="margin-right: 10px">货物<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择货物"
          style="background-color: white; width: 200px; margin-right: 20px"
          v-model="chartGoodsId"
        >
          <el-option
            v-for="item in goodsList"
            :key="item.goodsId"
            :label="item.goodsName"
            :value="item.goodsId"
          >
          </el-option>
        </el-select>
        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="createChart"
          >生成图表</el-button
        >
        <div ref="chart1" style="width: 50%; height: 376px"></div>
      </div>
    </my-card>

    <!-- 添加个体死亡量记录 -->
    <AddIncomingRecordDialog ref="AddIncomingRecordDialog" @refresh="refresh" />
  </div>
</template>

<script>
import AddIncomingRecordDialog from "@/components/transport/addIncomingRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import {
  getAllIncomingRecord,
  deleteIncomingRecord,
  getIncomingRecordByCondition,
  getIncomingRecordChart,
} from "@/api/transport";
import { getAllBatch, getAllGoodsInfo } from "@/api/maintainInfo";
export default {
  name: "IndividualDeathRecord",
  components: {
    tableList,
    MyCard,
    AddIncomingRecordDialog,
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
          text: "进货量",
          value: "incomingAmount",
        },
        {
          text: "进货类型",
          value: "goodsName",
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
      goodsList: [],
      listQuery: {
        pageSize: 15,
        currPage: 1,
        params: {},
      },
      charInfo: {},
      chartGoodsId: null,
    };
  },
  mounted() {
    this.getList();
    this.getBatchList();
    this.getGoodsList();
  },
  methods: {
    update(val) {
      this.$refs.AddIncomingRecordDialog.dialogForm = val.row;
      this.$refs.AddIncomingRecordDialog.type = 0;
      this.$refs.AddIncomingRecordDialog.dialogFormVisibility = true;
    },

    delete(val) {
      deleteIncomingRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddIncomingRecordDialog.type = 1;
      this.$refs.AddIncomingRecordDialog.dialogForm = {};
      this.$refs.AddIncomingRecordDialog.dialogFormVisibility = true;
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
      getAllIncomingRecord().then((res) => {
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

    search() {
      if ("recordDate" in this.listQuery.params) {
        this.listQuery.params.startDate = this.listQuery.params.recordDate[0];
        this.listQuery.params.endDate = this.listQuery.params.recordDate[1];
      }

      getIncomingRecordByCondition(this.listQuery.params).then((res) => {
        this.list = res.data.data;
      });
    },

    getGoodsList() {
      getAllGoodsInfo().then((res) => {
        this.goodsList = res.data.data;
      });
    },

    createChart() {
      if (this.chartGoodsId == null) {
        this.$message("请先选择药物");
      } else {
        this.chartInfo = {};
        // 发送请求，生成数据
        getIncomingRecordChart({ goodsId: this.chartGoodsId }).then((res) => {
          this.chartInfo.xData = res.data.data.xData;
          this.chartInfo.yData = [];
          res.data.data.yData.forEach((element) => {
            this.chartInfo.yData.push(element.incomingAmount);
          });

          this.chartInfo.xData.reverse();
          this.chartInfo.yData.reverse();

          this.getEchartData();
        });
      }
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
            text: "进货情况记录表",
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
            name: "进货量",
            type: "value",
          },
          series: [
            {
              name: "进货量",
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
