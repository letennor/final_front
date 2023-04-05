<template>
  <div class="app-wrapper" :class="{ hideSidebar: !sidebar.opened }">
    <sidebar class="sidebar-container" v-show="!hideLayout || (hideLayout && !isFull)"></sidebar>
    <navbar v-show="!hideLayout || (hideLayout && !isFull)">
    </navbar>
    <div class="main-container" style="  background: #f2f2f2;min-height: calc(100% - 50px)"
      :class="hideLayout && isFull ? 'active' : ''">
      <tags-view v-show="!hideLayout || (hideLayout && !isFull)"></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { mapGetters } from 'vuex'
import { getPersonAllWorkFlow } from "@/api/workArrangement"
import { parseTime } from "@/utils";

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  data() {
    return {
      projectType: this.$storage.getStorage('projectType'),
      thirdParty: {},
      workFlowInfoList: [],
      workFlowInfoObj: {},
      map: new Map()
    }
  },
  computed: {
    ...mapGetters([
      'hideLayout',
      'isFull',
      'bigSize',
      'isProject'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  mounted() {

    this.getWorkInfoList()
    const me = this
    document.getElementsByClassName('app-main')[0].style.height = document.getElementById('app').clientHeight - 110 + 'px'
    window.onresize = function windowResize() {
      if (me.hideLayout && me.isFull) {
        document.getElementsByClassName('app-main')[0].style.height = document.getElementById('app').clientHeight + 'px'
      } else {
        document.getElementsByClassName('app-main')[0].style.height = document.getElementById('app').clientHeight - 110 + 'px'
      }
    }
  },
  methods: {

    getWorkInfoList() {
      getPersonAllWorkFlow({ workPerson: this.$store.state.user.userId }).then((res) => {
        this.workFlowInfoList = res.data.data
        let map = new Map()

        this.workFlowInfoList.forEach((item) => {
          let workDateObj = parseTime(item.workDate, "{y}-{m}-{d}")
          map.set(workDateObj, new Array)
          this.workFlowInfoObj[workDateObj] = item
        })

        this.workFlowInfoList.forEach((item) => {
          let workDateObj = parseTime(item.workDate, "{y}-{m}-{d}")
          map.get(workDateObj).push(item);
        })
        this.map = map
        console.log("this.map:", this.map)
        console.log('workFlowInfoObj:', this.workFlowInfoObj)
        console.log('workFlowInfoList', this.workFlowInfoList)
        this.notify()
      })
    },
    notify() {
      let day = parseTime(new Date(), "{y}-{m}-{d}")
      let currentWork = this.map.get(day)

      // let currentWorkName = ''

      // currentWork.forEach((item) => {
      //   currentWorkName.concat(currentWork, item.workName, "  ")
      // })
      // let text = document.createTextNode('{{currentWorkName}}')
      console.log("今日工作:", currentWork)
      if (this.map.get(day)) {
        console.log("要展示")
      } else {
        console.log("不要展示")
      }

      const h = this.$createElement;

      this.$notify({
        title: '今日有工作要做',
        message: h('i', { style: 'color: teal' })
      });
    },
    turnTo(type) {
      if (type === 'supervisor') {
        this.toSupervisionSys()
      } else {
        this.$storage.setStorage('projectType', type)
        location.reload()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  /*position: relative;*/
  height: 100%;
  // background: #245fab;
  background: #2c68ff;
  width: 100%;

  .active {
    margin-left: 0px !important;
  }
}

.breadcrumb-container {
  width: 100%;
  background: #fff;
  margin-bottom: 20px;
  float: left;
  margin-left: 0px !important;
  padding-left: 30px;
}

.buttonActive {
  background: #2c68ff;
}

.topButtonDiv {
  float: right;

  .el-button {
    width: 100px;
    font-size: 14px;
    margin: 3px 20px 3px 3px;
    background: #2c68ff;
    color: #fff;

    span {
      margin-left: 10px;

      .icon {
        font-size: 25px;
        margin-top: -5px;
        position: absolute;
        margin-left: -25px;
      }
    }
  }
}
</style>
