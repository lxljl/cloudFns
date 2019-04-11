## 获取用户信息

此前需数据库已有用户信息

#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  openid  | string  |        | 否 | 默认调取当前用户, 假如传入openid ，那么查找对应用户信息|

#### 3.使用

```

    // 返回Promise
    cloudFn('getUserInfo', {
        openid: '123123'  // 传入查找对应用户信息
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async getUserInfo(){
        try {
            let result = await cloudFn('getUserInfo')   // 不传默认查找当前用户
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

```