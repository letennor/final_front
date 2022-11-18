<template>
  <div>
    <baidu-map class="map" center="北京" :zoom="10" :scroll-wheel-zoom="true">
      <!-- 比例尺 -->
      <!-- <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> -->
      <!-- 缩放 -->
      <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
      <!-- 地图类型 -->
      <!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type> -->
      <!-- 缩略图 -->
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <!-- 定位 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!-- 城市列表 -->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <!-- 全景 -->
      <bm-panorama></bm-panorama>
    </baidu-map>
  </div>
</template>
<script>
export default {
  name: "Test1",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>