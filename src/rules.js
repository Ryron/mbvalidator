let rules = {
	required: {
		msg: '该项为必填/必选',
		rule: function (val) {
			// 必填
			return val === '';
		}
	}
};
export default rules;
