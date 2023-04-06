<template>
  <div class="warpper">
    <div class="login-container">
      <div class="ms-title">库存管理系统</div>
      <el-form
        :model="form"
        class="form"
        :rules="{
          account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          passward: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }"
      >
        <el-form-item prop="account" class="form-item">
          <el-input v-model="form.account" class="item-input">
            <template slot="prepend"><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passward" class="form-item">
          <el-input v-model="form.passward" class="item-input">
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" round @click="login" class="login-button"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      form: {},
    };
  },
  methods: {
    login: async function () {
      let res = await this.$store.dispatch("user/login", this.form);
      if (res.data.status == 200) {
        this.$message.success(res.data.msg);
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>



<style lang="less" scoped>
.warpper {
  background-image: url("@/assets/img/login-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    border-radius: 5px;
    width: 350px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    .ms-title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      border-bottom: 1px solid #ddd;
    }
    .form {
      overflow: hidden;
      padding: 20px;
      .form-item {
        margin: 20px 0;
      }
      .login-button {
        width: 100%;
      }
    }
  }
}
</style>
<style>
</style>


