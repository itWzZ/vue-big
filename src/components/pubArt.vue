<template>
  <div>
    <el-form :model="form" :rules="rules">
      <el-form-item label="文章标题" :label-width="formLabelWidth" prop="title">
        <el-input
          v-model="form.title"
          autocomplete="off"
          placeholder="请输入文章标题"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="文章分类"
        :label-width="formLabelWidth"
        prop="cate_id"
      >
        <el-select
          v-model="form.cate_id"
          placeholder="请选择分类"
          style="width: 100%"
        >
          <el-option
            v-for="item in cateLis"
            :key="item.id"
            :label="item.cate_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 富文本 -->
      <el-form-item
        style="height: 280px"
        :label-width="formLabelWidth"
        label="文章内容"
        prop="content"
      >
        <quill-editor style="height: 200px" v-model="form.content">
        </quill-editor>
      </el-form-item>
      <!-- 富文本 -->
      <!-- 上传封面 -->
      <el-form-item
        :label-width="formLabelWidth"
        label="上传封面"
        prop="cover_img"
      >
        <img
          :src="cover"
          alt=""
          style="width: 400px; height: 280px; object-fit: cover"
          @click="choose"
        />
        <br />
        <input
          type="file"
          @change="changeImg"
          style="display: none"
          ref="ipt"
        />
        <el-button type="text" @click="choose">+选择封面</el-button>
      </el-form-item>
      <!-- 上传封面 -->
      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" @click="pub('已发布')">发 布</el-button>
        <el-button type="info" @click="pub('草稿')">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addArticleApi } from '@/api/art.js'
export default {
  name: 'pubArt',
  props: ['cateLis'],
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '100px',
      cover: require('../assets/images/cover.jpg'),
      form: {
        title: '',
        cate_id: '',
        content: '',
        state: '',
        cover_img: null
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 30,
            message: '长度在 1 到 30 个字符',
            trigger: 'blur'
          }
        ],
        cate_id: {
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        }
      }
    }
  },
  created () {},
  computed: {},
  methods: {
    initForm () {
      this.form = {
        title: '',
        cate_id: '',
        content: '',
        state: '',
        cover_img: ''
      }
      this.cover = require('../assets/images/cover.jpg')
    },
    choose () {
      this.$refs.ipt.click()
    },
    changeImg (e) {
      const file = e.target.files[0]
      if (e.target.files.length === 0) {
        return this.$message({
          type: 'error',
          message: '请选择图片'
        })
      }
      if (file.size / 1024 / 1024 > 2) {
        return this.$message({
          type: 'error',
          message: '请选择小于2MB的图片'
        })
      }
      const img = URL.createObjectURL(file)
      this.form.cover_img = file
      this.cover = img
    },
    async pub (state) {
      this.form.state = state
      const fd = new FormData()
      fd.append('title', this.form.title)
      fd.append('cate_id', this.form.cate_id)
      fd.append('content', this.form.content)
      fd.append('state', this.form.state)
      fd.append('cover_img', this.form.cover_img)
      const res = await addArticleApi(fd)
      if (res.data.code === 0) {
        this.initForm()
        this.$message({
          type: 'success',
          message: res.data.message
        })
        this.$emit('success')
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
img {
  object-fit: cover;
  cursor: pointer;
}
</style>
