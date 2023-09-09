<template>
  <div class="container">
    <!-- <div class="warpper-right"></div> -->
    <div class="warpper-left">
      <div class="info-row">
        <div class="grid-content">
          <div class="left">
            <i class="el-icon-goods"></i>
          </div>
          <div class="right">
            <div class="amount">
              <span>{{ materialTotalStock }}</span>
            </div>
            <div class="title">材料库存</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left">
            <i class="el-icon-goods"></i>
          </div>
          <div class="right">
            <div class="amount">
              <span>{{ productTotalStock }}</span>
            </div>
            <div class="title">成品库存</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left" style="background-color: #64d572">
            <i class="el-icon-sold-out"></i>
          </div>
          <div class="right">
            <div class="amount" style="color: #64d572">
              <span>{{ materialTotalInorder }}</span>
            </div>
            <div class="title">材料入库记录</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left" style="background-color: #f25e43">
            <i class="el-icon-sold-out"></i>
          </div>
          <div class="right">
            <div class="amount" style="color: #f25e43">
              <span>{{ materialTotalOutorder }}</span>
            </div>
            <div class="title">材料出库记录</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left" style="background-color: #64d572">
            <i class="el-icon-sold-out"></i>
          </div>
          <div class="right">
            <div class="amount" style="color: #64d572">
              <span>{{ productTotalInorder }}</span>
            </div>
            <div class="title">成品入库记录</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left" style="background-color: #f25e43">
            <i class="el-icon-sold-out"></i>
          </div>
          <div class="right">
            <div class="amount" style="color: #f25e43">
              <span>{{ productTotalOutorder }}</span>
            </div>
            <div class="title">成品出库记录</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left" style="background-color: #e6a23c">
            <i class="el-icon-user"></i>
          </div>
          <div class="right">
            <div class="amount" style="color: #e6a23c">
              <span>{{ totalClient }}</span>
            </div>
            <div class="title">总客户</div>
          </div>
        </div>
      </div>
      <Sales />
      <Store :type="1" />
      <Store :type="2" />
    </div>
  </div>
</template>

<script>
import { formatAmount } from "@/utils";
import { mapState } from "vuex";
import Store from "./Store";
import Order from "./Order";
import Sales from "./Sales";

export default {
  components: { Store, Order, Sales },
  data() {
    return {
      dataVisual: {},
    };
  },

  computed: {
    ...mapState("dataVisual", {
      materialTotalStock: (state) =>
        formatAmount(state.commonInfo.material_total_stocks),
      productTotalStock: (state) =>
        formatAmount(state.commonInfo.product_total_stocks),

      materialTotalInorder: (state) =>
        formatAmount(state.commonInfo.material_total_inOrder),
      productTotalInorder: (state) =>
        formatAmount(state.commonInfo.product_total_inOrder),

      materialTotalOutorder: (state) =>
        formatAmount(state.commonInfo.material_total_outOrder),
      productTotalOutorder: (state) =>
        formatAmount(state.commonInfo.product_total_outOrder),

      totalClient: (state) => formatAmount(state.commonInfo.total_client),
    }),
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .warpper-right {
    width: 30%;
  }
  .warpper-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .grid-content {
        width: 12%;
        display: flex;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        background-color: #ffffff;
        overflow: hidden;
        color: #303133;
        .left {
          width: 35%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2d8cf0;
          font-size: 24px;
          color: white;
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
          padding: 12px;
          box-sizing: border-box;
          font-size: 14px;
          .amount {
            color: #2d8cf0;
            font-size: 24px;
            margin-bottom: 10px;
          }
        }
      }
    }

    .box-card {
      margin-bottom: 10px;
    }

    .wp {
      display: flex;
      justify-content: space-between;
      .box-card {
        width: 49%;
      }
    }
  }
}
</style>