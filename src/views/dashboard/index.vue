<template>
  <div class="dashboard-container">
    <my-card title="首页">
      <Calendar ref="Calendar" />
    </my-card>


    <my-card title="代办" style="margin-top: 20px">
      <el-card shadow="always" v-for="item in undoneWorkList" :key="item.workflowId"
        style="margin-top: 10px; font-size: 15px;">
        <el-col :span="6"><span>工作负责人：</span>{{ $store.state.user.name }}</el-col>
        <el-col :span="6"><span>工作时间：</span>{{ item.workDate | parseTime() }}</el-col>
        <el-col :span="8"><span>工作内容：</span>{{ item.workName }}</el-col>
        <el-col :span="4" style="margin-bottom: 10px;"><el-button type="success" @click="myFinishWork(item)"
            :disabled="item.forbid">完成</el-button></el-col>
      </el-card>
    </my-card>
  </div>
</template>

<script>
import MyCard from '@/components/MyCard'
import { mapGetters } from 'vuex'
import Calendar from '@/components/Calendar/index.vue'
import { removeToken } from '@/utils/auth'
import { getPersonUndoneWork, finishWork } from "@/api/workArrangement"
import { parseTime } from '@/utils'
export default {
  name: 'Dashboard',
  components: {
    Calendar,
    MyCard
  },
  data() {
    return {
      undoneWorkList: []
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
    this.checkState()
    this.getUndoneWorkList()
  },
  methods: {
    checkState() {
      console.log("state", this.$store.state)
      if (this.$store.state.user.status === 0) {
        confirm("抱歉，该账户已被禁用")
        this.$store.dispatch('LogOut').then(() => {
          removeToken()
          this.$storage.setStorage('isLose', 1)
          this.$storage.removeStorage('project')
          location.reload()
        })
      }
    },

    getUndoneWorkList() {
      console.log("user:", this.$store.state.user)
      getPersonUndoneWork({ workPerson: this.$store.state.user.userId }).then((res) => {
        this.undoneWorkList = res.data.data
        this.undoneWorkList.sort((a, b) => a.workDate - b.workDate)
        //获得当前的时间戳
        const nowDate = new Date().getTime();

        //对于workDate大于nowDate的，设置一个forbid = true
        this.undoneWorkList.forEach((item) => {
          if (item.workDate > nowDate) {
            item.forbid = true
          } else {
            item.forbid = false
          }
        })

      })
    },

    myFinishWork(workFlow) {
      finishWork(workFlow).then((res) => {
        console.log('res:', res)
        this.$message(res.data.data)
        this.getUndoneWorkList()
        this.$refs.Calendar.getWorkInfoList()
      })

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  padding: 30px 30px 10px 30px;
}
</style>
