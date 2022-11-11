<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect===('noredirect'||index==levelList.length-1) && item.meta.title" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="(item.redirect||item.path) && item.meta.title">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import { generateTitle } from '@/utils/i18n'

  export default {
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      generateTitle,
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'dashboard') {
          matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
        }
        this.levelList = matched
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    margin-left: 20px;
    margin-top: -10px;
    width: 100%;

    .no-redirect {
      color: #409EFF;
      cursor: text;
    }
  }
</style>
