<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
        <template v-if="!item.hidden&&item.children&&item.children[0]">
            <router-link v-if="hasOneShowingChildren(item,item.children) && !item.children[0].children&&!item.alwaysShow"
                        :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
                <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
                <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon"
                            :icon-class="item.children[0].meta.icon"></svg-icon>
                <span v-if="item.children[0].meta&&item.children[0].meta.title"
                        slot="title">{{ item.children[0].meta.title }}</span>
                </el-menu-item>
            </router-link>

            <el-submenu v-else :index="item.name||item.path" :key="item.name">
                <template slot="title">
                <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                <span v-if="item.meta&&item.meta.title" slot="title">{{ item.meta.title }}</span>
                </template>

                <div v-for="(child,index) in item.children" :key="index">
                    <template v-if="!child.hidden">
                        <sidebar-item v-if="child.children&&child.children.length>0" :is-nest="true" :routes="[child]"
                                    :key="child.path" class="nest-menu"></sidebar-item>
                        <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                            <el-menu-item :index="item.path+'/'+child.path">
                            <i class="icon iconfont icondian" style="color: #B2CCFF"></i>
                            <span v-if="child.meta&&child.meta.title" slot="title">{{ child.meta.title }}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </div>
            </el-submenu>
        </template>
      
    </template>
  </div>
</template>

<script>
  import { generateTitle } from '@/utils/i18n'
  import SvgIcon from '@/components/SvgIcon'

  export default {
    name: 'SidebarItem',
    components: {
      SvgIcon
    },
    props: {
      routes: {
        type: Array,
        default: () => []
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hasOneShowingChildren(parentObj, children) {
        const showingChildren = children.filter(item => {
          return !item.hidden
        })
        if (showingChildren.length === 1 && showingChildren[0].name === parentObj.redirect) {
          return true
        }
        return false
      },
      generateTitle
    }
  }
</script>

<style scoped>
*{
  font-size: 16px;
}
</style>

