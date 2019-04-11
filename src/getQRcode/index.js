// 云函数入口文件
const QRCode = require('qrcode')

// 云函数入口函数
/**
 * 生成二维码
 */
exports.main = async(event, context) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!event.text) throw {code: 7407, data: [], info: '失败,请稍后重试！'}
            let options = {
                // 二维码宽度
                width: event.width || 400,
                // 二维码高度
                height: event.height || 400,
                // 二维码 比例
                scale: event.scale || 4,
                // 二维码 边框宽度
                margin: event.margin || 4,
                // 线条颜色
                color: {
                    dark: event.colorDark || '#000000ff',
                    light: event.colorLight || '#ffffffff'
                }
            }
            // 返回base64
            let result = await QRCode.toDataURL(event.text, options)
            resolve({
                code: 0,
                data: result,
                info: '操作成功！'
            })
        } catch (error) {
            console.log(error)
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}