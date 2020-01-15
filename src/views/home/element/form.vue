<template>
  <div class="form" style="padding:40px 30%;">

    <el-form :model="form" ref="formRef" label-width="100px">

      <!-- 请勿直接在label中添加“：”，可使用<el-form>标签中的label-suffix属性进行添加 -->
      <el-form-item label="名称" prop="name" :verify="['NotNull', 'Length>3','Length<8']">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="年龄" prop="age" :verify="['NotNull', 'Number']">
        <el-input v-model="form.age"></el-input>
      </el-form-item>

      <el-form-item label="电子邮箱" prop="email" :verify="['NotNull', 'Email']">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="生日" prop="sr" :verify="['NotNull', 'DateTime=yyyy年MM月dd日']">
        <el-input v-model="form.sr"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone" :verify="['NotNull', 'CnPhone']">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <!-- 正则必须以“^”开头“$”结尾，“|”后为验证失败时显示的提示 -->
      <el-form-item label="备注" prop="bz" :verify="['NotNull', 'Regex=^\\w+$|只能是英文字母、数字或下划线']">
        <el-input v-model="form.bz"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          age: '',
          name: '',
          email: '',
          sr: '',
          phone: '',
          bz: ''
        }
      }
    },
    methods: {
      submit() {
        this.$refs['formRef'].validate(valid => {
          if (!valid) {
            this.$message.error('没有正确填写表单项')
          }
        })
      },
    }
  }
</script>

<style>

</style>
