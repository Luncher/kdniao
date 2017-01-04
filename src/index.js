import crypto from 'crypto';
import moment from 'moment';
import request from 'request';


const RequestTypes = {
  subscribe: '1008',
  asyncSubscribe: '101'
};

//default configure
const KDNIAOConfig = {
  DataType: '2'
};

export default class KDNiaoService {
  constructor(options) {
    this.mixinOptions(options, KDNIAOConfig);
  }

  mixinOptions(...options) {
    this.options = Object.assign({}, ...options);    
  }

  genRequestData(type, requestData) {
    let sign;
    let md5sum;

    md5sum = crypto.createHash('md5');
    md5sum.update(requestData);
    md5sum.update(this.options.AppKey);
    sign = md5sum.digest('hex');
    sign = (new Buffer(sign)).toString("base64");

    return {
      DataSign: encodeURIComponent(sign),
      RequestType: type,      
      RequestData: encodeURIComponent(requestData),  
      DataType: this.options.DataType,
      EBusinessID: this.options.EBusinessID
    };
  }

  makeRequest(type, rawData) {
    let url;
    let requestData;

    url = this.options.url;
    rawData = JSON.stringify(rawData);
    requestData = this.genRequestData(type, rawData);
    
    return new Promise((resolve, reject) => {
      request.post({url, form: requestData}, (err, httpResponse, body) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(body);
        }
      });
    });
  }

  //5	异步推送（回调）接口
  makeAsyncSubscribe(orders, options = void 0) {
    if(options) {
      this.mixinOptions(options);
    }
    
    let requestData = {};    
    let requestType = RequestTypes.asyncSubscribe;    
    requestData.PushTime = moment().format('YYYY-MM-DD hh-mm-ss');
    requestData.data = orders.map(it => ({ShipperCode: it.shipper, LogisticCode: it.code}));
    requestData.count = requestData.data.length;
    requestData.EBusinessID = this.options.EBusinessID;
    return this.makeRequest(requestType, requestData);
  }

  //4.2	物流轨迹（订阅查询）
  //order: {shipper: 'xxx', code: 'xx'}
  makeOrderTrace(order, options = void 0) {
    if(options) {
      this.mixinOptions(options);
    }

    let requestType = RequestTypes.subscribe;    
    let requestData = {ShipperCode: order.shipper, LogisticCode: order.code};

    return this.makeRequest(requestType, requestData);
  }
}