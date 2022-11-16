<template>
  <div>
    echarts测试
    <el-button type="primary" @click="showPic" class="addButton" v-waves>展示图形</el-button>
    <template v-for="chart in chartList">
        <div v-if="chart !== undefined" :key="chart.id" style="height: 500px; width: 100%" :id="chart.domId"></div>
    </template>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "Model2-2",
  data() {
    return {
      linesOption: {},
      chartList: [],
    };
  },
  mounted() {
    const myChartList = [
      {
        id: 1,
        domId: "line",
        option: {
          title: {
            text: "World Population",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
          },
          series: [
            {
              name: "2011",
              type: "bar",
              data: [18203, 23489, 29034, 104970, 131744, 630230],
            },
            {
              name: "2012",
              type: "bar",
              data: [19325, 23438, 31000, 121594, 134141, 681807],
            },
          ],
        },
      },
      {
        id: 2,
        domId: "circle",
        option: {
          title: {
            text: "Referer of a Website",
            subtext: "Fake Data",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: [
                { value: 1048, name: "Search Engine" },
                { value: 735, name: "Direct" },
                { value: 580, name: "Email" },
                { value: 484, name: "Union Ads" },
                { value: 300, name: "Video Ads" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        },
      },
      {
        id: 3,
        domId: "dot",
        option: {
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
        },
      },
    ];

    this.chartList = myChartList
  },
  methods: {
    showPic() {
        //使用循环配置变量，然后展示
        this.chartList.forEach(chart=>{
            //获取dom
            const dom = document.getElementById(chart.domId)
            //配置echarts实例
            const myChart = echarts.init(dom)
            //展示图形
            myChart.setOption(chart.option)
        })
    },
  },
};
</script>
<style lang="scss">

</style>