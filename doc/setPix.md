## 上传图片并写入数据模板


#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  image  | string  |        | 是 | 图片 |
| image_type  | string |        | 是 | 图片类型 |

#### 3.使用

需配合使用[localEncoding](https://github.com/lxljl/wx-tool/blob/master/doc/localEncoding.md) 

```

    // 也可以使用 async/await
    async test(){
        try {
            let type = 'base64'
            let image = await localEncoding(tempFilePath, type)  // 将本地文件转base64
            let {
                id
            } = await cloudFn('setPix', {
                image,
                type
            })
            // 上传完成后 返回id
            console.log(id)
        } catch (error) {
            console.log(error)
        }
    }

```