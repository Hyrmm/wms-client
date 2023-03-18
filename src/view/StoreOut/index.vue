<template>
  <keep-alive :include="cacheView">
    <router-view :key="$route.path"></router-view>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "storeOut",
  computed: {
    ...mapState("cache", ["cacheView"]),
  },
};
</script>

<style>
</style>