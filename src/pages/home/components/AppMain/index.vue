<template>
  <transition name="el-zoom-in-center" mode="out-in">
    <keep-alive :include="cacheView">
      <router-view :key="$route.path"></router-view>
    </keep-alive>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("cache", ["cacheView"]),
  },
};
</script>

<style>
</style>