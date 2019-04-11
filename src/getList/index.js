// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'sea-pix'
})

// 云函数入口函数
/**
 * 获取pix列表
 */
exports.main = async(event, context) => {
    const db = cloud.database()
    return new Promise(async(resolve, reject) => {
        try {
                // 当前条数
            let limit = event.limit || 15,
                // 当前页数
                page = event.page - 1|| 0
            
            if(!event.pid) throw {code: 7323, data: [],info: '父类不能为空！'}  // 自行修改
            // 获取数据
            let {
                data
            } = await db.collection('pix').where({
                pid: event.pid
            }).orderBy('created_at', 'desc').limit(limit).skip(page * limit).get()
            // 总数
            let {
                total
            } = await db.collection('pix').where({
                pid: event.pid
            }).count()
            // 数据返回
            resolve({
                code: 0,
                data: {
                    list: data,
                    current_page: page + 1,
                    last_page: Math.ceil(total / limit),
                    limit,
                    total,
                },
                info: '操作成功！'
            })
        } catch (error) {
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}