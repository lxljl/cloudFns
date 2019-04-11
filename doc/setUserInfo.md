## 设置用户信息

默认[登录](https://github.com/lxljl/cloudFns/blob/master/doc/login.md)会调用一次

#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  avatar  | string  |        | 否 | 头像 |
| city  | string |        | 否 |  城市 |
| is_enabled  | string |        | 否 | 是否启用  |
| mobile  | string |        | 否 |  手机 |
| nickname  | string |        | 否 |  昵称 |
| password  | string |        | 否 |  密码 |
| province  | string |        | 否 | 省份  |
| country  | string |        | 否 | 国家  |
| session_key  | string |        | 否 | 登录状态  |
| sex  | string |        | 否 | 性别  |
| status  | string |        | 否 |  状态 |
| username  | string |        | 否 | 名字  |
| wx_avatar  | string |        | 否 | 微信头像  |
| wx_openid  | string |        | 否 | 微信openid  |

#### 3.使用

```


    // 返回Promise
    cloudFn('setUserInfo', {
        city: '广州'
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async test(){
        try {
            let result = await cloudFn('setUserInfo', {
                city: '广州'
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

```