

/**
 * 验证手机号是否正确
 * @param {*} phone 
 * @returns boolean
 */
export const checkPhone = function(phone) {
    return /^1\d{10}$/g.test(phone)
}

/**
 * 验证车牌号是否正确
 * @param {*} licensePlate 
 * @returns boolean
 */
export const checkLicensePlate = function(licensePlate) {
    return licensePlate.length != ''
}

/**
 * 验证身份证是否正确
 * @param {*} val 
 * @returns boolean
 */
export const checkIdNo = function (val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    var code = val.substring(17);
    if(p.test(val)) {
        var sum = 0;
        for(var i=0;i<17;i++) {
            sum += val[i]*factor[i];
        }
        if(parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
  }