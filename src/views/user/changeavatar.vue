<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <bread first="个人中心" second="更换头像"></bread>
      </div>
      <!-- <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div> -->
      <div>
        <!-- 图片，用来展示用户选择的头像 -->
        <!-- <img :src="imgUrl" alt="" class="preview" /> -->
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
          style="cursor: pointer"
          @click="iImg"
        />
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
          style="cursor: pointer"
          @click="iImg"
        ></i>

        <!-- 按钮区域 -->
        <div class="btn-box">
          <input
            type="file"
            ref="inputHidden"
            @change="changeImg"
            style="display: none"
          />
          <el-button @click="chooseImg" type="primary" icon="el-icon-plus"
            >选择图片</el-button
          >
          <el-button
            type="success"
            icon="el-icon-upload"
            :disabled="i"
            @click="upAvatar"
            >上传头像</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { upDateAvatarApi } from '../../api'
import defaultImg from '@/assets/images/avatar.jpg'
export default {
  data () {
    return {
      imageUrl: '',
      i: 'disabled'
    }
  },
  created () {
    this.imageUrl = this.$store.state.userInfo.user_pic || defaultImg
  },
  computed: {},
  methods: {
    chooseImg () {
      this.$refs.inputHidden.click()
    },
    iImg () {
      this.$refs.inputHidden.click()
    },
    changeImg (e) {
      if (e.target.files[0].size / 1024 / 1024 > 2) {
        this.$message({
          type: 'error',
          message: '图片大小超过了2MB!'
        })
        return false
      }
      if (e.target.files.length) {
        this.i = false
      }

      // console.log(e)
      const file = e.target.files[0]
      // console.log(file)
      const fr = new FileReader()
      // console.log(fr)
      fr.readAsDataURL(file)
      fr.onload = () => {
        this.imageUrl = fr.result
      }
    },
    async upAvatar () {
      const res = await upDateAvatarApi(this.imageUrl)
      if (res.data.code === 0) {
        this.$store.dispatch('userInfoHandle')
        this.i = 'disabled'
        this.$message({
          type: 'success',
          message: res.data.message
        })
      } else {
        this.$message({
          type: 'error',
          message: res.data.message
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 350px;
  height: 350px;
  line-height: 350px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 350px;
  height: 350px;
  display: block;
  object-fit: cover;
}
.btn-box {
  margin-top: 10px;
}
</style>
