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
	}
};
export default rules;
