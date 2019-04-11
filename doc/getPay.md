## 微信支付


#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  total_fee  | number  |        | 是 | 标价金额  订单总金额，单位为分 |
|  body  | string  |        | 是 | 商品描述  128字节  例如:腾讯充值中心-QQ会员充值 |
| attach  | string |        | 是 | 附加数据 例如:深圳分店|

#### 3.使用

```

    // 返回Promise
    cloudFn('getPay', {
        total_fee,
        body,
        attach
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async test(){
        try {
            let result = await cloudFn('getPay', {
                total_fee,
                body,
                attach
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    返回格式 
    {
        appid: 'xxxxxxxxxxxxxxx',
        nonce_str: 'xxxxxxxxxxxxxxx',
        timeStamp: 'xxxxxxxxxxxxxxx',
        prepay_id: 'xxxxxxxxxxxxxxx',
        paySign: 'xxxxxxxxxxxxxxx',
        signType: 'MD5'
    }

```

