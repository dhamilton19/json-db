'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = function () {
	function Db() {
		_classCallCheck(this, Db);

		throw new Error('Class is static.');
	}

	_createClass(Db, null, [{
		key: 'init',
		value: function init(_ref) {
			var directory = _ref.directory;
			var fileName = _ref.fileName;

			this.initialised = true;
			if (!directory) throw new Error('Missing directory.');

			this.directory = directory + '\\';
			this.fileName = fileName ? fileName : 'data';
			this.writingPromise = new Promise(function (resolve) {
				resolve();
			});
			this.read();
		}
	}, {
		key: 'read',
		value: function read() {
			this.checkInitialised();
			try {
				this.entries = JSON.parse(_fs2.default.readFileSync(this.directory + this.fileName + this.fileExtension, 'utf-8'));
			} catch (e) {/* swallow error */
			}
		}
	}, {
		key: 'addToQueue',
		value: function addToQueue(item) {
			var _this = this;

			this.checkInitialised();
			this.queue = _extends({}, this.queue, item);
			this.writingPromise.then(function () {
				_this.handleQueue();
			});
		}
	}, {
		key: 'handleQueue',
		value: function handleQueue() {
			this.checkInitialised();
			this.entries = _extends({}, this.entries, this.queue);
			this.queue = {};
			this.writingPromise = this.write();
		}
	}, {
		key: 'write',
		value: function write() {
			var _this2 = this;

			this.checkInitialised();
			return new Promise(function (resolve) {
				_fs2.default.writeFile(_this2.directory + _this2.fileName + _this2.fileExtension, JSON.stringify(_this2.entries), 'utf-8', function () {
					resolve();
				});
			});
		}
	}, {
		key: 'getAll',
		value: function getAll(callback) {
			this.checkInitialised();
			callback(_defineProperty({}, this.fileName, this.entries));
		}
	}, {
		key: 'checkInitialised',
		value: function checkInitialised() {
			if (!this.initialised) throw new Error('Must initialise static class.');
		}
	}]);

	return Db;
}();

Db.entries = {};
Db.directory = '';
Db.fileName = '';
Db.fileExtension = '.json';
Db.queue = {};
Db.writingPromise = null;
Db.initialised = false;
exports.default = Db;