// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'sea-pix'
})

// 云函数入口函数
/**
 * 上传pix
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
            if(!event.image) throw {code: 7322, data: [],info: '图片不能为空！'}
            if(!event.image_type) throw {code: 7323, data: [],info: '图片类型不能为空！'}
            if(!event.pid) throw {code: 7323, data: [],info: '父类不能为空！'}
            let imageType = event.image_type || 'base64',
                image = new Buffer(event.image, imageType)
            // 正确后图片上传云端 
            let {
                fileID
            } = await cloud.uploadFile({
                cloudPath: `pix/${OPENID}-${Number(new Date())}.jpg`,
                fileContent: image,
            })
            // 新增数据
            let {
                _id
            } = await db.collection('pix').add({
                data:{
                    file_id: fileID,
                    pid: event.pid,
                    openid: OPENID,
                    created_at: db.serverDate(),
                    is_open: 1
                }
            })
            resolve({
                code: 0,
                data: {
                    id: _id,
                },
                info: '操作成功！'
            })
        } catch (error) {
            console.log(error)
            if(!error.code) reject(error)
            resolve(error)
        }
    })
}
