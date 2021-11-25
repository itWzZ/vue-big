<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <bread first="个人中心" second="重置密码"></bread>
      </div>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input v-model="ruleForm.old_pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input
            type="password"
            v-model="ruleForm.new_pwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="re_pwd">
          <el-input
            type="password"
            v-model="ruleForm.re_pwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">修改密码</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { upDatePwdApi } from '../../api/index.js'
export default {
  name: '',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.new_pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      rules: {
        new_pwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
        re_pwd: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }]
      }
    }
  },
  created () {},
  computed: {},
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await upDatePwdApi(this.ruleForm)
          if (res.data.code !== 0) {
            return this.$message.error('更新用户密码失败')
          }
          this.$router.push('/login')
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
