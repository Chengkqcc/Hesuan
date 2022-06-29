<template>
    <view class="body">
        <view class="content">
         <view class="title_ts">
         	<image src='@/static/report-home/icon_zhuyi.png' />
         	<p style="font-size: 34rpx;font-weight: 700;">温馨提示：</p>
         </view>
         <p>群众申请办理电子网格证后，进出东兴请进行报备，报备信息登记后，48小时内有效，超期需重新提交。为保障行程顺畅，请广大群众根据出行计划，尽量提前1-2天报备，填写真实个人防疫信息。</p>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.body {
  width: 667rpx;
  // height: 138rpx;
  background: #fff;
  margin: 42rpx auto;
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  .title_ts {
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	padding: 20rpx 0;
  }
  image {
      width: 67rpx;
      height: 67rpx;
      margin-right: 30rpx;
  }
  view {
      flex: 1;
      font-size: 28rpx;
  }
  .content{
	  color: red;
  }
}
</style>