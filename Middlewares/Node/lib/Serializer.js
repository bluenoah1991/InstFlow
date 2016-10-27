"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommonSerializer = CommonSerializer;
exports.IdentitySerializer = IdentitySerializer;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CommonSerializer(instance) {
    var instance_ = instance;
    if (typeof instance_['get'] == 'function') {
        instance_ = instance_.get();
    }
    return _underscore2.default.omit(instance_, ['id', '__sync__', '__tries__', 'createAt', 'updatedAt']);
}

function IdentitySerializer(instance, identities) {
    var instance_ = instance;
    if (typeof instance_['get'] == 'function') {
        instance_ = instance_.get();
    }
    return _underscore2.default.pick(instance_, identities);
}
//# sourceMappingURL=Serializer.js.map