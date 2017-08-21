import $ from 'Zepto';
import Validator from './Validator';
$.fn.validate = function (settings, success, fail) {
	let $form = $(this);
	let vt = $form.data('validator');
	// 检测是否已经创建
	if (vt) {
		return vt;
	};
	let validator = new Validator($form, settings, success, fail);
	console.log(validator);
	$form.data('validator', validator);
	return validator;
};
