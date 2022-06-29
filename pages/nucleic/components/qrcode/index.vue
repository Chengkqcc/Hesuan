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
				setTimeout(() => {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: this.size,
						height: this.size,
						destWidth: this.size,
						destHeight: this.size,
						canvasId: this.cid,
						success(res) {
							console.log('画图工具', res)
							options.success && options.success(res)
						},
						fail(err) {
							console.log('error', err)
						}
					}, this)
				}, 100)
			}
		}

	}
</script>

<style>
</style>
