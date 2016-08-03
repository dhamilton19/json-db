'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = deepMerge;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function deepMerge(target, src) {
	var array = Array.isArray(src);
	var dest = array && [] || {};
	var newTarget = void 0;

	if (array) {
		newTarget = target || [];
		dest = [].concat(_toConsumableArray(dest), _toConsumableArray(newTarget));
		src.forEach(function (e, i) {
			if (typeof dest[i] === 'undefined') {
				dest[i] = e;
			} else if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object') {
				dest[i] = deepMerge(newTarget[i], e);
			} else if (target.indexOf(e) === 1) {
				dest.push(e);
			}
		});
	} else {
		if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
			Object.keys(target).forEach(function (key) {
				dest[key] = target[key];
			});
		}
		Object.keys(src).forEach(function (key) {
			if (_typeof(src[key]) !== 'object' || !src[key]) {
				dest[key] = src[key];
			} else if (!target[key]) {
				dest[key] = src[key];
			} else {
				dest[key] = deepMerge(target[key], src[key]);
			}
		});
	}

	return dest;
}