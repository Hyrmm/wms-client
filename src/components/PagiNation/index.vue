<template>
  <div class="warpper">
    <el-pagination
      v-on="$listeners"
      background
      layout="prev, pager, next"
      v-bind="$attrs"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="less" scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>