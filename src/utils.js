let _ = {
	isNull: function (value) {
		return value === null;
	},
	noop: function () {
		return function () {};
	}
};

export default _;
