<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ first }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ second }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread',
  props: {
    first: {
      type: String,
      default: '个人中心',
      require: true
    },
    second: {
      type: String,
      default: '基本资料',
      require: true
    }
  },
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {}
}
</script>

<style lang='less' scoped>
</style>
