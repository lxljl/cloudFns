## 生成普通二维码


#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
| text  | string |        | 是 | 文字字符串 |
| width  | number |   400     | 否 | 宽度 |
| height  | number |   400     | 否 | 高度 |
| margin  | number |    4    | 否 | 页边的空白 |
| scale  | number |     4   | 否 | 粒子大小 |

#### 3.使用

```
    // 返回Promise
    cloudFn('getQRcode', {
        text: '123132',
        width: 400,
        height: 400,
        margin: 1,
        scale: 1
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async test(){
        try {
            let result = await cloudFn('getQRcode', {
                text: '123132',
                width: 400,
                height: 400,
                margin: 1,
                scale: 1
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

```