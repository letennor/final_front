<template>
  <div class="dashboard-container">
    <my-card title="首页">
      <Calendar />
    </my-card>
    <div>
    </div>
  </div>
</template>

<script>
  import MyCard from '@/components/MyCard'
  import { mapGetters } from 'vuex'
  import Calendar from '@/components/Calendar/index.vue'
  export default {
    name: 'Dashboard',
    components: {
      Calendar,
      MyCard
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    created() {

    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .dashboard-container {
    padding: 30px 30px 10px 30px;
  }
</style>
