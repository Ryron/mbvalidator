import $ from 'Zepto';
import _ from './utils';
import Rules from './rules';
import {verifyFiled} from './methods';
import {allTypes} from './types';
class Validator {
	constructor (form, settings, success, error) {
			let self = this;
			let fields = form.find(allTypes);
			let defaults = {
			};
			self.form = form;
			self.fields = fields;
			self.settings = $.extend(true, defaults, settings);
			self.rules = $.extend(true, Rules, Validator.rules);
			self.success = success || _.noop;
			self.error = error || _.noop;

			fields.each(function () {
				let $this = $(this);
				if ($this.is(allTypes)) {
					// 绑定onkeyup
					$this.on('keyup', function (event) {
						verifyFiled.call(self, $this);
					});
				};
			});
			form.on('submit', function (event) {
				self.verifyForm();
			});
	}
	verifyForm () {
		let self = this;
		let formValid = true;
		let isShowDialog = true;
		self.settings.isFirstTime = true;
		self.fields.each(function () {
			let $this = $(this);
			let status = verifyFiled.call(self, $this, isShowDialog);
			if (!status) {
				formValid = false;
			}
		});
		if (formValid) {
			// 验证通过
			self.success();
		} else {
			// 验证失败
			self.error();
		}
		event.preventDefault();
		event.stopImmediatePropagation();
	}
};
export default Validator;
