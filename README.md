# cloudFns

微信小程序云函数集合，有效提高开发时间和效率!

**重要：版本要求**
新建项目选择一个空目录，填入 AppID（使用云开发能力必须填写 AppID），勾选创建 “云开发 QuickStart 项目”，点击创建即可得到一个展示云开发基础能力的示例小程序。该小程序与普通 QuickStart 小程序有以下不同需注意：
1. 无游客模式、也不可以使用 测试号
2. project.config.json 中增加了字段 cloudfunctionRoot 用于指定存放云函数的目录
3. cloudfunctionRoot 指定的目录有特殊的图标
4. 云开发能力从基础库 2.2.3 开始支持
5. 在 app.json / game.json 中增加字段 "cloud": true


## 本云函数基于 [wx-tool](https://github.com/lxljl/wx-tool) 中的  cloudFn运行使用


成功返回格式
```
    {
        code: 0,
        data: result,
        info: '操作成功！'
    }

```

失败返回格式
```
    {
        code: 7154,
        data: [],
        info: '失败原因！'
    }

```


## API

* login --- [微信登录](https://github.com/lxljl/cloudFns/blob/master/doc/login.md)
* getUserInfo --- [获取用户信息](https://github.com/lxljl/cloudFns/blob/master/doc/getUserInfo.md)
* setUserInfo --- [设置用户信息](https://github.com/lxljl/cloudFns/blob/master/doc/setUserInfo.md)
* decode --- [微信用户信息解密](https://github.com/lxljl/cloudFns/blob/master/doc/decode.md)
* sendSms --- [发送手机短信验证码](https://github.com/lxljl/cloudFns/blob/master/doc/sendSms.md)
* getPay --- [微信支付模板](https://github.com/lxljl/cloudFns/blob/master/doc/getPay.md)
* getWXACodeUnlimit --- [微信一维码](https://github.com/lxljl/cloudFns/blob/master/doc/getWXACodeUnlimit.md)
* setToken --- [微信access_token](https://github.com/lxljl/cloudFns/blob/master/doc/setToken.md)
* sendMsg --- [发送模板消息](https://github.com/lxljl/cloudFns/blob/master/doc/sendMsg.md)
* getQRcode --- [生成二维码](https://github.com/lxljl/cloudFns/blob/master/doc/getQRcode.md)
* translation --- [百度翻译](https://github.com/lxljl/cloudFns/blob/master/doc/translation.md)
* getlist --- [查询列表模板](https://github.com/lxljl/cloudFns/blob/master/doc/getlist.md)
* setPix --- [上传图片并写入数据模板](https://github.com/lxljl/cloudFns/blob/master/doc/setPix.md)
* getBaiKeCrawler --- [百度百科植物类](https://github.com/lxljl/cloudFns/blob/master/doc/getBaiKeCrawler.md)