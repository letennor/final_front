<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :collapse-transition="false"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      text-color="#fff"
      active-text-color="#fff"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  mounted() {
    console.info(this.permission_routers);
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
      this.$store.dispatch("setChangeSidebar", !this.sidebar.opened);
    },
  },
};
</script>
<style>
.el-menu {
  background: rgba(0, 0, 0, 0);
}

.menuBottomDiv {
  /*background: url("../../../../assets/dashboard/bottom.png");*/
  /*background-repeat: round;*/
  /*background-size: 100%;*/
}
</style>
