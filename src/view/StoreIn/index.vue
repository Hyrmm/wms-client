<template>
  <keep-alive :include="cacheView">
    <router-view :key="$route.name"></router-view>
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
    console.log(this.$router);
  },
};
</script>
<style>
</style>