<template>
  <div class="app-container mainDiv">
    <my-card title="个体死亡情况记录">
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

        <span style="margin-right: 10px">投药员<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择投药员"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.dosingPerson"
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

        <span style="margin-right: 10px">药物<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择药物"
          style="
            background-color: white;
            width: 200px;
            margin-right: 20px;
            margin-top: 10px;
          "
          v-model="listQuery.params.medicineId"
        >
          <el-option
            v-for="item in medicineList"
            :key="item.medicineId"
            :label="item.medicineName"
            :value="item.medicineId"
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

    <my-card title="投药情况记录可视化" style="margin-top: 20px">
      <div class="filter-container">
        <span style="margin-right: 10px">药物<strong>:</strong></span>
        <el-select
          class="filter-item"
          placeholder="请选择药物"
          style="background-color: white; width: 200px; margin-right: 20px"
          v-model="chartMedicineId"
        >
          <el-option
            v-for="item in medicineList"
            :key="item.medicineId"
            :label="item.medicineName"
            :value="item.medicineId"
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

    <!-- 添加投药记录 -->
    <AddDosingRecordDialog ref="AddDosingRecordDialog" @refresh="refresh" />
  </div>
</template>

<script>
import AddDosingRecordDialog from "@/components/cultivation/addDosingRecordDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import {
  getAllDosingRecord,
  deleteDosingRecord,
  getDosingRecordByCondition,
  getDosingRecordChart,
} from "@/api/cultivation";
import { getAllPerson } from "@/api/system";
import { getAllMedicine, getAllBatch } from "@/api/maintainInfo";
export default {
  name: "DosingRecord",
  components: {
    tableList,
    MyCard,
    AddDosingRecordDialog,
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
          text: "投药量",
          value: "dosingAmount",
        },
        {
          text: "投药种类",
          value: "medicineName",
        },
        {
          text: "投药员",
          value: "dosingPersonName",
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
      medicineList: {},
      chartMedicineId: null,
      chartInfo: [],
    };
  },
  mounted() {
    this.getList();
    this.getPersonList();
    this.getBatchList();
    this.getMedicineList();
  },
  methods: {
    update(val) {
      this.$refs.AddDosingRecordDialog.dialogForm = val.row;
      this.$refs.AddDosingRecordDialog.type = 0;
      this.$refs.AddDosingRecordDialog.dialogFormVisibility = true;
      console.log("点击编辑");
    },

    delete(val) {
      console.log("val:", val);
      deleteDosingRecord(val.row).then((res) => {
        console.log("res:", res);
        this.getList();
      });
    },

    // 新增
    add() {
      this.$refs.AddDosingRecordDialog.type = 1;
      this.$refs.AddDosingRecordDialog.dialogForm = {};
      this.$refs.AddDosingRecordDialog.dialogFormVisibility = true;
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
      getAllDosingRecord().then((res) => {
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

    getMedicineList() {
      getAllMedicine().then((res) => {
        this.medicineList = res.data.data;
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
      getDosingRecordByCondition(this.listQuery.params).then((res) => {
        this.list = res.data.data;
      });
    },

    createChart() {
      if (this.chartMedicineId == null) {
        this.$message("请先选择药物");
      } else {
        this.chartInfo = {};
        // 发送请求，生成数据
        getDosingRecordChart({ medicineId: this.chartMedicineId }).then((res) => {
          this.chartInfo.xData = res.data.data.xData;
          this.chartInfo.yData = [];
          res.data.data.yData.forEach((element) => {
            this.chartInfo.yData.push(element.dosingAmount);
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
            text: "投药情况记录表",
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
            name: "投药量",
            type: "value",
          },
          series: [
            {
              name: "投药量",
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
