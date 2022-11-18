<template>
  <el-container class="warper">
    <el-header class="header" height="70px">
      <div class="collapse-btn"><i class="el-icon-s-unfold"></i></div>
      <div class="logo">库存后台管理系统</div>
      <div class="header-user-con">
        <el-avatar size="30" class="user-avatar"> user </el-avatar>
        <el-dropdown class="user-name">
          <span class="el-dropdown-link">
            Admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside
        style="background-color: #324157; overflow: hidden"
        width="250px"
      >
        <Sidebar class="sidebar-container" />
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader />
        </el-header>
        <el-main>
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.warper {
  height: 100vh;
}
</style>



<script>
import { Sidebar, AppMain, MainHeader } from "./components";
export default {
  components: { Sidebar, AppMain, MainHeader },

  updated() {
    console.log(1);
  },
};
</script>

<style lang="less" scoped>
.header {
  background-color: #242f42;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }
  .collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 21px;
    cursor: pointer;
  }
  .header-user-con {
    float: right;
    padding-right: 20px;
    display: flex;
    height: 70px;
    align-items: center;
    .user-avatar {
      margin-left: 30px;
    }
    .user-name {
      margin-left: 15px;
      .el-dropdown-link {
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>