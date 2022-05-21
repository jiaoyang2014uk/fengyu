import {info, error} from '../../src/common/logger';

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
function uploadByFtp (file: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
}
function uploadBySftp (file: string[], cb: (ret: boolean) => void): void {
    cb(true)
}
function uploadByHttp (file: string): boolean {
    return true
}

/**
 * txt 上传到 ftp
 * @param {string} file 文件名
 * @returns {Promise<boolean>} 结果是否成功
 */
export function uploadTxt (file: string) : Promise<boolean> {
    return uploadByFtp(file).then(res=>{
        info(`[uploadTxt]: upload ${file} by ftp success`)
        return res;
    }).catch(res=>{
        error(  `[uploadTxt]: upload ${file} by ftp error`, 'Please try again')
        return res;
    })
}

/**
 * exe 上传到 sftp
 * @param {string} file 文件名
 * @returns {Promise<boolean>} 结果是否成功
 */
export function uploadExe (file: string): Promise<boolean> {
    return new Promise((resolve, reject)=>{
        uploadBySftp([file], ret=>{
            if(ret){
                info(`[uploadExe]: upload ${file} by sftp success`)
                resolve(true)
            } else{
                error(  `[uploadExe]: upload ${file} by sftp error`, 'Please try again')
                reject()
            }
        })
    })
}

/**
 * doc 上传到 http
 * @param {string} file 文件名
 * @returns {Promise<boolean>} 结果是否成功
 */
export function uploadDoc (file: string): Promise<boolean> {
    if(uploadByHttp(file))  {
        info(`[uploadDoc]: upload ${file} by http success`)
        return Promise.resolve(true)
    }
    error(  `[uploadDoc]: upload ${file} by http error`, 'Please try again')
    return Promise.resolve(false)
}




