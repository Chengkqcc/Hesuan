<template>
  <view class="body">
    <u-checkbox-group v-model="checkboxValue">
      <u-checkbox :customStyle="{ marginBottom: '16rpx' }" name="checked" />
    </u-checkbox-group>
    <view
      @click="
        checkboxValue = [checkboxValue[0] === 'checked' ? undefined : 'checked']
      "
    >
      我已阅读并同意<text @click.stop="show=true">个人承诺书</text>
    </view>

    <u-popup
      :show="show"
      mode="center"
      round="10px"
      closeable
      :safeAreaInsetBottom="false"
      customStyle="width: 625rpx"
      closeIconPos="top-right"
      @close="show = false"
    >
      <view class="message">
        <view class="title">承诺书</view>
        <u-line color="#EEEEEE"></u-line>
        <view class="u-content">
          本人承诺：所填信息真实准确，无隐瞒或谎报来源地、目的地、健康状况等疫情防控信息。如违反相关规定，本人将承担相应的法律责任，自愿接受有关法律法规的处罚。
        </view>
        <u-line color="#EEEEEE"></u-line>
        <button @click="show = false" class="footer-button">确认</button>
      </view>
    </u-popup>
  </view>
</template>
<script>
export default {
  components: {},
  props: {
    value: Boolean,
  },
  model: {
    prop: "value",
    event: "input",
  },
  watch: {
    checkboxValue: {
      deep: true,
      handler(val) {
        this.$emit("input", val[0] === "checked" ? true : false);
      },
    },
  },
  data() {
    return {
      checkboxValue: [],
      show: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  color: #333333;
  line-height: 98rpx;
  text-align: center;
  font-size: 33rpx;
}
.footer-button {
  width: 258rpx;
  height: 92rpx;
  line-height: 92rpx;
  background: #3a8cf0;
  border-radius: 21rpx;
  margin: 29rpx auto 38rpx;
  text-align: center;
  color: #fff;
  font-size: 31rpx;
}
.u-content {
  font-weight: 600;
  color: #333333;
  line-height: 58rpx;
  font-size: 31rpx;
  padding: 38rpx 40rpx 20rpx;
}
.body {
  padding: 0 30rpx;
  display: flex;
  font-size: 26rpx;
  font-weight: bold;
  text {
    color: #3a8cf0;
    letter-spacing: -4rpx;
    &::before {
      content: "<< ";
    }
    &::after {
      content: " >>";
    }
  }
}
</style>