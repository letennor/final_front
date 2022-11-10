<template>
  <section class="app-main loading-area"
           style="min-height: 100%">
    <transition name="fade"
                mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
      
    }
  }
</script>
<style>
  .app-main {
    overflow: auto;
  }
</style>
