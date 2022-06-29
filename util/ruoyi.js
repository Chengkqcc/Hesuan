/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 判断日期是否是以前时间
export function judgeTime(time) {
	var strtime = new Date(time.replace(/-/g, '/')); //时间转换
	// const [year, month, date, hours, minutes, seconds] = time.split(/(-| |:)/g).filter(v => ![' ', '-', ':'].includes(
	// 	v)).map(v => Number(v))
	// const date1 = new Date(year, month - 1, date, hours, minutes, seconds)
	
	
	//时间
	var date1 = new Date(strtime);
	
	var today =  uni.$u.timeFormat(new Date(), 'yyyy-mm-dd 00:00:00')
	 today = new Date(today.replace(/-/g, '/')); //时间转换
	// const [yeartoday, monthtoday, datetoday, hourstoday, minutestoday, secondstoday] = today.split(/(-| |:)/g).filter(v => ![' ', '-', ':'].includes(
	// 	v)).map(v => Number(v))
	// const date2 = new Date(yeartoday, monthtoday - 1, datetoday, hourstoday, minutestoday, secondstoday)
	
	//现在时间
	var date2 = new Date(today);
	//判断时间是否过期
	return date1.getTime() < date2.getTime() ? true : false;
}
