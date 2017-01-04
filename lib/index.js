'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _crypto = require('crypto');var _crypto2 = _interopRequireDefault(_crypto);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _request = require('request');var _request2 = _interopRequireDefault(_request);
var _config_lib = require('../config_lib');var _config_lib2 = _interopRequireDefault(_config_lib);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var


KDNiaoService = function () {
  function KDNiaoService(options) {_classCallCheck(this, KDNiaoService);
    this.options = Object.create(null);
    this.mixinOptions(_config_lib2.default, options);
  }_createClass(KDNiaoService, [{ key: 'mixinOptions', value: function mixinOptions()

    {for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {options[_key] = arguments[_key];}
      Object.assign.apply(Object, [this.options].concat(options));
    } }, { key: 'genRequestData', value: function genRequestData(

    requestData) {
      var sign = void 0;
      var md5sum = void 0;

      requestData = JSON.stringify(requestData);
      md5sum = _crypto2.default.createHash('md5');
      md5sum.update(requestData);
      md5sum.update(this.options.AppKey);
      sign = md5sum.digest('hex');
      sign = new Buffer(sign).toString("base64");

      return {
        DataSign: encodeURIComponent(sign),
        RequestType: this.options.type,
        RequestData: encodeURIComponent(requestData),
        DataType: this.options.DataType,
        EBusinessID: this.options.EBusinessID };

    } }, { key: 'makeRequest', value: function makeRequest(

    rawData) {
      var url = void 0;
      var requestData = void 0;

      url = this.options.url;
      requestData = this.genRequestData(rawData);
      return new Promise(function (resolve, reject) {
        _request2.default.post({ url: url, form: requestData }, function (err, httpResponse, body) {
          if (err) {
            reject(err);
          } else
          {
            try {
              resolve(JSON.parse(body));
            }
            catch (err) {
              reject(err);
            }
          }
        });
      });
    }

    //4.1	物流轨迹（即时查询）同步查询
  }, { key: 'makeOrderTraceSync', value: function makeOrderTraceSync(order) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.mixinOptions(_config_lib2.default.traceSync, options);
      var requestData = { ShipperCode: order.shipper, LogisticCode: order.code };

      return this.makeRequest(requestData);
    }

    //4.2	物流轨迹（订阅查询）
    //order: {shipper: 'xxx', code: 'xx'}
  }, { key: 'makeOrderTrace', value: function makeOrderTrace(order) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.mixinOptions(_config_lib2.default.trace, options);
      var requestData = { ShipperCode: order.shipper, LogisticCode: order.code };

      return this.makeRequest(requestData);
    }

    //5	异步推送（回调）接口
  }, { key: 'makeAsyncSubscribe', value: function makeAsyncSubscribe(orders) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var requestData = {};

      this.mixinOptions(_config_lib2.default.asyncSubscribe, options);
      requestData.PushTime = (0, _moment2.default)().format('YYYY-MM-DD hh-mm-ss');
      requestData.data = orders.map(function (it) {return { ShipperCode: it.shipper, LogisticCode: it.code };});
      requestData.count = requestData.data.length;
      requestData.EBusinessID = this.options.EBusinessID;
      return this.makeRequest(requestData);
    } }]);return KDNiaoService;}();exports.default = KDNiaoService;