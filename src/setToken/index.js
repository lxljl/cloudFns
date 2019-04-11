// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise')

cloud.init({
    env: 'sea-ai'
})

// 云函数入口函数
/**
 * 拉取微信access_token
 */
exports.main = async(event, context) => {
    const db = cloud.database()
    const APPID = 'xxxxxxxxxxxxxx' // 你的appid
    const secret = 'xxxxxxxxxxx'  // 你的secret
    const url_get_token = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${secret}`
    return new Promise(async(resolve, reject) => {
        try {
            let res = await rq({
                method: 'GET',
                uri: url_get_token,
                json: true
            })
            if (res.errcode) throw {code: 7405, data: [], info: '请求token失败！'}
            let cur_token = {
                access_token: res.access_token,
                expires_in: db.serverDate({
                    offset: res.expires_in
                })
            }
            await db.collection('token').doc('token').set({
                data: cur_token
            })
            resolve({
                code: 0,
                data: cur_token,
                info: '操作成功！'
            })
        } catch (error) {
            reject(error)
        }
    })
}