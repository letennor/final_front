<template>
  <div class="chooseAuthDiv">
    <el-tree
      :data="formatData"
      show-checkbox
      ref="tree"
      node-key="privilegeId"
      :default-expand-all="true"
      :default-checked-keys="orgPrivilges"
      :props="defaultProps"
      @check="handleCheckChange"
    >
    </el-tree>
  </div>
</template>
  
  <script>
export default {
  name: "ChooseAuth",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    orgPrivilges: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "privilegeName",
      },
    };
  },
  computed: {
    formatData() {
      //只把根节点拿出来
      let tmp = [];
      if (this.data.length > 0) {
        //若children不为0，则push
        this.data.forEach((element) => {
          if (element.children.length !== 0) {
            tmp.push(element);
          }
        });
      } else {
        tmp = this.data;
      }
      return tmp;
    },
  },
  watch: {
    orgPrivilges: function (val) {
      this.$refs.tree.setCheckedKeys(val);
      this.$store.dispatch("setCheckAuth", val);
    },
  },
  mounted() {},
  methods: {

    handleCheckChange() {
      // 传入store
      this.$store.dispatch(
        "setCheckAuth",
        [].concat(
          this.$refs.tree.getCheckedKeys(),
          this.$refs.tree.getHalfCheckedKeys()
        )
      );
      console.log("state:", this.$store.state);
    },
  },
};
</script>
  
  <style rel="stylesheet/scss" lang="scss">
</style>
  