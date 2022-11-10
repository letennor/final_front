<template>
  <div class="app-wrapper"
      :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"
             v-show="!hideLayout||(hideLayout && !isFull)"></sidebar>
    <navbar v-show="!hideLayout||(hideLayout && !isFull)">
    </navbar>
    <div class="main-container"
         style="  background: #f2f2f2;min-height: calc(100% - 50px)"
         :class="hideLayout && isFull ? 'active' : ''">
      <tags-view v-show="!hideLayout||(hideLayout && !isFull)"></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain, TagsView } from './components'
  import { mapGetters } from 'vuex'

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
        thirdParty: {}
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
    background: linear-gradient(0deg, #4078f2 0%, #4178f2 100%);
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
    background: linear-gradient(0deg, rgba(22, 163, 255, 1) 0%, rgba(18, 117, 252, 1) 100%) !important;
  }

  .topButtonDiv {
    float: right;

    .el-button {
      width: 100px;
      font-size: 14px;
      margin: 3px 20px 3px 3px;
      background: linear-gradient(0deg, #38ACFD 0%, #1CA3FC 100%);
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
