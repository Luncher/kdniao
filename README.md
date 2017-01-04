# 快递鸟SDK Node.js实现


## 使用方法

### 下载项目

```shell
git clone
```

### 运行测试

*运行测试之前，请先设置`AppKey`以及`EBusinessID`。*

```shell
npm test
```

```shell
npm run eslint
```

### 基本配置

```javascript
const config = {
  EBusinessID: 'xxx', //商户id
  AppKey: 'xxx' //秘钥
}
```

### demo(`同步查询快递信息`)

```javascript
  import assert from 'assert';
  import KDNService from '../src/index';

  const service = new KDNService(config);
  const order = {
    code: 'xxxx', //订单号
    shipper: 'ZTO' //快递提供商
  };

  service.makeOrderTraceSync(order)
  .then(ret => {
    assert(ret.Success, ret.Reason);
  });
```


## Todo List

- [x] 物流轨迹（订阅查询）
- [x] 物流轨迹（即时查询）
- [x] 异步推送
- [ ] 在线下单