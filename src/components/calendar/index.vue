<template>
  <div class="calendarContainer">
    <el-calendar v-model="value">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p style="text-align:center;">
          {{ date | parseTime("{d}") }}
        </p>
      </template>
    </el-calendar>

  </div>
</template>

  <script>
  import { parseTime } from '@/utils'
  export default {
    name: 'Calendar',
    components: {
      
    },
    props: {
    },
    data() {
      return {
        loading: true,
        obj: {},
        value: new Date(),
        listQuery: {
            currPage: 1,
            pageSize: 1000,
            params: {}
        },
        detail: {}
      }
    },
    mounted() {
      
    },
    beforeDestroy() {
    },
    methods: {
      currentChange(val) {
        console.log('查找下一页:')
      },
    }
  }
  </script>

  <style scoped lang="scss">
  .calendarContainer{
    width: 100%;
    height: 100%;
  }
  </style>
