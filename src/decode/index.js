// 云函数入口文件
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({
    env: 'sea-ai' // 修改为你的环境id
})

// 云函数入口函数
/**
 * 解密微信
 */
exports.main = async(event, context) => {
    // 获取当前操作信息
    let {
        OPENID,
        APPID,
        UNIONID
    } = cloud.getWXContext()
    const db = cloud.database()
    return new Promise(async(resolve, reject) => {
        // 查找对应用户的session_key
        let {
            data
        } = await db.collection('user').where({
            openid: OPENID
        }).get()
        if(data.length == 0) throw {code: 7501, data: [], info: '用户不存在！'}
        // 格式化用户加密信息
        let sessionKey = new Buffer(data[0].session_key, 'base64'),
            encryptedData = new Buffer(event.encryptedData, 'base64'),
            iv = new Buffer(event.iv, 'base64')
        try {
            // 解密
            var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true)
            var decoded = decipher.update(encryptedData, 'binary', 'utf8')
            decoded += decipher.final('utf8')
            decoded = JSON.parse(decoded)
            // 假如解密出来的appid 和当前appid 不一致， 抛出错误
            if (decoded.watermark.appid !== APPID) {
                throw {code: 7500, data: [], info: 'Illegal Buffer'}
            }
            // 成功返回数据
            resolve({
                code: 0,
                data: decoded,
                info: '操作成功!'
            })
        } catch (err) {
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}
