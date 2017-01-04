import KDNService from '../src/index';

//请先设置相关参数
const config = {
  EBusinessID: '1273623',
  url: 'http://testapi.kdniao.cc:8081/api/dist',  
  AppKey: '7f06d741-162e-4ae2-8acd-2f09c14394e5',
};

const service = new KDNService(config);

let order = {
  code: '12345678',
  shipper: 'YTO'
};

describe('KDNService unit test', function() {
  it('should allow makeAsyncSubscribe', () => {
    return service.makeAsyncSubscribe([order], {type: '101'})
    .then(ret => {
      console.log('makeAsyncSubscribe ', ret);
    });
  });

  it('should allow makeOrderTrace', () => {
    return service.makeOrderTrace(order, {type: '1008'})
    .then(ret => {
      console.log('makeOrderTrace ', ret);
    });
  });
});