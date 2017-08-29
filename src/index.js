import $ from 'Zepto';
import Validator from './Validator';
$.fn.validate = function (settings, success, error) {
	let form = $(this);
	let vt = form.data('validator');
	// 检测是否已经创建
	if (vt) {
		return vt;
	};
	let validator = new Validator(form, settings, success, error);
	form.data('validator', validator);
	return validator;
};
$.extend($, {
	validateExtend: function (options) {
		Validator.rules = options;
	}
});
