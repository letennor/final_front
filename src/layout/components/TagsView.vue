<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <router-link ref="tag" class="tags-view-item" :class="isActive(tag)?'active':''"
                   v-for="tag in Array.from(visitedViews)"
                   :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span class="el-icon-close listtleDot" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </scroll-pane>
    <ul class="contextmenu" v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
  import ScrollPane from '@/components/ScrollPane'
  import { generateTitle } from '@/utils/i18n'
  import { mapGetters } from 'vuex'

  export default {
    components: { ScrollPane },
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      ...mapGetters([
        'isProject'
      ]),
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      }
    },
    watch: {
      $route() {
        this.addViewTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      generateTitle, // generateTitle by vue-i18n
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      addViewTags() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addVisitedViews', route)
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag)
              // when query is different then update
              if (tag.to.fullPath !== this.$route.fullPath) {
                this.$store.dispatch('tagsView/updateVisitedView', this.$route)
              }
              break
            }
          }
        })
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag.path)
        this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews')
        this.$router.push('/')
      },
      openMenu(tag, e) {
        this.visible = true
        this.selectedTag = tag
        this.left = e.clientX
        this.top = e.clientY
      },
      closeMenu() {
        this.visible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


  .tags-view-container {
    background: #fff;
    height: 40px;


    .tags-view-wrapper {
      background: #fff;
      /*height: 34px;*/
      // border-bottom: 1px solid #d8dce5;
      // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

      .tags-view-item {
        display: inline-block;
        position: relative;
        height: 30px;
        line-height: 26px;
        
        /*border: 1px solid #d8dce5;*/
        color: #7488C9;
        background: #f2f2f2;
        padding: 0 8px;
        font-size: 18px;
        margin-left: 10px;
        margin-top: 4px;
        border-radius: 6px;

        &:first-of-type {
          margin-left: 30px;
        }

        &.active {
          background-color: #2c68ff;
          color: #fff;
          border-color: #2c68ff;
          height: 30px;
          line-height: 30px;

          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 2;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
          background: #eee;
          
        }
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        

        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;}
      }
    }
  }
</style>
