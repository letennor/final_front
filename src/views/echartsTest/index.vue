<template>
  <div>
    <el-button type="primary" class="addButton" @click="addBar()"
      >柱状图</el-button
    >
    <el-button type="primary" class="addButton" @click="addBarMultyY()"
      >多Y轴柱状图</el-button
    >
    <el-button type="primary" class="addButton" @click="addScatter()"
      >散点图</el-button
    >
    <el-button type="primary" class="addButton" @click="addScatterMulty()"
      >多散点图</el-button
    >
    <el-button type="primary" class="addButton" @click="addRadar()"
      >雷达图</el-button
    >
    <div id="bar" class="chart"></div>
    <div id="barMultiy" class="chart"></div>
    <div id="scatter" class="chart"></div>
    <div id="radar" class="chart"></div>
  </div>
</template>
<script>
export default {
  name: "EchartsTest",
  data() {
    return {};
  },
  methods: {
    addBar() {
      let chartDom = document.getElementById("bar");
      let myChart = this.$echarts.init(chartDom);
      let option;

      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      let data4 = [];
      for (let i = 0; i < 10; i++) {
        xAxisData.push("Class" + i);
        data1.push(+(Math.random() * 2).toFixed(2));
        data2.push(+(Math.random() * 5).toFixed(2));
        data3.push(+(Math.random() + 0.3).toFixed(2));
        data4.push(+Math.random().toFixed(2));
      }
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0,0,0,0.3)",
        },
      };
      option = {
        legend: {
          data: ["bar", "bar2", "bar3", "bar4"],
          left: "10%",
        },
        brush: {
          toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
          xAxisIndex: 0,
        },
        toolbox: {
          feature: {
            magicType: {
              type: ["stack"],
            },
            dataView: {},
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          name: "X Axis",
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false },
        },
        yAxis: {},
        grid: {
          bottom: 100,
        },
        series: [
          {
            name: "bar",
            type: "bar",
            stack: "one",
            emphasis: emphasisStyle,
            data: data1,
          },
          {
            name: "bar2",
            type: "bar",
            stack: "one",
            emphasis: emphasisStyle,
            data: data2,
          },
          {
            name: "bar3",
            type: "bar",
            stack: "two",
            emphasis: emphasisStyle,
            data: data3,
          },
          {
            name: "bar4",
            type: "bar",
            stack: "two",
            emphasis: emphasisStyle,
            data: data4,
          },
        ],
      };
      myChart.on("brushSelected", function (params) {
        var brushed = [];
        var brushComponent = params.batch[0];
        for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
          var rawIndices = brushComponent.selected[sIdx].dataIndex;
          brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
        }
        myChart.setOption({
          title: {
            backgroundColor: "#333",
            text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
            bottom: 0,
            right: "10%",
            width: 100,
            textStyle: {
              fontSize: 12,
              color: "#fff",
            },
          },
        });
      });

      myChart.setOption(option);
    },
    addBarMultyY() {
      let chartDom = document.getElementById("barMultiy");
      let myChart = this.$echarts.init(chartDom);
      let option;

      const colors = ["#5470C6", "#91CC75", "#EE6666"];
      option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          right: "10%",
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Evaporation", "Precipitation", "Temperature"],
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Evaporation",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "Precipitation",
            position: "right",
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "温度",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "Precipitation",
            type: "bar",
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 2,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      };

      myChart.setOption(option);
    },
    addScatter() {
      let chartDom = document.getElementById("scatter");
      let myChart = this.$echarts.init(chartDom);
      let option;

      option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68],
            ],
            type: "scatter",
          },
        ],
      };

      myChart.setOption(option);
    },
    addScatterMulty() {
      let chartDom = document.getElementById("scatterMulty");
      let myChart = this.$echarts.init(chartDom);
      let option;

      const dataAll = [
        [
          [10.0, 8.04],
          [8.0, 6.95],
          [13.0, 7.58],
          [9.0, 8.81],
          [11.0, 8.33],
          [14.0, 9.96],
          [6.0, 7.24],
          [4.0, 4.26],
          [12.0, 10.84],
          [7.0, 4.82],
          [5.0, 5.68],
        ],
        [
          [10.0, 9.14],
          [8.0, 8.14],
          [13.0, 8.74],
          [9.0, 8.77],
          [11.0, 9.26],
          [14.0, 8.1],
          [6.0, 6.13],
          [4.0, 3.1],
          [12.0, 9.13],
          [7.0, 7.26],
          [5.0, 4.74],
        ],
        [
          [10.0, 7.46],
          [8.0, 6.77],
          [13.0, 12.74],
          [9.0, 7.11],
          [11.0, 7.81],
          [14.0, 8.84],
          [6.0, 6.08],
          [4.0, 5.39],
          [12.0, 8.15],
          [7.0, 6.42],
          [5.0, 5.73],
        ],
        [
          [8.0, 6.58],
          [8.0, 5.76],
          [8.0, 7.71],
          [8.0, 8.84],
          [8.0, 8.47],
          [8.0, 7.04],
          [8.0, 5.25],
          [19.0, 12.5],
          [8.0, 5.56],
          [8.0, 7.91],
          [8.0, 6.89],
        ],
      ];
      const markLineOpt = {
        animation: false,
        label: {
          formatter: "y = 0.5 * x + 3",
          align: "right",
        },
        lineStyle: {
          type: "solid",
        },
        tooltip: {
          formatter: "y = 0.5 * x + 3",
        },
        data: [
          [
            {
              coord: [0, 3],
              symbol: "none",
            },
            {
              coord: [20, 13],
              symbol: "none",
            },
          ],
        ],
      };
      option = {
        title: {
          text: "Anscombe's quartet",
          left: "center",
          top: 0,
        },
        grid: [
          { left: "7%", top: "7%", width: "38%", height: "38%" },
          { right: "7%", top: "7%", width: "38%", height: "38%" },
          { left: "7%", bottom: "7%", width: "38%", height: "38%" },
          { right: "7%", bottom: "7%", width: "38%", height: "38%" },
        ],
        tooltip: {
          formatter: "Group {a}: ({c})",
        },
        xAxis: [
          { gridIndex: 0, min: 0, max: 20 },
          { gridIndex: 1, min: 0, max: 20 },
          { gridIndex: 2, min: 0, max: 20 },
          { gridIndex: 3, min: 0, max: 20 },
        ],
        yAxis: [
          { gridIndex: 0, min: 0, max: 15 },
          { gridIndex: 1, min: 0, max: 15 },
          { gridIndex: 2, min: 0, max: 15 },
          { gridIndex: 3, min: 0, max: 15 },
        ],
        series: [
          {
            name: "I",
            type: "scatter",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: dataAll[0],
            markLine: markLineOpt,
          },
          {
            name: "II",
            type: "scatter",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: dataAll[1],
            markLine: markLineOpt,
          },
          {
            name: "III",
            type: "scatter",
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: dataAll[2],
            markLine: markLineOpt,
          },
          {
            name: "IV",
            type: "scatter",
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: dataAll[3],
            markLine: markLineOpt,
          },
        ],
      };

      myChart.setOption(option);
    },
    addRadar() {
      let chartDom = document.getElementById("radar");
      let myChart = this.$echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: "Basic Radar Chart",
        },
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style>
.chart {
  width: 100%;
  height: 400px;
}
</style>