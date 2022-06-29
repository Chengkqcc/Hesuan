import config from "./config"

const { http } = uni.$u
// 获取菜单
export const fetchMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// 获取微信小程序openid
export const getOpenId = (params, config = {}) => http.get('/wechat/openid?hsCode='+params, params, config)
// 查询核算码是否存在
export const getCompanyByHsCode = (params, config = {}) => http.get('/wechat/user/hscode?hsCode='+params, params, config)

// 查询核算码是否存在
export const getCompanyByHsCodeV2 = (params, config = {}) => http.get('/wechat/user/hscode/V2?hsCode='+params.hsCode+'&openId='+params.openId, params, config)


// 身份证识别
export const getCardDetail = (params, config = {}) => http.post('/wechat/user/idcard/recognize', params, config)

// 通行证申请
export const userPermitApply = (params, config = {}) => http.post('/wechat/user/apply', params, config)

// 获取微信小程序openid
export const getUserInfo = (params, config = {}) => http.get('/wechat/user?openId='+params, params, config)

// 家人通行证申请
export const userFamilyPermitApply = (params, config = {}) => http.post('/wechat/user/family/apply', params, config)

//获取家人列表
export const getFamilyList = (params, config = {}) => http.get('/wechat/getFamilyList?userId='+params, params, config)
//
export const getFamilyListByOpenid = (params, config = {}) => http.get('/wechat/getFamilyListByOpenid?openid='+params, params, config)

// 查询用户信息
export const userById = (params, config = {}) => http.get('/wechat/userById?id='+params, params, config)

//查询七牛token
export const getUploadToken = (params, config = {}) => http.get('/qiniu/token', params, config)

//更新用户头像byOpenID
export const updatePortrait = (params, config = {}) => http.get('/wechat/updatePortrait/openid?openId='+params.openId+'&headUrl='+params.headUrl, params, config)

//更新用户头像byUserID
export const updatePortraitbyUserID = (params, config = {}) => http.put('/wechat/updatePortrait/userById?id='+params.userId+'&headUrl='+params.headUrl, params, config)


//解绑家人关系
export const unbundling = (params, config = {}) => http.put('/wechat/unbundling/family?id='+params, params, config)

// 用户通行证申请状态
export const userPassState  = (idNumber, config = {}) => {
	return http.get('/up/v2/userpassrecord/state?__system__catch=yes&idNumber='+idNumber, idNumber, config);
}

// 登录
export const login = (params, config = {}) => http.post(`/up/mp/v2/login`, params, config)
// 登录
export const loginCheck = (params, config = {}) => http.post(`/up/mp/v2/check/login`, params, config)
// 刷新登录
export const checkLogin = (params, config = {}) => http.get(`/up/mp/v2/token/refresh`, params, config)
// 注册
export const register = (params, config = {}) => http.post('/up/mp/v2/register', params, config)
// 退出登录
export const loginout = (params, config = {}) => http.get('/up/mp/v2/loginout', params, config)
// 获取用户信息
export const getUserDetailInfo = (params, config = {}) => http.get('/up/v2/userinfo?__system__catch', params, config)

// 申请通行证
export const userApply = (params, config = {}) => http.post('/up/v2/userpassrecord/apply', params, config)
//获取证件类型
export const getDictType = (params, config = {}) => http.get('/up/v2/getDictType?dict='+params, params, config)
// 商家出入码申请
export const comeCodeApply = (params, config = {}) => http.post(`/up/api/v2/sp/request`, params, config)
// 获取商家信息
export const getMerchantInfo = (params, config = {}) => http.get(`/up/api/v2/sp/info/client`, params, config)

// 用户通行证状态
export const userState = (idNumber, config = {}) => http.get('/up/v2/userpass/state?idNumber='+idNumber, undefined, config)

// 获取该用户申请的所有通行证申请
export const userpassrecordAll = (idNumber, config = {}) => http.get('/up/v2/userpassrecord/all', undefined, config)

// 获取该用户申请的所有通行证申请
export const useDeleteRecord = (recordId, config = {}) => http.delete('/up/v2/userpass/record?recordId='+recordId, undefined, config)

// 获取家人信息及通行证状态
export const useFamilyState = (params, config = {}) => http.post('/up/v2/userpass/family', params, config)
//  检查商家信息
// export const getMerchantInfo = (params, config = {}) => http.get(`/up/api/v2/sp/info/client`, params, config)

