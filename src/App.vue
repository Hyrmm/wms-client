<template>
  <router-view></router-view>
</template>

<script>
import { userAgent } from "@/utils";
export default {
  mounted() {
    this.$store.dispatch("user/getUserInfo");
    if (userAgent.versions.mobile) {
      this.$router.replace({ name: "agentFail" });
    }
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
