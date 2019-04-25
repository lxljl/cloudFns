// 云函数入口文件
const cloud = require('wx-server-sdk')
const Core = require('@alicloud/pop-core');

const accessKeyId = 'xxx' // 你的appid
const accessKeySecret = 'xxx' // 你的secret
const SignName = 'xxx' // 你的签名 
const TemplateCode = 'xxx' // 你的模版CODE 

var client = new Core({
  accessKeyId,
  accessKeySecret,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})


let params = {
    SignNameJson: JSON.stringify([SignName]),
    TemplateCode: TemplateCode,
}

cloud.init({
    env: 'xxx' // 你的环境id
})


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
            if(!event.phone) throw {code: 7322, data: [],info: '手机不能为空！'}
            if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(event.phone)) throw {code: 7321, data: [],info: '手机号码格式错误！'}
            // 获取数据
            let {
                data
            } = await db.collection('sms-record').where({
                phone: event.phone,
                openid: OPENID,
                is_used: 1
            }).orderBy('created_at', 'desc').skip(0).limit(1).get(),
            code = null
            // 计算时间
            if(data.length != 0 && (Number(new Date()) - Number(new Date(data[0].created_at))) < 60000) {
                throw {code: 7323, data: [],info: '一分钟内，不能重复发送！'}
            } else if(data.length != 0 && (Number(new Date()) - Number(new Date(data[0].created_at))) < 1800000){
                code = data[0].code
            } else {
                // 生成六位随机数
                code = Math.floor(Math.random() * 900000) + 100000
            }
            //发送短信 
            let {
                Code
            } = await client.request('SendBatchSms', Object.assign({
                PhoneNumberJson: JSON.stringify([event.phone]),
                TemplateParamJson: JSON.stringify([{code}])
            },params), {
                method: 'POST'
            })
            if(Code !== 'OK') throw {code: 7321, data: [],info: '发送短信失败！'}
            // 新增数据
            await db.collection('sms-record').add({
                data: {
                    phone: event.phone,
                    code,
                    openid: OPENID,
                    is_used: 1,
                    created_at: db.serverDate()
                }
            })
            resolve({
                code: 0,
                data: [],
                info: '操作成功！'
            })
        } catch (error) {
            console.log(error)
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}