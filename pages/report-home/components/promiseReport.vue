<template>
  <view class="body" :style="inStyle">
    <u-checkbox-group v-model="checkboxValue" @change="checkboxStr">
      <u-checkbox :customStyle="{ marginBottom: '16rpx' }"  name="checked" label="我已阅读并同意"/>
    </u-checkbox-group>
    <view> 
      <text @click.stop="getContent">个人承诺书</text>
    </view>

    <u-popup
      :show="show"
      mode="center"
      round="10px"
      :safeAreaInsetBottom="false"
      customStyle="width: 625rpx"
    >
      <view class="message">
        <view class="title">承诺书</view>
        <u-line color="#EEEEEE"></u-line>
        <view class="u-content">
    		<scroll-view style="max-height: 60vh;" scroll-y>
    			<u-parse :content="content"></u-parse>
    		</scroll-view>
        </view>
        <u-line color="#EEEEEE"></u-line>
        <button @click="close"  :disabled="time > 0" class="footer-button">
		 {{ time > 0 ? `(${time})我知道了` : '我知道了' }}
		</button>
      </view>
    </u-popup>
  </view>
</template>
<script>
export default {
  components: {},
  props: {
    value: Boolean,
	inStyle: String
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
		isDisabled:true,
		time:10,
		content:`<p>本人承诺：所填信息真实准确，无隐瞒或谎报来源地、目的地、健康状况等疫情防控信息，自愿配合目的地疫情防控管理措施。如违反相关规定，本人自愿承担相应法律法规的处罚。</p>
		<p>【中高风险地区人员】抵桂不足7天的，需要实行14天集中隔离医学观察；抵桂超过7天但不足14天的，实行7天集中隔离医学观察；抵桂超过14天不足21天的，实行7天居家健康监测。</p>
		<p>【中高风险地区所在县（市、区）或直辖市街道/镇返桂来桂人员】抵桂不足7天的，实行7天集中隔离医学观察+7天居家健康监测（第2天、4、7各进行一次核酸检测）；抵桂超过7天不足14天的，实行7天居家健康监测；抵桂超过14天不足21的，进行2次核酸检测（纳入管理后立即进行，两次核酸检测间隔不少于24小时），2次核酸检测结果出来前需居家健康监测。</p>
		<p>【本土疫情发生所在设区市或直辖市城区返桂来桂人员】抵桂后实行7天居家健康监测（纳入管理后第1、4、7天各进行1次核酸检测）+7天自我健康监测（第2天、7天各做1次核酸检测）。</p>`,
      checkboxValue: [],
      show: false,
    };
	
  },
  methods:{
	  getContent(){
		  this.show = true
		  // 设定时间
		  this.time = 10
		  // 开启定时
		  const interval = setInterval(()=>{
			  // 减号执行的位置决定if中的判断条件
			  this.time --
			  // 停止定时器
			  if (this.time < 0) {
				  clearInterval(interval)
			  }
		  }, 1000)
	  },
	  checkboxStr(val){
		  console.log(val)
		  if(val && val.length>0){
			  this.getContent()
		  }
	  },
	  close() {
	  	this.show = false;
	  }
  }
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
  flex-direction: inherit;
  text {
    color: #3a8cf0;
    letter-spacing: -4rpx;
	padding-left: 5rpx;
    &::before {
      content: "<< ";
    }
    &::after {
      content: " >>";
    }
  }
  & > view {
	  white-space: nowrap;
	  flex: 1;
	  display: initial;
	  position: relative;
	  top: 3rpx;
  }
}
</style>