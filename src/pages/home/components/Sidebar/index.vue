<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-11-12 15:37:55
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-10 14:08:55
 * @FilePath: \wms-client\src\pages\home\components\Sidebar\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
        <el-menu-item index="/home/storeOut/modify">变更状态</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/home/client">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">客户</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/home/client/add">添加客户</el-menu-item>
        <el-menu-item index="/home/client/modify">修改客户</el-menu-item>
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
  mounted() {
  },
};
</script>

<style>
.el-menu {
  /* border: 0; */
  width: 100%;
}
</style>