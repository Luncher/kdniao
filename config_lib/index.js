'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _release = require('./release');var _release2 = _interopRequireDefault(_release);
var _development = require('./development');var _development2 = _interopRequireDefault(_development);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var Config = {
  'DataType': '2' };

var env = process.env.NODE_ENV;

if (env === 'development') {
  Object.assign(Config, _development2.default);
} else
{
  Object.assign(Config, _release2.default);
}exports.default =

Config;