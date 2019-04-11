## 百度翻译


#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  query  | string  |        | 是 | 需翻译的字符串， 多个query可以用\n连接  如 query='apple\norange\nbanana\npear' |

更多细节请查看[百度翻译文档](http://fanyi-api.baidu.com/api/trans/product/apidoc)

#### 3.使用

```


    // 返回Promise
    cloudFn('translation', {
        query: 'apple'
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async test(){
        try {
            let result = await cloudFn('translation', {
                query: 'apple'
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

```