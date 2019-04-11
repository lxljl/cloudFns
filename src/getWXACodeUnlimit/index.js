// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise')

cloud.init({
    env: 'sea-ai'
})

// 云函数入口函数
/**
 * 获取小程序一维码
 */
exports.main = async(event, context) => {
    const db = cloud.database()
    return new Promise(async (resolve, reject) => {
        try {
            if(!event.scene) throw {code: 7400, data: [], info: '场景信息不能为空！'}
            // 获取小程序token
            let {
                data:{
                    access_token
                }
            } = await db.collection('token').doc('token').get()
            // 一维码信息
            let scene = event.scene,
                page = event.page,
                width = event.width || 430,
                auto_color = event.auto_color || false,
                line_color = event.line_color || {"r":0,"g":0,"b":0},
                is_hyaline = event.is_hyaline || false
            // 请求微信获取图像
            let result = await rq({
                method: 'POST',
                url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
                body: {
                    scene,
                    width,
                    page,
                    auto_color,
                    line_color,
                    is_hyaline
                },
                encoding: null,
                json: true
            })
            // 成功返回
            resolve({
                code: 0,
                data: `data:image/jpg;base64,${new Buffer(result).toString('base64')}`,
                info: '操作成功！'
            })
        } catch (error) {
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}
