<template>
	<view>
		<view class="banner">
			<image class="bg" src="@/static/work-platform/wg_bg.png"></image>
			<view class="title">
				<image src="@/static/work-platform/dl_touxiang.png"></image>网格管理可视化大数据
			</view>
			<view class="data-info">
				<view>
					<view class="sm-title">
						<image style="width: 38rpx;height: 31rpx;" src="@/static/work-platform/icon_wg1.png" mode=""></image>
						总业务数
					</view>
					<view class="number">4867</view>
					<view class="unit">件</view>
				</view>
				<view>
					<view class="sm-title">
						<image style="width: 35rpx;height: 33rpx;" src="@/static/work-platform/icon_wg2.png" mode=""></image>
						已办数
					</view>
					<view class="number">4867</view>
					<view class="unit">件</view>
				</view>
				<view>
					<view class="sm-title">
						<image style="width: 31rpx;height: 35rpx;" src="@/static/work-platform/icon_wg3.png" mode=""></image>
						待办数
					</view>
					<view class="number">4867</view>
					<view class="unit">件</view>
				</view>
				<view>
					<view class="sm-title">
						<image style="width: 35rpx;height: 35rpx;" src="@/static/work-platform/icon_wg4.png" mode=""></image>
						审核中数
					</view>
					<view class="number">4867</view>
					<view class="unit">件</view>
				</view>
			</view>
			<view class="data2-info">
				<view>
					<view>今日提交业务数</view>
					<view class="number">296</view>
				</view>
				<view>
					<view>今日已办理数</view>
					<view class="number">296</view>
				</view>
				<view>
					<view>今日审核中数</view>
					<view class="number">296</view>
				</view>
				<view>
					<view>今日未办理数</view>
					<view class="number">296</view>
				</view>
				<view>
					<view>今日驳回数</view>
					<view class="number">296</view>
				</view>
				<view>
					<view>今日投诉数</view>
					<view class="number">296</view>
				</view>
			</view>
		</view>
		<view class="ranking">
			<view class="tab">
				<view class="active">办理数量排名</view>
				<view>办理好评率排名</view>
			</view>
			<view class="tab-content">
				<view>
					<view class="label">优秀部门</view>
					<view class="slide">
						<view class="unit">1</view>
						<view class="con">七星/二十二网格</view>
					</view>
					<view class="slide">
						<view class="unit">12</view>
						<view class="con">七星/二十二网格</view>
					</view>
					<view class="slide">
						<view class="unit">3</view>
						<view class="con">七星/二十二网格</view>
					</view>
				</view>
				<view>
					<view class="label">优秀部门</view>
					<view class="slide">
						<view class="unit">1</view>
						<view class="con">七星/二十二网格</view>
					</view>
					<view class="slide">
						<view class="unit">12</view>
						<view class="con">七星/二十二网格</view>
					</view>
					<view class="slide">
						<view class="unit">3</view>
						<view class="con">七星/二十二网格</view>
					</view>
				</view>
			</view>
		</view>
		<view class="data-chartr">
			<view class="tab">
				<view class="active">本周</view>
				<view>本月</view>
				<view>本年</view>
			</view>
			<view class="tab-content">
				<view class="chart-1">
					<view class="title">业务提交数趋势分析</view>
					<view class="charts-box">
						<qiun-data-charts
							type="area"
						  :opts="opts"
						  :chartData="chartData"/>
					</view>
				</view>
				<view class="chart-2">
					<view class="title">业务办理趋势分析</view>
					<view class="charts-box">
						<qiun-data-charts
							type="area"
						  :opts="opts"
						  :chartData="chartData"/>
					</view>
				</view>
				<view class="chart-3">
					<view class="title">5星好评趋势分析</view>
					<view class="charts-box">
						<qiun-data-charts
							type="area"
						  :opts="opts"
						  :chartData="chartData"/>
					</view>
				</view>
			</view>
		</view>
			<!--  -->
	</view>
</template>

