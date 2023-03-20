<template>
  <div class="calendarContainer">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <p style="text-align: center">
          {{ date | parseTime("{d}") }}
        </p>
      </template>
    </el-calendar>

    <el-button @click="getUserInfo">取得信息</el-button>
  </div>
</template>

  <script>
import { parseTime } from "@/utils";
import { testGenerateToken, getUserInfo } from "@/api/login";
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
    };
  },
  mounted() {
    console.log("进入首页");
    this.getToken();
  },
  beforeDestroy() {},
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
  },
};
</script>

  <style scoped lang="scss">
.calendarContainer {
  width: 100%;
  height: 100%;
}
</style>
