<template>
  <el-container class="warper">
    <el-header class="header" height="70px">
      <div class="collapse-btn" @click="isCollapse = !isCollapse">
        <i class="el-icon-s-unfold"></i>
      </div>
      <div class="logo">库存后台管理系统</div>
      <div class="header-user-con">
        <el-avatar class="user-avatar"> user </el-avatar>
        <el-dropdown class="user-name">
          <span class="el-dropdown-link">
            {{ nick }}<i class="el-icon-arrow-down el-icon--right"></i>
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
        style="background-color: #324157; overflow: hidden; width: 150px"
      >
        <Sidebar class="sidebar-container" />
      </el-aside>
      <el-container>
        <el-header height="100px">
          <MainHeader />
        </el-header>
        <el-main class="main">
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.warper {
  height: 100vh;
  box-sizing: border-box;
}
</style>



<script>
import { Sidebar, AppMain, MainHeader } from "./components";
import { mapState } from "vuex";
export default {
  components: { Sidebar, AppMain, MainHeader },
  data: function () {
    return {
      isCollapse: false,
    };
  },
  //初始化storeOptions,clientOptions
  mounted() {
    this.$store.dispatch("store/getMaterialStock", { type: 1 });
    this.$store.dispatch("store/getProductStock", { type: 2 });
    this.$store.dispatch("store/getStoreOptions", { types: ["1", "2"] });
    this.$store.dispatch("store/getAllMaterialStock", { type: 1 });
    this.$store.dispatch("client/getClientOptions");
    this.$store.dispatch("dataVisual/getCommonInfo");
    this.$store.dispatch("dataVisual/getStoreInfo");
    this.$store.dispatch("dataVisual/getYearFinishOrder", { year: 2022 });
    this.$store.dispatch("dataVisual/getSalesInfo", {
      year: 2022,
    });
  },
  computed: {
    ...mapState("user", {
      nick: (state) => state.userInfo.nick,
    }),
  },
};
</script>

<style lang="less" scoped>
.main {
  background-color: #f2f6fc;
}
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