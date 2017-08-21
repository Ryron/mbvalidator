import $ from 'Zepto';
// import rules from './rules';
let type = ['input:not([type]), input[type="color"], input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="file"], input[type="hidden"], input[type="month"], input[type="number"], input[type="password"], input[type="range"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"], textarea', 'select', 'input[type="checkbox"], input[type="radio"]'];
let allTypes = type.join(',');
function Validator ($form, settings, success, fail) {
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
			$this.on('keyup', function (event) {
				self.checkFiled($this);
			});
		};
	});
};
Validator.prototype.checkFiled = function ($field) {
	let self = this;
	let fieldValue = $.trim($field.val()) || '';         // value值
	let rules = $field.attr("data-rules");				       // 规则
	let descriptions = $field.attr('data-descriptions'); // value描述
	console.log(rules);
	console.log(typeof rules);
};
export default Validator;
