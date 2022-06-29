module.exports = {
	// baseUrl: 'https://admin.xzlglobal.com/prod-api',
	
	//baseUrl: 'http://192.168.1.168:8080/',
	baseUrl: 'http://tesths.xzlglobal.com/prod-api/',
	// baseUrl: 'http://liguowei.nat300.top',
	// baseUrl: 'http://127.0.0.1:8080',
	// baseUrl: 'http://liguowei.nat300.top',
	// baseUrl: 'http://detxwz.natappfree.cc',
	qiniuUrl: 'https://qiniu.xzlglobal.com/',
	encryptKey:'dxszhh',
	blackList: [
		'/prod-api/captchaImage',
		'/profile/upload',
		'/qiniu/token',
		'/up/mp/v2/token/refresh',
		'/up/mp/v2/register',
		'/up/mp/v2/login',
		'/up/v2/getDictType',
		'/wechat/user/idcard/recognize',
		'/sys/sms/send',
		'/sys/sms/verify',
		'/sys/v2/getArea',
		'/sys/v2/getAreaSimple',
		'/up/mp/v2/check/login',
		'/up/v2/sys/dept/treeselect/notToken',
	]
}
