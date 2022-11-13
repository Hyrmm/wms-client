<template>
  <transition name="el-zoom-in-center" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
    name:"index"
};
</script>

<style>
</style>