<script>
	import QiunDataCharts from './qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
	export default {
		components: {
			'qiun-data-charts': QiunDataCharts
		},
		data() {
			return {
				chartData: {},
				opts: {
					legend: {
						show: false,
					},
				        color: ["#FFF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
				        padding: [15,15,0,15],
				        xAxis: {
				          disableGrid: true,
						  axisLineColor:'#FFFFFF',
						  gridColor:'#FFFFFF',
						  fontColor:'#FFFFFF',
						  fontSize: 0
				        },
				        yAxis: {
							gridColor:'#FFFFFF',
							data: [
								{
								  axisLineColor: 'transparent',
								  gridType: "solid",
								  dashLength: 1,
								  fontColor:'#FFFFFF'
								}
							]
						},
						dataLabel: false,
				        extra: {
				          area: {
				            type: "curve",
				            opacity: 0.2,
				            addLine: true,
				            width: 2,
				            gradient: true
				          }
				        }
				      }
			}
		},
		onLoad() {
			this.getServerData()
		},
		methods: {
			
			    getServerData() {
			      //模拟从服务器获取数据时的延时
			      setTimeout(() => {
			        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			        let res = {
			            categories: ["2016","2017","2018","2019","2020","2021"],
			            series: [
			              {
							name: 'dawd',
			                data: [35,8,25,37,4,20]
			              },
			            ]
			          };
			        this.chartData = JSON.parse(JSON.stringify(res));
			      }, 500);
			    },
		}
	}
</script>

<style>
	page {
		background: #F1F4F7;
	}
</style>
<style lang="scss" scoped>
	.charts-box {
		width: 100%;
		height: 270rpx;
	}
.data-chartr {
	margin-top: 20rpx;
	background: #fff;
	.tab {
		display: flex;
		justify-content: space-between;
		padding: 13rpx 17rpx;
		border-bottom: 2rpx solid #EEEEEE;
		view {
			width: 208rpx;
			line-height: 63rpx;
			border-radius: 46rpx;
			font-size: 33rpx;
			color: #333333;
			font-weight: bold;
			text-align: center;
			&.active {
				background: #3A8CF0;
				color: #fff;
			}
		}
	}
	.tab-content {
		padding-bottom: 20rpx;
		& > view {
			margin: 21rpx 15rpx 0;
			height: 375rpx;
			border-radius: 17rpx;
			font-size: 33rpx;
			color: #FFFFFF;
			.title {
				padding: 17rpx 25rpx;
			}
			&.chart-1 {
				background: #6ECDFF;
			}
			&.chart-2 {
				background: #3A8CF0;
			}
			&.chart-3 {
				background: #21C59F;
			}
		}
	}
}
.ranking {
	margin-top: 21rpx;
	background: #fff;
	.tab {
		display: flex;
		line-height: 92rpx;
		text-align: center;
		border-bottom: 2rpx solid #EEEEEE;
		view {
			flex: 1;
			color: #333333;
			font-weight: bold;
			position: relative;
			&.active::after {
				content: '';
				position: absolute;
				width: 100%;
				bottom: 0px;
				height: 8rpx;
				background: #3A8CF0;
				left: 0px;
			}
		}
	}
	.tab-content {
		display: flex;
		padding: 0 25rpx;
		& > view {
			flex: 1;
			.label {
				padding: 17rpx 0 23rpx;
				font-size: 29rpx;
			}
			.slide {
				color: #333333;
				font-size: 29rpx;
				margin-bottom: 40rpx;
				display: flex;
				.unit {
					width: 46rpx;
					line-height: 46rpx;
					text-align: center;
					border-radius: 50%;
					margin-right: 20rpx;
					color: #fff;
				}
				&:last-child {
					margin-bottom: 20rpx;
				}
			}
			&:first-child {
				.label { color: #FF7814; }
				.slide {
					.unit {
					background: #FF7814;
					}
				}
			}
			&:last-child {
				.label { color: #3A8CF0; }
				.slide {
					.unit {
					background: #3A8CF0;
					}
				}
			}
		}
	}
}
.banner {
		position: relative;
		z-index: 1;
		background: #fff;
	.bg {
		width: 100%;
		height: 346rpx;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: -1;
	}
	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 42rpx;
		padding-top: 27rpx;
		image {
			margin-right: 20rpx;
			width: 83rpx;
			height: 83rpx;
		}
	}
	.data2-info {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 13rpx 25rpx 33rpx;
		// margin-top: 50rpx;
		& > view {
			width: 206rpx;
			text-align: center;
			margin-top: 31rpx;
			& > view:first-child {
				color: #333333;
				font-weight: bold;
				font-size: 29rpx;
				margin-bottom: 8rpx;
			}
			& > view:last-child {
				width: 200rpx;;
				margin: 0 auto;
				font-size: 42rpx;
				height: 63rpx;
				background: linear-gradient(180deg, #28B9D4 0%, #3A8CF0 100%);
				border-radius: 31rpx;
				text-align: center;
				line-height: 63rpx;
				color: #fff;
				font-weight: bold;
			}
		}
	}
	.data-info {
		display: flex;
		color: #fff;
		margin-top: 50rpx;
		justify-content: space-between;
		margin-bottom: 50rpx;
		padding: 0 13rpx;
		& > view {
			text-align: center;
			position: relative;
			&::after {
				content: '';
				position: absolute;
				height: 170rpx;
				width: 1rpx;
				background: #88BDFF;
				right: -30rpx;
				top: -15rpx;
			}
			.sm-title {
				font-size: 29rpx;
				display: flex;
				align-items: center;
				image {
					margin-right: 6rpx;
				}
			}
			.number {
				margin-top: 8rpx;
				line-height: 58rpx;
				font-size: 42rpx;
			}
			.unit {
				font-size: 25rpx;
			}
		}
	}
}
</style>
