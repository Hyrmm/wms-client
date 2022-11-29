<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu"
    background-color="#324157"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"

  >
    <el-menu-item index="/home/index">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/home/store">
      <i class="el-icon-box"></i>
      <span slot="title">库存</span>
    </el-menu-item>
    <el-submenu index="/home/storeIn">
      <template slot="title">
        <i class="el-icon-sell"></i>
        <span>入库</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/home/storeIn/add">添加入库</el-menu-item>
        <el-menu-item index="/home/storeIn/recording">入库记录</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/home/storeOut">
      <template slot="title">
        <i class="el-icon-sold-out"></i>
        <span>出库</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/home/storeOut/add">添加出库</el-menu-item>
        <el-menu-item index="/home/storeOut/recording">出库记录</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/home/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {},
  mounted(){
    console.log(this.$attrs)
  }
};
</script>

<style>
.el-menu {
  /* border: 0; */
  width: 100%;
}
</style>