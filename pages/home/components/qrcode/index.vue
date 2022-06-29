<template>
    <canvas class='qrcode-canvas' :canvas-id='cid' :style="{width: size+'px', height: size + 'px'}"></canvas>
</template>

<script>
const QRCode = require('./qrcode').default;
export default {
	props: {
		size: Number,
		cid: String,
		text: String
	},
	watch: {
		text() {
			this.render();
		}
	},
	mounted() {
		if (this.text) {
			setTimeout(() => {
				this.render();
			})
		}
	},
	methods: {
		render() {
			console.log("开始画二维码",this.qrcode)
			if (this.qrcode) {
				this.qrcode.clear();
			}
			this.qrcode = new QRCode(this.cid, {
				text: this.text,
				width: this.size,
				height: this.size,
				colorDark: 'black',
				colorLight: '#fff',
				correctLevel: QRCode.correctLevel.H,
				logo: '',
				that: this,
				successTips: false
			})
		},
		toTempFilePath(options) {
			uni.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: this.size,
				height: this.size,
				destWidth: this.size,
				destHeight: this.size,
				canvasId: this.cid,
				success(res) {
					options.success && options.success(res)
					console.log("下载二维码临时路径"+res)
				},
				fail(err) {
					console.log('下载二维码临时路径失败error', err)
				}
			}, this)
		}
	}
	
}
</script>

<style>
</style>