<template>
  <div>
    <el-button type="primary" class="addButton" @click="addBarMultyY()"
      >多Y轴柱状图</el-button
    >
    <div id="barMultiy" class="chart"></div>
  </div>
</template>
<script>
export default {
  name: "MultiBar",
  data() {
    return {
        //需要通过接口获取数据
    };
  },
  methods: {
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
        //注意legend要与下面的series保持一致
        legend: {
          data: ["投药量", "投喂量", "产蛋量"],
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "投药量",
            position: "right",
            alignTicks: true,//在多个y轴为数值轴的时候，开启这个则自动对齐刻度
            axisLine: {
              show: true,//是否显示坐标轴轴线
              lineStyle: {//坐标轴样式
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "投喂量",
            position: "right",
            alignTicks: true,
            offset: 80,//y轴相对于默认位置的偏移
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
            name: "产蛋量",
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
            name: "投药量",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "投喂量",
            type: "bar",
            yAxisIndex: 1,//指定某一个y轴（下表从0开始）
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "产蛋量",
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
  },
};
</script>
<style>
.chart {
  width: 100%;
  height: 400px;
}
</style>