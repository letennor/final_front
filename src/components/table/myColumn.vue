<template>
  <el-table-column :prop="item.value"
                   :label="item.text"
                   align="center">
    <template v-if="item.children">
      <my-column v-for="(child, index) in item.children"
                 :key="index"
                 :item="child"></my-column>
    </template>

    <template slot-scope="scope">
      <span v-html="formatter(scope.row[item.value],item.formatter,scope.row,item.filter,item.filterParams)"
            v-if="!item.type" v-bind:style="item.style?item.style:''"
            v-bind:class="item.classFun?item.classFun(scope.row):''"
            @click="item.click?item.click(scope.row,$event):false"></span>
      <img v-bind:src="item.getSrc(scope.row)" :height="item.imgHeight" v-if="item.type === 'img'" />
      <div v-if="item.type === 'button'">
        <el-button
          v-button-privilege="key.privilege"
          size="mini"
          @click="key.click(scope,$event)"
          v-for="(key, num) in item.list(scope.row)"
          :key="num"
          :type="key.type">
          {{ key.value }}
        </el-button>
      </div>
      <div v-if="item.type === 'iconButton'">
        <span v-if="item.value" style="margin-right:5px">{{ scope.row[item.value] }}</span>
        <span v-for="(key, num) in item.list(scope.row)" :key="num">
          <el-tooltip :content="key.value" placement="top" v-button-privilege="key.privilege">
            <i style="font-size: 25px; padding-right: 5px;" class="icon iconfont projectColor pointer"
               :class="key.class" @click="key.click(scope,$event)"></i>
          </el-tooltip>
          <span class="projectColor" style="position: absolute;margin-left: -4px;font-weight: 700;"
                v-if="num < item.list(scope.row).length-1">|</span>
        </span>
      </div>
      <div v-if="item.type === 'switch'">
        <el-switch v-model="scope.row[item.model]" @change="item.change(scope,scope.row[item.model])"
                   :active-value="item.activeValue" :inactive-value="item.inactiveValue"
                   :active-text="item.activeText"
                   :inactive-text="item.inactiveText">
        </el-switch>
      </div>
    </template>
  </el-table-column>
</template>

<script>
  import buttonPrivilege from '@/directive/buttonPrivilege'

  export default {
    name: 'MyColumn',
    directives: {
      buttonPrivilege
    },
    props: {
      item: {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
      formatter(value, formatter, row, filter, filterParams) {
        if (!formatter) {
          if (filter) {
            if (filterParams) {
              const tempArr = [value, ...filterParams]
              return filter(...tempArr)
            } else {
              return filter(value)
            }
          }
          return value
        } else {
          return formatter(row)
        }
      }
    }
  }
</script>
<style scoped>
</style>

