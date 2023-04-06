<template>
  <div>
    <Breadcrumb />
    <div>
      <el-tag
        :key="index"
        v-for="(tag, index) in toolBarData"
        class="tabs"
        closable
        :effect="tag.isSelect ? 'dark' : 'plain'"
        :disable-transitions="false"
        @click="tabClick(tag)"
        @close="handleClose({ index, tag })"
      >
        {{ tag.title }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Breadcrumb },
  computed: {
    ...mapState("cache", ["toolBarData"]),
  },
  methods: {
    ...mapMutations("cache", ["updata_curView", "del_cacheView"]),
    tabClick(tabData) {
      this.updata_curView({ title: tabData.title });
      //切换路由
      this.$router.push({ name: tabData.routeName });
    },
    handleClose(tagData) {
      // 清除缓存 若不不是第一个tab，指向当前的上一个 且判断被选中的状态
      if (tagData.tag.isSelect) {
        if (tagData.index != 0) {
          this.updata_curView({
            title: this.toolBarData[tagData.index - 1].title,
          });
          this.$router.push({
            name: this.toolBarData[tagData.index - 1].routeName,
          });
        } else {
          this.$router.push({ name: "index" });
        }
      }
      this.del_cacheView(tagData);
    },
  },
};
</script>

<style scoped>
.tabs {
  margin-right: 10px;
}
.tabs:hover {
  cursor: pointer;
}
</style>