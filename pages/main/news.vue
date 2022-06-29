<template>
  <view class="tbcontent">
    <!-- 通知公告 -->
    <view v-if="current == 0">
		<!-- if判断 -->
		<view>
			<!-- 循环层 -->
			<view class="page-list" @click="handleDetail">
				<view class="page-img">
					<image src="https://qiniu.xzlglobal.com/hs/mp/home_bg@2x.png" style="width: 160rpx;height: 110rpx;"></image>
				</view>
				<view class="page-content">
					<view class="title">
						东兴市新冠肺炎疫情专题
                        <image src="https://qiniu.xzlglobal.com/hs/mp/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 10rpx;margin-left: 10rpx;"></image>
                    </view>
					<view class="bottom">
						<view class="bottom-sub">
							市发改局
						</view>
						<view class="bottom-time">
							6-16
						</view>
					</view>
				</view>
			</view>
            <view class="page-list">
				
				<view class="page-content">
					<view class="title" style="width:95vw">
						东兴：海鸭蛋铺出增收致富新路子
                        <view class="tag">New</view>
                        <!-- <u-tag text="New" plain shape="circle" borderColor="#33C8FB" color="#33C8FB" style="display:inline"></u-tag> -->
                        <!-- <image src="../../static/home/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 15rpx;margin-left: 10rpx;"></image> -->
                    </view>
					<view class="bottom">
						<view class="bottom-sub">
							市农业农村水利局
						</view>
						<view class="bottom-time">
							6-16
						</view>
					</view>
				</view>
			</view>
            <view class="page-list">
				<view class="page-img">
					<image src="https://qiniu.xzlglobal.com/hs/mp/home_bg@2x.png" style="width: 160rpx;height: 110rpx;"></image>
				</view>
				<view class="page-content">
					<view class="title" >
						请“罩”顾好自己！东兴市全方位宣传“全民戴口罩”
                        <!-- <image src="../../static/home/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 15rpx;margin-left: 10rpx;"></image> -->
                    </view>
					<view class="bottom">
						<!-- <view class="bottom-sub">
							市发改局
						</view> -->
						<view class="bottom-time">
							6-16
						</view>
					</view>
				</view>
			</view>
            <view class="page-list">
				<!-- <view class="page-img">
					<image src="../../static/home/home_bg@2x.png" style="width: 100rpx;height: 80rpx;"></image>
				</view> -->
				<view class="page-content">
					<view class="title" style="width:83vw;">
						【民族团结】防城港：边疆民族团结稳定绽放“幸福花”
                        <!-- <image src="../../static/home/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 15rpx;margin-left: 10rpx;"></image> -->
                    </view>
					<view class="bottom">
						<view class="bottom-sub">
							市城管局
						</view>
						<view class="bottom-time">
							6-16
						</view>
					</view>
				</view>
			</view>
            <view class="page-list">
				<!-- <view class="page-img">
					<image src="../../static/home/home_bg@2x.png" style="width: 100rpx;height: 80rpx;"></image>
				</view> -->
				<view class="page-content">
					<view class="title" style="width:83vw">
						情暖复工路！东兴市“点对点”护送工人赴粤务工
                        <!-- <image src="../../static/home/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 15rpx;margin-left: 10rpx;"></image> -->
                    </view>
					<view class="bottom">
						<view class="bottom-sub">
							市农业农村水利局
						</view>
						<view class="bottom-time">
							6-16
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
    <!-- 群众有话说 -->
    <view  v-if="current == 1">
        <view v-if="newArray.length">
            <view class="page-list" v-for="item in newArray" @click="handleDetail(item)"">
				<!-- <view class="page-img">
					<image src="../../static/home/home_bg@2x.png" style="width: 100rpx;height: 80rpx;"></image>
				</view> -->
				<view class="page-content">
					<view class="title" style="width:83vw">
                    <view class="tag" style="color:#FA801A;border-color:#FA801A;margin-right: 20rpx;" v-if="item.sqmyType==2">建言献策</view>
					<view class="tag" style="color:#39C97F;border-color:#39C97F;margin-right: 20rpx;" v-if="item.sqmyType==1">问题反馈</view>
					<view class="tag" style="color:#33C8FB;border-color:#33C8FB;margin-right: 20rpx;" v-if="item.sqmyType==4">吐槽</view>
					{{item.title}}
                    </view>
                    <view class="content">
						{{item.content}}
                    </view>
					<view class="bottom">
						<view class="bottom-comment">
							<image src="https://qiniu.xzlglobal.com/hs/mp/icon_pl1@2x.png" style="width: 34rpx;height: 27rpx;margin-top: 10rpx;margin-right: 10rpx;"></image>
							评论 239
						</view>
						<view class="bottom-parse">
							<!-- 6-16 -->
							<image src="https://qiniu.xzlglobal.com/hs/mp/icon_fy1@2x.png" style="width: 34rpx;height: 27rpx;margin-top: 10rpx;margin-right: 10rpx;"></image>
							附议 239
						</view>
					</view>
				</view>
			</view>
        </view>
    </view>
    <!-- 常见问题 -->
    <view  v-if="current == 2">
        <view>
            <view class="page-list">
				<!-- <view class="page-img">
					<image src="../../static/home/home_bg@2x.png" style="width: 100rpx;height: 80rpx;"></image>
				</view> -->
				<view class="page-content">
					<view class="title" style="width:83vw">
						通行证核酸时间不同步怎么办？
                        <!-- <image src="../../static/home/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 15rpx;margin-left: 10rpx;"></image> -->
                    </view>
                    <view class="content">
                        领导您好，我认为东兴市新冠肺炎疫情控制的这么好跟领导们的努力是息息相关的，在此想提出自己的一点…
                    </view>
					
				</view>
			</view>
             <view class="page-list">
				<!-- <view class="page-img">
					<image src="../../static/home/home_bg@2x.png" style="width: 100rpx;height: 80rpx;"></image>
				</view> -->
				<view class="page-content">
					<view class="title" style="width:83vw">
						通行证核酸时间不同步怎么办？
                        <!-- <image src="../../static/home/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 15rpx;margin-left: 10rpx;"></image> -->
                    </view>
                    <view class="content">
                        领导您好，我认为东兴市新冠肺炎疫情控制的这么好跟领导们的努力是息息相关的，在此想提出自己的一点…
                    </view>
					
				</view>
			</view>
             <view class="page-list">
				<!-- <view class="page-img">
					<image src="../../static/home/home_bg@2x.png" style="width: 100rpx;height: 80rpx;"></image>
				</view> -->
				<view class="page-content">
					<view class="title" style="width:83vw">
						通行证核酸时间不同步怎么办？
                        <!-- <image src="../../static/home/icon_fire@2x.png" style="width: 24rpx;height: 24rpx;margin-top: 15rpx;margin-left: 10rpx;"></image> -->
                    </view>
                    <view class="content">
                        领导您好，我认为东兴市新冠肺炎疫情控制的这么好跟领导们的努力是息息相关的，在此想提出自己的一点…
                    </view>
					
				</view>
			</view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
   //  props:{
   //    current:{
   //      type:Number,
   //      default:0
   //    },
	  // newArray:{
	  //   type:Array,
	  //   default:()=>[]
	  // }
   //  },
   props:['current','newArray'],
    data(){
        return{
			
        }
    },
	onShow() {
		console.log(1232131)
		console.log('1111',this.newArray)
	},
	methods: {
		handleDetail(item) {
			
			uni.navigateTo({
				url: './detail?item='+JSON.stringify(item)
			})
		}
	}
}
</script>

