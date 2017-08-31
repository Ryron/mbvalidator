let rules = {
	required: {
		msg: '该项为必填/必选',
		rule: function (val) {
			// 必填
			return val !== '';
		}
	},
	// 电话号码
	telephone: {
		msg: '请输入有效的电话号码',
		rule: function (val) {
			let reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
			return reg.test(val);
		}
	},
	// 手机号码
	mobilephone: {
		msg: '请输入有效的手机号码',
		rule: function (val) {
			let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			return reg.test(val);
		}
	},
	// 邮箱 email
	email: {
		msg: '请输入有效的邮箱',
		rule: function (val) {
			let reg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
            return reg.test(val);
		}
	},
	// 网址 url
	url: {
		msg: '请输入有效的网址',
		rule: function (val) {
			let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
			return reg.test(val);
		}
	},
	// 邮政编码
	postcode: {
		msg: '请输入有效的邮编',
		rule: function (val) {
			let reg = /^[1-9][0-9]{5}$/;
            return reg.test(val);
		}
	},
	// 身份证号码
	idcard: {
		msg: '请输入有效的身份证号码',
		rule: function (val) {
			let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return reg.test(val);
		}
	}
};
export default rules;
