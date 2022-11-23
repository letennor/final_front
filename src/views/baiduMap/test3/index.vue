<template>
  <div>
    <el-button type="primary" @click="getPos">IP定位</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Test3",
  data() {
    return {};
  },
  methods: {
    getPos() {
      axios
        .get(
          " https://api.map.baidu.com/location/ip?ak=q0bcAjAQGNEVsPKB4jN0rQv2vljPoCta",
          {
            dataType: "JSONP",
          }
        )
        .then((res) => {
          console.log("定位信息:", res);
        });
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>