// 添加已申请通行证家人
export const userFamilyAdd = (params, config = {}) => http.post('/up/v2/userpass/family/add', params, config)
// 更新用户信息
export const updateUserInfo = (params, config = {}) => http.put('/up/v2/userinfo?id='+params.id+'&phone='+params.phone, params, config)
// 更新用户头像
export const updateUserInfoAvatar = (params, config = {}) => http.put('/up/v2/userinfo?id='+params.id+'&avatar='+params.avatar, params, config)

// 用户扫码. 正常返回： 0 正常， 1 确诊， 2 密接 3 疑似密接
export const userScan= (params, config = {}) => http.post(`/up/v2/user/scan?isIn=${params.isIn}&spId=${params.spId}&scanUserId=${params.scanUserId}`, params, config)


// 获取用户反馈列表
export const getFeedBackList = (idNumber, config = {}) => http.get('/up/v2/user/question/list', undefined, config)
export const addFead = (params, config = {}) => http.post('/up/v2/user/question', params, config)

// 修改头像
export const changeAvatar = (params, config = {}) => http.post('/up/v2/user/avatar/request', params, config)

// ​/up​/v2​/user​/avatar​/verify
export const verifyAvatar = (params, config = {}) => http.get('/up/v2/user/avatar/request/first', params, config)

// 返回个人登记扫码数据
export const userScanList = (params, config = {}) => http.post('/up/v2/user/scan/list', params, config)

// 用户通知列表
export const userNoticeList = (params, config = {}) => http.get('/up/v2/user/notice/list?__system__toast=yes', params, config)

// 获取通知详情
export const userNoticeDetail = (params, config = {}) => http.get('/up/v2/user/notice/detail?__system__toast=yes&id='+params, params, config)

// 用户需要弹窗通知及未读数量
export const userNoticePopup = (params, config = {}) => http.get('/up/v2/user/notice/popup?__system__toast=yes', params, config)

// 获取社区网格
export const deptTreeselect = (params, config = {}) => http.get('/up/v2/sys/dept/treeselect?__system__toast=yes', params, config)
// 获取社区网格
export const deptTreeselectNotToken = (params, config = {}) => http.get('/up/v2/sys/dept/treeselect/notToken?__system__toast=yes', params, config)
// 用户通行证申请记录状态及通行证状态
export const userPassandrecordState = (params, config = {}) => http.get('/up/v2/userpassandrecord/state?__system__toast=yes&idNumber='+params, params, config)

// 修改通知为已读
export const cleanUserNoticeReadIndex = (params, config = {}) => http.put('/up/v2/user/notice/readindex', params, config)

export const companyTree = (params, config = {}) => http.get('/company/tree', params, config)

// 发送验证码
export const sendSms = (params, config = {}) => http.get('/sys/sms/send', params, config)

// 发送验证码
export const verifySms = (params, config = {}) => http.get('/sys/sms/verify', params, config)

// 商区列表
export const getSpListByPage = (params, config = {}) => http.get(`/up/api/v2/sp/manager/request?&page=${params.page}&row=20&spName=${params.name || ''}&spType=${params.spType || ''}&requestState=AGREE&__system__catch=yes`, params, config)

// 司机报备
export const reported = (params, config = {}) => http.post('/ur/v2/user/driver/report', params, config)

// 司机报备修改
export const updateReported = (params, config = {}) => http.put('/ur/v2/driver/report', params, config)

// 司机用户报备详情
export const userReportedInfo = (params, config = {}) => http.get('/ur/v2/driver/report/detail', params, config)
// 删除司机报备
export const delDriverReported = (params, config = {}) => http.delete('/ur/v2/driver/report', params, config)

// 用户报备列表
export const userReportedList = (params, config = {}) => http.get('/ur/v2/user/reports', params, config)

// 群众入东兴报备
export const userReported = (params, config = {}) => http.post('/ur/v2/user/domestic/report', params, config)

// 群众用户报备详情
export const userDomesticReportedInfo = (params, config = {}) => http.get('/ur/v2/domestic/report/detail', params, config)

// 群众用报备修改
export const updateDomesticReported = (params, config = {}) => http.put('/ur/v2/domestic/report', params, config)

// 删除群众用报备
export const delDomesticReported = (params, config = {}) => http.delete('/ur/v2/domestic/report', params, config)

