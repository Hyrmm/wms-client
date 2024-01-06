<template>
  <keep-alive :include="cacheView">
    <router-view :key="$route.path"></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: "client",

  computed: {
    ...mapState("cache", ["cacheView"]),
  },
};
</script>

<style></style>