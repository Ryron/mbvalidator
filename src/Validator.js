import $ from 'Zepto';
import _ from './utils';
import Rules from './rules';
let type = ['input:not([type]), input[type="color"], input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="file"], input[type="hidden"], input[type="month"], input[type="number"], input[type="password"], input[type="range"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"], textarea', 'select', 'input[type="checkbox"], input[type="radio"]'];
let allTypes = type.join(',');
class Validator {
	constructor ($form, settings, success, fail) {
			let self = this;
			let $fields = $form.find(allTypes);
			// let settings = $.extend(true, Validator.defaults, settings);
			self.$form = $form;
			self.$fields = $fields;
			self.settings = settings;
			$fields.each(function () {
				let $this = $(this);
				if ($this.is(allTypes)) {
					// 绑定onkeyup
					// $this.on('keyup', function (event) {
					// 	self.checkFiled($this);
					// });
				};
			});
			$form.on('submit', function (event) {
				let formValid = true;
				self.settings.isFirstTime = true;
				$fields.each(function () {
					let $this = $(this);
					let status = self.checkFiled($this);
					if (!status) {
						formValid = false;
					}
				});
			});
	}
	checkFiled ($field) {
		let self = this;
		let status = true;
		let fieldValue = $field.val().trim() || '';          // value值
		let fieldRules = $field.attr('data-rules').trim();	 // 规则
		let descriptions = $field.attr('data-descriptions'); // value描述
		let errorMsg = '';                                   // 错误信息提示
		if (!_.isNull(fieldRules)) {
			let fieldRulesAry = fieldRules.split(';');
			let isRequired = fieldRulesAry.indexOf('required') >= 0; // 是否必填
			// 不必填不需要校验
			if (!isRequired) {
				return status;
			};
			// 其他规则
			for (let index = 0, len = fieldRulesAry.length; index < len; index++) {
				let currentRule = fieldRulesAry[index].trim();
				// 必填
				if (currentRule === '') continue;
				if (currentRule === 'required' && $field.is(type[2])) {
					// 单选、复选
					if (self.$form.find('[name="' + $field.prop('name') + '"]:checked').length === 0) {
						status = false;
					} else {
						status = true;
					};
				} else if (currentRule === 'required' && $field.is(type[1])) {
					// select
					if (fieldValue === '' || fieldValue === '请选择') {
						status = false;
					};
				} else {
					if (typeof Rules[currentRule] === 'undefined') {
						console.error('没有匹配到规则' + currentRule);
					} else {
						status = Rules[currentRule].rule(fieldValue, $field);
					}
				};
				errorMsg = Rules[currentRule] ? descriptions + ',' + Rules[currentRule].msg : '空';
				if (!status && self.settings.isFirstTime) {
					self.showMsg(errorMsg);
					$field.focus();
					self.settings.isFirstTime = false;
				}
			}
			return status;
		}
		return status;
	}
	showMsg (msg) {
		let error = this.settings.error;
		if (error) {
			error(msg);
			return;
		}
		alert(msg);
	}
};
export default Validator;