// 入境东兴报备
export const userGlobalReported = (params, config = {}) => http.post('/ur/v2/user/global/report', params, config)

// 入境用户报备详情
export const userGlobalReportedInfo = (params, config = {}) => http.get('/ur/v2/global/report/detail', params, config)

// 入境用户报备修改
export const updateGlobalReported = (params, config = {}) => http.put('/ur/v2/global/report', params, config)

// 删除入境用户出东兴报备
export const delGlobalReported = (params, config = {}) => http.delete('/ur/v2/global/report', params, config)

// 获取区域列表
export const getArea = (params, config = {}) => http.get('/sys/v2/getArea?pid='+params, params, config)

// 获取区域列表简要信息
export const getAreaSimple = (params, config = {}) => http.get('/sys/v2/getAreaSimple?deep=2', params, config)

// 创建用户出东兴报备
export const outReport = (params, config = {}) => http.post('/ur/v2/user/out/report', params, config)

// 删除用户出东兴报备
export const delOutReport = (params, config = {}) => http.delete('/ur/v2/user/out/reports', params, config)

// 获取用户出东兴报备
export const outReportQuery = (params, config = {}) => http.get('/ur/v2/user/out/report?id='+params, params, config)

// 获取当前服务器时间
export const getCurrDate = (params, config = {}) => http.get('/sys/v2/getCurrDate', params, config)
// 商户获取待收货列表
export const driverReportedList = (params, config = {}) => http.post('/ur/v2/sp/user/driver/report', params, config)


// 用户获取其申请的商区的隔离人员
export const isoReportedList = (params, config = {}) => http.get('/ur/v2/user/iso', params, config)


// 商户确认收货
export const driverReportedConfirm = (params, config = {}) => http.put('/ur/v2/sp/user/driver/report/confirm?id='+params.id+'&date='+params.date, params, config)

// 隔离人员确认到店
export const isoReportedConfirm = (params, config = {}) => http.put('/ur/v2/user/iso/confirm?urId='+params.urId+'&date='+params.date, params, config)

// 用户获取最新报备情况
export const outReportLatest = (params, config = {}) => http.get('/ur/v2/user/out/report/latest', params, config)

// 更新用户出东兴报备
export const outReportUpdate = (params, config = {}) => http.put('/ur/v2/user/out/report', params, config)

// 用户获取最新报备情况
export const inReportLatest = (params, config = {}) => http.get('/ur/v2/user/report/latest', params, config)

// 获取家人列表
export const getfamilyList = (params, config = {}) => http.get('/up/v2/userinfo/family?includeSelf=true', params, config)


// 获取根据id获取用户信息
export const getUserInfoById = (params, config = {}) => http.get('/up/v2/back/userinfo', params, config)

//查询商区申请记录的明细信息
export const getShopInfo = (params, config = {}) => http.get('/up/api/v2/sp/manager/requestById', params, config)
//获取用户小程序码
export const getMiniWxQrCode = (params, config = {}) => http.get('/up/mp/v2/getWxQrCode', params, config)

//新增问题反馈

export const sqmy = (params, config = {}) => http.post('/sqmy', params, config)

//问题反馈字典

export const dicsqmy = (params, config = {}) => http.get('/system/dict/data/type/'+'problem_reaction_type', params, config)

//建言献策字典

export const dicjyxc = (params, config = {}) => http.get('/system/dict/data/type/'+'jyxc_type', params, config)
//经验分享字典

// export const dicjyfc = (params, config = {}) => http.get('/system/dict/data/type/'+'jyxc_type', params, config)
//我要吐槽字典

// export const dicjyfc = (params, config = {}) => http.get('/system/dict/data/type/'+'jyxc_type', params, config)

//群众有话说列表
export const sqmyList = (params, config = {}) => http.post('/sqmy/list', params, config)

//群众有话说详情

export const sqmyDetail = (params, config = {}) => http.get('/sqmy/'+params, params, config)

//查询文章评论

export const commentreply = (params, config = {}) => http.get('/commentreply/'+params, params, config)


// 党建引领——一级模块字典
export const module1Type = (params, config = {}) => http.get('/system/dict/data/type/'+'module1_type', params, config)

// 党建引领——二级模块字典
export const module2Type = (params, config = {}) => http.get('/system/dict/data/type/'+'module2_type', params, config)