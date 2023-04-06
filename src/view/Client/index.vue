<template>
  <keep-alive :include="cacheView">
    <router-view :key="$route.path"></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: "client",
};
</script>

<style>
</style>