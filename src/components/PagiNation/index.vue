<template>
  <div class="warpper">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      :page-size="20"
      :page-sizes="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>