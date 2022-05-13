

import CryptoJS from 'crypto-js/crypto-js'

// 数据解码
export const decrypt=(enced)=> {
	if(enced==null){

		enced = "b3db967ab941060580899603d7158d6d";
	}
	var key = '457a31315357754a696a6a4235766676526169584c366a437a64624541554e74';
	key = CryptoJS.enc.Hex.parse(key);
	var dec = CryptoJS.AES.decrypt(
		CryptoJS.format.Hex.parse(enced),
		key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
	})
	// console.log(CryptoJS.enc.Utf8.stringify(dec));
	return JSON.parse(CryptoJS.enc.Utf8.stringify(dec));
}

// 时间格式化
export function dateFormat(fmt, date) {
	let ret
	const opt = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	}
	for (let k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt)
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
		}
	}
	return fmt
}