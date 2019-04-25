## 发送手机短信验证码

按需求自行修改函数内容

#### 1.[前往阿里云申请短信服务](https://www.aliyun.com/product/sms)

* 1.短信服务 > 国内消息 > 添加签名

![image](https://raw.githubusercontent.com/lxljl/cloudFns/master/doc/image/sms_1.png)

* 1.短信服务 > 国内消息 > 添加模板

![image](https://raw.githubusercontent.com/lxljl/cloudFns/master/doc/image/sms_2.png)


#### 2.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

* sendSms 文件内采用新版sdk写法
* sendOldSms 文件内采用旧版sdk写法
* 该使用哪个请自行选择

#### 3.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  phone  | string  |        | 是 | 国内手机号码 |

#### 4.使用

```


    // 返回Promise
    cloudFn('sendSms', {
        phone
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async sendSms(){
        try {
            let {
                data
            } = await cloudFn('sendSms',{
                phone
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    // 当然 你也可以使用原生调用
    wx.cloud.callFunction({
        name: 'sendSms',
        data: {
            phone
        }
    }).then(res => {
        console.log(res)
    })

    async sendSms(){
        try {
            let {
                data
            } = await wx.cloud.callFunction({
                name: 'sendSms',
                data: {
                    phone
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    

```