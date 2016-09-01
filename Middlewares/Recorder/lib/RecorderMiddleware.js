"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sqlite3Helper = require('./Sqlite3Helper');

var _Sqlite3Helper2 = _interopRequireDefault(_Sqlite3Helper);

var _models = require('./models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_models.UserModel.sync({ force: true }).then(function () {
    return _models.UserModel.create({
        channel_id: 'test',
        user_id: 'codemeow',
        name: 'codemeow'
    });
});

var RecorderMiddleware = function () {
    function RecorderMiddleware() {
        _classCallCheck(this, RecorderMiddleware);
    }

    _createClass(RecorderMiddleware, [{
        key: 'receive',
        value: function receive(event, next) {
            console.log(event.text);
            next();
        }
    }]);

    return RecorderMiddleware;
}();

exports.default = RecorderMiddleware;
//# sourceMappingURL=RecorderMiddleware.js.map