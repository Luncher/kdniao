import assert from 'assert';
import KDNService from '../src/index';


//请先设置相关参数
const config = {
  EBusinessID: 'xxx',
  url: 'http://testapi.kdniao.cc:8081/api/dist',  
  AppKey: 'xxxx-2f09c14394e5',
};


let order = {
  code: 'xxx',
  shipper: 'ZTO'
};

const service = new KDNService(config);

describe('KDNService unit test', function() {
  // it('should allow makeAsyncSubscribe', () => {
  //   return service.makeAsyncSubscribe([order])
  //   .then(ret => {
  //     assert(!ret.Success, ret.Reason);
  //   });
  // });

  it('should allow makeOrderTrace', () => {
    return service.makeOrderTrace(order)
    .then(ret => {
      assert(!ret.Success, ret.Reason);       
    });
  });

  // it('should allow makeOrderTraceSync', () => {
  //   return service.makeOrderTraceSync(order)
  //   .then(ret => {
  //     assert(!ret.Success, ret.Reason);          
  //   });
  // });
});