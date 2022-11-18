<template>
  <div class="warpper">
    <div class="login-container">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="form" class="form">
        <el-form-item prop="nick" class="form-item">
          <el-input v-model="form.nick" class="item-input">
            <template slot="prepend"><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passward" class="form-item">
          <el-input v-model="form.passward" class="item-input">
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button></el-button>
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
    margin: -190px 0 0 -175px;
    border-radius: 5px;
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
      .form-item {
        margin: 20px 0;
      }
    }
  }
}
</style>
<style>
.el-form-item__content {
  margin: 0 auto;
}
.el-form {
  overflow: hidden;
  padding: 20px;
}
</style>


