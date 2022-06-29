<template>
	<view class="detail-container">
		<view class="container">
			<view class="title">
				{{item.title}}
			</view>
			<view class="content">
				<view class="content-tag">
					建言献策
				</view>
				<view class="content-time">
					<view class="head">
						<img style="width: 100%;height: 100%;" src="https://qiniu.xzlglobal.com/hs/mp/head.png">
					</view>
					<text>
						<!-- 张忠义 发表于 2022-06-13 21:02 -->
						{{item.publisher+' 发布于 '+ item.publishTime|''}}
					</text>
				</view>
			</view>
			<view class="desc">{{desc}}</view>
			<view class="img" v-if="img.length">
				<!-- <view ></view> -->
				<img v-for="pic in img" :src="qiniuUrl+pic">
				<!-- <img src='https://qiniu.xzlglobal.com/hs/mp/img.png'>
				<img src='https://qiniu.xzlglobal.com/hs/mp/img.png'>
				<img src='https://qiniu.xzlglobal.com/hs/mp/img.png'> -->
			</view>
		</view>
		<view class="footer">
			<view class="footer-header">
				<text>评论</text>
				<view class="right">
					<view class="info">
						<img src="https://qiniu.xzlglobal.com/hs/mp/icon_pl1@2x.png" style="width: 34rpx;height: 27rpx;margin-top: 10rpx;margin-right: 10rpx;" />
						<text>评论 239</text>
					</view>
					<view class="info">
						<img src="https://qiniu.xzlglobal.com/hs/mp/icon_fy1@2x.png" style="width: 34rpx;height: 27rpx;margin-top: 10rpx;margin-right: 10rpx;" />
						<text>附议 129</text>
					</view>
				</view>
			</view>
		</view>
		<comment />
	</view>
</template>

<script>
import comment from '../../components/comment.vue'
import {
		sqmyDetail,
		commentreply
	} from "../../common/api.js";
export default {
	components: {
		comment
	},
	data() {
		return {
			id:'',
			item:'',
			// title:'',
			img:[],
			qiniuUrl: 'https://qiniu.xzlglobal.com/',
			desc: "领导您好，我认为东兴市新冠肺炎疫情控制的这么好跟领导们的努力是息息相关的，在此想提出自己的一点东兴市充分发挥党建+网格+大数据的优势，坚持以人民为中心，聚焦群众急难愁盼的问题，办实办快办好群众合理诉求，用心用情用力做好服务保障，让群众安心、顺心、放心，凝聚起众志成城共战疫情的强大合力."
		}
	},
	onLoad(param) {
		// this.item = JSON.parse(param.item)
		let items = JSON.parse(param.item)
		sqmyDetail(items.id).then(res=>{
			
			this.item = res
			this.desc = res.content
			this.img = res.pictureInfo.split(',')
			// console.log(this.img)
		})
		commentreply(items.id).then(request=>{
			console.log('onload',request)
		})
		// uni.$u.http.post('/commentreply/'+items.id,{params:{}}).then(request=>{
		// 	console.log('onload',request)
		// })
		// console.log()
		// this.desc = items.content
		// this.title = items.title
		
	},
	methods:{}
}
</script>

<style lang="scss" scoped>
.detail-container {
	width: 100%;
	.container {
		width: 90%;
		margin: auto;
		.title {
			padding-top: 10rpx;
			font-weight: 600;
		}
		.content {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			font-size: 30rpx;
			padding: 16rpx 0;
			.content-tag {
				color: rgb(250, 128, 26);
				border: 1px solid rgb(250, 128, 26);
				border-radius: 20rpx;
				padding: 0 10rpx;
				font-size: 25rpx;
			}
			.content-time {
				color: #888888;
				padding-left: 25rpx;
				display: flex;
				align-items: center;
				.head {
					width: 60rpx;
					height: 60rpx;
					margin-right: 10rpx;
				}
			}
		}
		.desc {
			color: #666;
		}
		.img {
			img {
				width: 200rpx;
				height: 200rpx;
				margin: 20rpx 10rpx 10rpx 10rpx;
			}
		}
	}
	.footer {
		width: 100%;
		border-top: 2px solid rgb(58, 140, 240);
		border-bottom: 1px solid #EBEEF5;
		padding-bottom: 20rpx;
		.footer-header {
			width: 90%;
			margin: auto;
			padding-top: 20rpx;
			.right {
				float: right;
				display: flex;
				.info {
					color: #666;
					font-size: 30rpx;
					padding-left: 30rpx;
				}
			}
		}
	}
}
</style>