## 百度百科爬虫

本爬虫仅植物类查询, 如需其他请自行修改

#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  query  | string  |        | 是 | 百科关键字|

#### 3.使用

```

    // 返回Promise
    cloudFn('getBaiKeCrawler', {
        query: '风信子'
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async test(){
        try {
            let result = await cloudFn('getBaiKeCrawler', {
                query: '风信子'
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

```