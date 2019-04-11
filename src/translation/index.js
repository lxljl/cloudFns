const rq = require('request-promise')
const crypto = require('crypto')

// 云函数入口函数
/**
 * 翻译
 */
exports.main = async(event, context) => {
    // 报错尽早抛出
    if(!event.query) throw {code: 7408, data: [], info: '查询值不能为空！'}
    let appid = 'xxxxxx',  // 你的百度翻译appid
        key = 'xxxxx',   // 你的百度翻译key
        q = event.query,
        from = event.from || 'auto', //zh中文,en英语,yue粤语,jp日语,kor韩语,cht繁体中文
        to = event.to || 'zh',
        salt = (new Date).getTime(),
        str = appid + q + salt + key,
        sign = crypto.createHash('md5').update(str).digest("hex"),
        url = `https://api.fanyi.baidu.com/api/trans/vip/translate`
    
    return new Promise(async(resolve, reject) => {
        try {
            let data = await rq({
                method: 'POST',
                url,
                form: {
                    q,
                    appid,
                    salt,
                    from,
                    to,
                    sign
                },
                json: true
            })
            resolve({
                code: 0,
                data,
                info: '操作成功！'
            })
        } catch (error) {
            console.log(error)
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}