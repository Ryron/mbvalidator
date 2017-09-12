import $ from 'Zepto';
import Rules from './rules';
import {checkFiled} from './methods';
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
			fields.each(function () {
				let $this = $(this);
				if ($this.is(allTypes)) {
					// 绑定onkeyup
					$this.on('keyup', function (event) {
						checkFiled.call(self, $this);
					});
				};
			});
			form.on('submit', function (event) {
				let formValid = true;
				self.settings.isFirstTime = true;
				fields.each(function () {
					let $this = $(this);
					let status = checkFiled.call(self, $this);
					if (!status) {
						formValid = false;
					}
				});
				if (formValid) {
					// 验证通过
					success.call(form);
				} else {
					// 验证失败
					error.call(form);
				}
				event.preventDefault();
				event.stopImmediatePropagation();
			});
	}
};
export default Validator;
