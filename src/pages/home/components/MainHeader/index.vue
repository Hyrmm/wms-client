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
        @close="handleClose(tag)"
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
    ...mapMutations("cache", ["updata_curView"]),
    tabClick(tabData) {
      this.updata_curView({ title: tabData.title });
      //切换路由
      this.$router.push({ name: tabData.routeName });
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