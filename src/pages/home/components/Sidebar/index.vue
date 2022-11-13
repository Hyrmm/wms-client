<template>
  <el-menu
    default-active="/home/index"
    class="el-menu"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="/home/index">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/home/store">
      <i class="el-icon-menu"></i>
      <span slot="title">库存</span>
    </el-menu-item>

    <el-menu-item index="/home/storeIn">
      <i class="el-icon-menu"></i>
      <span slot="title">出库</span>
    </el-menu-item>

    <el-menu-item index="/home/storeOut">
      <i class="el-icon-document"></i>
      <span slot="title">入库</span>
    </el-menu-item>

    <el-menu-item index="/home/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    handleOpen: function () {
      this.$message("擦破");
    },
  },
};
</script>

<style>
.el-menu {
  /* border: 0; */
  width: 100%;
}
</style>