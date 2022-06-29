<template>
	<view class="jyxc">
        <view class="option">
            <view class="option-grid" @click="topage(4)">
                <!-- 222 -->
                <image src="https://qiniu.xzlglobal.com/hs/mp/sqmy_bg1@2x.png" style="width: 100%;height: 210rpx;"></image>
                <!-- <u--image :src="imMsg.icon" style="width: 100%;" height="110" mode="widthFix"></u--image> -->
            </view>
            <view class="option-grid" @click="topage(0)">
                <!-- 222 -->
                <image src="https://qiniu.xzlglobal.com/hs/mp/sqmy_bg2@2x.png" style="width: 100%;height: 210rpx;"></image>
                <!-- <u--image :src="imMsg.icon" style="width: 100%;" height="110" mode="widthFix"></u--image> -->
            </view>
            <view class="option-grid" @click="topage(1)">
                <!-- 222 -->
                <image src="https://qiniu.xzlglobal.com/hs/mp/sqmy_bg3@2x.png" style="width: 100%;height: 210rpx;"></image>
                <!-- <u--image :src="imMsg.icon" style="width: 100%;" height="110" mode="widthFix"></u--image> -->
            </view>
<!--        <view class="option-grid" @click="topage(2)">
                <image src="https://qiniu.xzlglobal.com/hs/mp/sqmy_bg4@2x.png" style="width: 100%;height: 210rpx;"></image>
            </view>
			<view class="option-grid" @click="topage(3)">
			    <image src="https://qiniu.xzlglobal.com/hs/mp/sqmy_bg5@2x.png" style="width: 100%;height: 210rpx;"></image>
			</view> 
-->
        </view>
        
    </view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
        methods:{
            //跳转
            topage(val){
				if(val == 0){
					uni.navigateTo({
					     url: './feedback'
					});
				}else if(val == 1){
					uni.navigateTo({
					     url: './feedbackjy'
					});
				}else if(val == 2){
					uni.navigateTo({
					     url: './feedbackjyJyfc'
					});
				}else if(val == 3){
					uni.navigateTo({
					     url: './feedbackjytc'
					});
				}else{
					uni.showToast({
						title:'开发中',
						icon:'none'
					})
				}
                
            }
        }
	}
</script>

<style lang="scss" scoped>
page {
		background: #f1f4f7;
	}
.jyxc{
    width: 100%;
	overflow: hidden;
    .option{
        padding: 40rpx 40rpx 0 40rpx;
		// width: 100%;
        .option-grid {
            border-radius: 8px;
			margin-bottom: 40rpx;
			padding: 0;
			// background-color: #3E76F1;
			// background: #ffffff;
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
