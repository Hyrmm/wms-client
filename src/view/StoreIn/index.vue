<template>
  <keep-alive :include="cacheView">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "storeIn",
  computed: {
    ...mapState("cache", ["cacheView"]),
  },
};
</script>
<style>
</style>