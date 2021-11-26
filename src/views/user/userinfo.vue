<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <bread first="个人中心" second="基本资料"></bread>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="登录名称" prop="username">
          <el-input disabled v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { upDateInfoApi } from '../../api/index.js'
export default {
  name: '',
  data () {
    return {
      ruleForm: {
        nickname: '',
        email: '',
        username: ''
      },
      rules: {
        username: [{ message: '请输入用户名', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.ruleForm = JSON.parse(JSON.stringify(this.$store.state.userInfo))
  },
  computed: {},
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await upDateInfoApi(this.ruleForm)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '成功'
            })
            this.$store.dispatch('userInfoHandle')
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
<style lang='less'  scoped>
.el-form {
  width: 500px;
  margin-top: 20px;
}
</style>
