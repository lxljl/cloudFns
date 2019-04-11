## 微信登录

此前先调用wx.login 获取code

#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  code  | string  |        | 是 | 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 [auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/auth.code2Session.html)，使用 code 换取 openid 和 session_key 等信息 |

#### 3.使用

```
    // 获取微信code
    wx.login({
        success(res) {
            const code = res.code
        }
    })


    // 返回Promise
    cloudFn('login', {
        code
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async login(){
        try {
            let {
                data
            } = await cloudFn('login',{
                code
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

```