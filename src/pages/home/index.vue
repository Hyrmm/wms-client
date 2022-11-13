<template>
  <el-container class="warper">
    <el-aside style="background-color: #545c64; overflow: hidden" width="250px">
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