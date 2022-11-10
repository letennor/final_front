<template>
  <div class="calendarContainer">
    <div v-if="loading">加载中...</div>
    <el-calendar v-model="value" v-if="!loading">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p style="text-align:center;">
          {{ date | parseTime("{d}") }}
        </p>
        <div v-if="obj[data.day]" style="text-align:center;">
          <span style="font-weight:bold;color:#2c68ff;cursor:pointer;" v-for="items in obj[data.day]" :key="items.id" @click="ShowBidProjectDetails(items.id)">
            {{ items.name }}
          </span>
        </div>
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
        this.getList()
    },
    beforeDestroy() {
    },
    methods: {
    currentChange(val) {
      console.log('查找下一页:')
    },

    ShowBidProjectDetails(val) {
        console.log('点击了投标项目：', val)
        // 调用投标项目的接口，找到那一条投标项目
        getOneBidProject({ id: val }).then((res) => {
          console.log('单条查询的结果：', res)
          this.detail = res.result
          this.$refs.BidProjectInfoDialog.dialogFormDetailsVisible = true
        })
    },
    // 获取列表
    getList() {
        this.loading = true
      // 获取列表的接口调用
      getBidProject(this.listQuery).then((res) => {
        res.result.list.map((item) => {
            if (item.bidDocumentReturnDto.bidDate !== undefined) {
                const originalDate = parseTime(item.bidDocumentReturnDto.bidDate, '{y}-{m}-{d}')
                this.obj[originalDate] = res.result.list.filter((item) => parseTime(item.bidDocumentReturnDto.bidDate, '{y}-{m}-{d}') === originalDate)
            }
        })
        this.loading = false
      })
      console.log(this.obj)
    }
    }
  }
  </script>

  <style scoped lang="scss">
  .calendarContainer{
    width: 100%;
    height: 100%;
  }
  </style>
