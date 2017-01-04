import crypto from 'crypto';
import moment from 'moment';
import request from 'request';
import config from '../config_lib';


export default class KDNiaoService {
  constructor(options) {
    this.options = Object.create(null);
    this.mixinOptions(config, options);
  }

  mixinOptions(...options) {
    Object.assign(this.options, ...options);    
  }

  genRequestData(requestData) {
    let sign;
    let md5sum;

    requestData = JSON.stringify(requestData);    
    md5sum = crypto.createHash('md5');
    md5sum.update(requestData);
    md5sum.update(this.options.AppKey);
    sign = md5sum.digest('hex');
    sign = (new Buffer(sign)).toString("base64");

    return {
      DataSign: encodeURIComponent(sign),
      RequestType: this.options.type,      
      RequestData: encodeURIComponent(requestData),  
      DataType: this.options.DataType,
      EBusinessID: this.options.EBusinessID
    };
  }

  makeRequest(rawData) {
    let url;
    let requestData;

    url = this.options.url;
    requestData = this.genRequestData(rawData);
    return new Promise((resolve, reject) => {
      request.post({url, form: requestData}, (err, httpResponse, body) => {
        if(err) {
          reject(err);
        }
        else {
          try {
            resolve(JSON.parse(body));
          }
          catch(err) {
            reject(err);
          }
        }
      });
    });
  }

  //4.1	物流轨迹（即时查询）同步查询
  makeOrderTraceSync(order, options = {}) {
    this.mixinOptions(config.traceSync, options);
    let requestData = {ShipperCode: order.shipper, LogisticCode: order.code};

    return this.makeRequest(requestData);
  }

  //4.2	物流轨迹（订阅查询）
  //order: {shipper: 'xxx', code: 'xx'}
  makeOrderTrace(order, options = {}) {
    this.mixinOptions(config.trace, options);
    let requestData = {ShipperCode: order.shipper, LogisticCode: order.code};

    return this.makeRequest(requestData);
  }

  //5	异步推送（回调）接口
  makeAsyncSubscribe(orders, options = {}) {
    let requestData = {};    
    
    this.mixinOptions(config.asyncSubscribe, options);    
    requestData.PushTime = moment().format('YYYY-MM-DD hh-mm-ss');
    requestData.data = orders.map(it => ({ShipperCode: it.shipper, LogisticCode: it.code}));
    requestData.count = requestData.data.length;
    requestData.EBusinessID = this.options.EBusinessID;
    return this.makeRequest(requestData);
  }
}