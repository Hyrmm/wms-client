<template>
  <keep-alive :include="cacheView">
    <router-view :key="$route.path"></router-view>
  </keep-alive>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "storeIn",
  computed: {
    ...mapState("cache", ["cacheView"]),
  },
  mounted() {
  },
};
</script>
<style>
</style>