// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'xxxxxx'  // 你的环境id
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
            // 一维码信息
            let scene = event.scene,
                page = event.page,
                width = event.width || 430,
                auto_color = event.auto_color || false,
                line_color = event.line_color || {"r":0,"g":0,"b":0},
                is_hyaline = event.is_hyaline || false
            // 请求微信获取图像
            let {
                buffer,
                errcode,
                contentType
            } = await cloud.openapi.wxacode.getUnlimited({
                scene,
                width,
                page,
                auto_color,
                line_color,
                is_hyaline
            })
            // 成功返回以下格式
            // {
            //     "errcode": 0,
            //     "errmsg": "ok",
            //     "contentType": "image/jpeg",
            //     "buffer": Buffer
            // }
            if(errcode !== 0) throw {code: 7408, data: [], info: '调用失败！'}
            // 成功返回
            resolve({
                code: 0,
                data: {
                    url: `data:image/jpg;base64,${new Buffer(buffer).toString('base64')}`,
                    contentType
                },
                info: '操作成功！'
            })
        } catch (error) {
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}
