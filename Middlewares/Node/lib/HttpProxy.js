"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tt = {
    "ops": [],
    "sequential": true
};

var HttpProxy = function () {
    function HttpProxy() {
        _classCallCheck(this, HttpProxy);

        this.createNewReq();
        this.access_token = process.env.SERVICE_ACCESS_TOKEN;
        this.httpclient = _restify2.default.createJsonClient({
            url: process.env.SERVICE_BASE_URL || 'https://example.instflow.com/',
            version: '*',
            headers: {
                'Access-Token': this.access_token
            }
        });
        this.defaultPath = process.env.SERVICE_DEFAULT_PATH || '/api/v1/batch';
        this.defaultMethod = process.env.SERVICE_DEFAULT_METHOD || 'post';
    }

    _createClass(HttpProxy, [{
        key: 'createNewReq',
        value: function createNewReq() {
            this.req = (0, _clone2.default)(tt);
        }
    }, {
        key: 'http',
        value: function http(method, url) {
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            this.req.ops.push({
                method: method,
                url: url,
                params: params,
                headers: headers
            });
        }
    }, {
        key: 'get',
        value: function get(url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.http('get', url, params, headers);
        }
    }, {
        key: 'post',
        value: function post(url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.http('post', url, params, headers);
        }
    }, {
        key: 'put',
        value: function put(url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.http('put', url, params, headers);
        }
    }, {
        key: 'patch',
        value: function patch(url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.http('patch', url, params, headers);
        }
    }, {
        key: 'delete',
        value: function _delete(url) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.http('delete', url, params, headers);
        }
    }, {
        key: 'hasCache',
        value: function hasCache() {
            return this.req.ops.length > 0;
        }
    }, {
        key: 'flush',
        value: function flush(callback) {
            var req_ = this.req;
            this.createNewReq();
            var m = this.httpclient[this.defaultMethod];
            if (typeof m == 'function') {
                m = m.bind(this.httpclient);
                m(this.defaultPath, req_, function (err, req, res, obj) {
                    if (err) {
                        console.log(err);
                    } else {
                        var results = obj.results;
                        results.forEach(function (resp, index) {
                            var status = resp.status;
                            var data = resp.body;
                            var err = data.error;
                            callback(err, data, resp, req_.ops[index]);
                        });
                    }
                    // Ignore response
                });
            } else {
                throw "Invalid HTTP verb, must be one of: get, post, put, patch, del.";
            }
        }
    }]);

    return HttpProxy;
}();

exports.default = HttpProxy;
//# sourceMappingURL=HttpProxy.js.map