<style lang="scss" scoped>

.tbcontent {
	width: 100%;
	margin-top: 10rpx;
	.page-list{
		display: flex;
        // flex-flow: column;
        flex-direction:row;
        padding: 30rpx 13rpx;
        border-bottom: 1px solid #F7F7F7;
		.page-img{
			padding-right:20rpx ;
		}
		.page-content{
			.title{
                display: inline-flex;
				flex-direction:row;
                width:60vw;
                overflow: wrap;
                font-size: 30rpx;
			    align-items: center;
                .tag{
                    height: 32rpx;
                    line-height: 32rpx;
                    margin-left: 8rpx;
                    color: #33C8FB;
                    border-color: #33C8FB;
                    padding: 0 10rpx;
                    border:3rpx solid;
                    border-radius:18rpx ;
					font-size: 	20rpx;
					font-weight: bold;
					// height: 32rpx;
                }
                /deep/ .u-tag, .u-tag--circle, .u-tag--medium, .u-tag--medium {
                            height: 21px ;
                            line-height: 22px;
                            // padding: 0px 3px;
                            border: 3rpx solid;
                            margin-right: 3px;
                            font-size: 20rpx;
                            text-align: center;
                            padding: 0;
                            margin-right: 20rpx;

                        }
            }
            .content{
                width: 83vw;
                height: 85rpx;
                font-size: 28rpx;
                color: #666666;
                overflow:hidden;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;//显⽰的⾏数

            }
			.bottom{
				display: flex;
				// flex-flow: column;
				flex-direction:row;
                margin-top: 15rpx;
				.bottom-sub{
					color: #888888;
                    font-size: 28rpx;
				}
				.bottom-time{
                    margin-left: 50rpx;
					color: #888888;
                    font-size: 28rpx;
				}
				.bottom-comment{
					display: inline-flex;
					flex-direction:row;
					color: #888888;
					font-size: 28rpx;
				}
				.bottom-parse{
					display: inline-flex;
					flex-direction:row;
					color: #888888;
					font-size: 28rpx;
                    margin-left: 230rpx;
				}
			}
		}
	}
}
</style>