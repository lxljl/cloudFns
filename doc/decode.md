## 微信用户信息解密

encryptedData,iv  
微信运动, 手机解密, 用户信息解密, 都可以使用此函数

#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  encryptedData  | string  |        | 是 | 包括敏感数据在内的完整用户信息的加密数据，详见 [用户数据的签名验证和加解密](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95) |
| iv  | string |        | 是 | 加密算法的初始向量，详见 [用户数据的签名验证和加解密](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)    |

#### 3.使用

```
    // 微信运动
    wx.getWeRunData({
        success(res) {
            const encryptedData = res.encryptedData
            const iv = res.iv
        }
    })


    // 返回Promise
    cloudFn('decode', {
        encryptedData,
        iv,
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async test(){
        try {
            let result = await cloudFn('decode', {
                encryptedData,
                iv,
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

```