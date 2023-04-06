<template>
  <div class="calendarContainer">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <p style="text-align: center">
          {{ date | parseTime("{d}") }}
        </p>

        <template v-if="map.get(data.day)">
          <span v-for="item in map.get(data.day)" :key="item.workflowId">
            <template v-if="item.isFinished === 0">
              <strong>[</strong>{{ item.workName }}<strong>]</strong>
            </template>

          </span>
        </template>


      </template>
    </el-calendar>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
import { testGenerateToken, getUserInfo } from "@/api/login";
import { getPersonAllWorkFlow } from "@/api/workArrangement"
export default {
  name: "Calendar",
  components: {},
  props: {},
  data() {
    return {
      loading: true,
      obj: {},
      value: new Date(),
      listQuery: {
        currPage: 1,
        pageSize: 1000,
        params: {},
      },
      detail: {},
      workFlowInfoList: [],
      workFlowInfoObj: {},
      map: new Map,
    };
  },
  mounted() {
    console.log("进入首页");
    this.getToken();
    this.getWorkInfoList()
  },
  beforeDestroy() { },
  methods: {
    currentChange(val) {
      console.log("查找下一页:");
    },
    getToken() {
      testGenerateToken().then((res) => {
        console.log("token:", res.data.data);
        localStorage.setItem("token", res.data.data);
      });
    },

    getUserInfo() {
      getUserInfo({ token: localStorage.getItem("token") }).then((res) => {
        console.log("userInfo:", res.data.data);
      });
    },

    getWorkInfoList() {
      getPersonAllWorkFlow({ workPerson: this.$store.state.user.userId }).then((res) => {
        this.workFlowInfoList = res.data.data
        let map = new Map()

        this.workFlowInfoList.forEach((item) => {
          let workDateObj = parseTime(item.workDate, "{y}-{m}-{d}")
          map.set(workDateObj, new Array)
          this.workFlowInfoObj[workDateObj] = item
        })

        this.workFlowInfoList.forEach((item) => {
          let workDateObj = parseTime(item.workDate, "{y}-{m}-{d}")
          map.get(workDateObj).push(item);
        })
        this.map = map
      })
    }
  },
};
</script>

<style scoped lang="scss">
.calendarContainer {
  width: 100%;
  height: 100%;
}
</style>
