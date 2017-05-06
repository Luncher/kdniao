# 快递鸟SDK Node.js实现

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]
[![David Status][david-image]][david-url]
[![NPM download][download-image]][download-url]

[npm-url]: https://www.npmjs.com/package/kdniaosdk
[npm-image]: https://img.shields.io/npm/v/kdniaosdk.svg?style=flat
[download-url]: https://www.npmjs.com/package/kdniaosdk
[download-image]: https://img.shields.io/npm/dm/kdniaosdk.svg?style=flat
[david-url]: https://david-dm.org/Luncher/KDNiao
[david-image]: https://david-dm.org/Luncher/KDNiao.svg?style=flat
[travis-url]: https://travis-ci.org/Luncher/kdniao
[travis-image]: https://img.shields.io/travis/Luncher/kdniao.svg?style=flat
[codecov-url]: https://codecov.io/gh/Luncher/kdniao
[codecov-image]: https://img.shields.io/codecov/c/github/Luncher/kdniao.svg?style=flat


## 使用方法

### 安装

```shell
npm install kdniaosdk
```

### 运行测试

*运行测试之前，请先设置`AppKey`以及`EBusinessID`。*

```shell
npm test
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

---

## LICENSE

  [MIT](https://mit-license.org/)