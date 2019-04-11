## 查询列表模板

使用时 根据实际修改

#### 1.引入

复制对应文件夹到你的项目路径中，然后上传并部署：云端安装依赖（不上传node_modeles）

#### 2.参数

|  属性   | 类型    | 默认值 | 必填   | 说明            |
| :-------: | :------: | ------ | :--------: | :--------|
|  page  | string  |        | 是 | |
| iv  | string |        | 是 | |

#### 3.使用

```
    // 返回Promise

    
    
    // 也可以使用 async/await
    async getList(sign) {
        try {
            let {
                data: {
                    list,
                    last_page,
                    total
                }
            } = await cloudFn('getList', {
                page,
                limit
            })
            if (this.page == 1 && sign) {
                this.list = list
            } else {
                this.list = [...this.list, ...list]
            }
            this.count = total  // 总数
            this.maxPage = last_page  // 最后一页
        } catch (error) {
            console.log(error)
        } finally {
            // 失败成功都会执行
        }
    }

    // 上拉加载
    onReachBottom() {
        if (this.page == this.maxPage) {
            this.none = true
            // 没有了
        } else {
            this.page++
            this.getList()
        }
    }

    // 下拉刷新
    onPullDownRefresh() {
        this.page = 1
        this.none = false
        this.getList('PullDown')
    }

    // 第一次载入
    async onLoad() {
        try {
            this.getList('PullDown')
        } catch (error) {
            console.log(error)
        }
    }



```