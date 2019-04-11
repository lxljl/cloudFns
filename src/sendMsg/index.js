// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'xxxxxx'  // 你的环境id
})

// 格式化时间
function getTime(time) {
    let date = new Date(time),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds()
    m >= 1 && m <= 9 ? m = `0${m}` : ''
    d >= 0 && d <= 9 ? d = `0${d}` : ''
    hh >= 0 && hh <= 9 ? hh = `0${hh}` : ''
    mm >= 0 && mm <= 9 ? mm = `0${mm}` : ''
    // ss >= 0 && ss <= 9 ? ss = `0${ss}` : ''
    // return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
    return `${y}-${m}-${d}  ${hh}:${mm}`
}


// 云函数入口函数
/**
 * 发送模板消息
 */
exports.main = async(event, context) => {
    let {
        OPENID,
        APPID,
        UNIONID
    } = cloud.getWXContext()
    const db = cloud.database()
    return new Promise(async(resolve, reject) => {
        try {
            if(!event.formId) throw {code: 7406, data: [], info: 'formId不能为空！'}
            let page = event.page || '',
                touser = OPENID,
                formId = event.formId,
                name = event.name,
                amount = event.amount,
                payAmount = event.payAmount,
                templateId = 'xxxxxxx', // 模板id
                date = getTime(new Date().getTime() + 28800 * 1000) // 因服务器是格林时间 所以要加8小时
            // 发送模板消息
            const result = await cloud.openapi.templateMessage.send({
                touser, 
                page,
                data: {
                    keyword1: {
                        value: name
                    },
                    keyword2: {
                        value: amount
                    },
                    keyword3: {
                        value: payAmount
                    },
                    keyword4: {
                        value: date
                    }
                },
                templateId,
                formId,
                emphasisKeyword: 'keyword1.DATA'
            })
            resolve({
                code: 0,
                data: result,
                info: '操作成功！'
            })
            // result 结构
            // { errCode: 0, errMsg: 'openapi.templateMessage.send:ok' }
        } catch (error) {
            console.log(error)
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}