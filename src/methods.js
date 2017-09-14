// Validator 方法集合
import _ from './utils';
import {type} from './types';
export function verifyFiled (field, isShowDialog) {
	let self = this;
	let status = true;
	let fieldValue = field.val().trim() || '';          // value值
	let fieldRules = field.attr('data-rules') ? field.attr('data-rules').trim() : '';	 // 规则
	let descriptions = field.attr('data-descriptions'); // value描述
	if (!_.isNull(fieldRules)) {
		let fieldRulesAry = fieldRules.split(';');
		let isRequired = fieldRulesAry.indexOf('required') >= 0; // 是否必填
		// 不必填且空值不需要校验
		if (!isRequired && fieldRules === '') {
			return status;
		};
		// 其他规则
		for (let index = 0, len = fieldRulesAry.length; index < len; index++) {
			let currentRule = fieldRulesAry[index].trim();

			if (currentRule === '') continue; // 规则为空

			if (currentRule === 'required' && field.is(type[2])) {
				// 单选、复选
				if (self.form.find('[name="' + field.prop('name') + '"]:checked').length === 0) {
					status = false;
				} else {
					status = true;
				};
			} else if (currentRule === 'required' && field.is(type[1])) {
				// select
				if (fieldValue === '' || fieldValue === '请选择') {
					status = false;
				};
			} else {
				// 其他
				if (typeof self.rules[currentRule] === 'undefined') {
					// 匹配不到规则
					console.error('没有匹配到规则' + currentRule);
				} else {
					status = self.rules[currentRule].rule(fieldValue, field);
				}
			};
			let errorMsg = self.rules[currentRule] ? descriptions + ',' + self.rules[currentRule].msg : '空';
			borderColor.call(self, field, status);
			if (!status) {
				// 验证错误
				if (self.settings.isFirstTime) {
					if (isShowDialog) showDialog.call(self, errorMsg);
					field.focus();
				}
				self.settings.isFirstTime = false;
				return status; // 退出当前field验证
			}
		}
	}
	return status;
}

// 信息提示
export function showDialog (msg) {
	let prompt = this.settings.prompt;
	if (prompt) {
		prompt(msg);
		return;
	} else {
		alert(msg);
	}
}

// 边框提示
export function borderColor (field, status) {
	if (status) {
		field.removeClass('color-error');
	} else {
		field.addClass('color-error');
	};
}

