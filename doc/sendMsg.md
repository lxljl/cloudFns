## 发送模板消息

按需求自行修改函数内容

#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）


#### 2.使用

```

    // 返回Promise
    cloudFn('sendMsg',{
        formId: e.detail.formId,
        name: '30元',
        amount: '30',
        payAmount: '￥30'
    }).then((res)=>{
        console.log(res)
    })


    // 也可以使用 async/await
    async test(){
        try {
            let result = cloudFn('sendMsg',{
                formId: e.detail.formId,
                name: '30元',
                amount: '30',
                payAmount: '￥30'
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

```