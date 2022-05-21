// 请使用优化以下代码：

// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。

// 实现如下
// function upload (files: string[]): Promise<boolean> {
//     return Promise.all(files.filter(file => {
//         const ext = file.match(/\.(\w+)$/)[1]
//         if (ext !== 'txt' && ext !== 'ext' && ext !== 'doc') {
//             return false
//         }
//         return true
//     }).map(file => {
//         const ext = file.match(/\.(\w+)$/)[1]
//         if (ext === 'txt') {
//             return uploadByFtp(file)
//         } else if (ext === 'exe') {
//             return new Promise((resolve, reject) => {
//                 uploadBySftp([file], ret => {
//                     if (ret) {
//                         resolve(true)
//                     } else {
//                         reject()
//                     }
//                 })
//             })
//         } else if (ext === 'doc') {
//             return Promise.resolve(uploadByHttp(file))
//         }
//     })).then(() => {
//         console.log('upload success.')
//         return true
//     })
// }

// 优化代码

import {uploadTxt, uploadExe, uploadDoc} from './api';
import {info, error, trace, warn, debug} from '../../src/common/logger';

const enum EXT_TYPE {
    txt = 'txt',
    exe = 'exe',
    doc = 'doc',
}

const uploadMap: Record<string, (file: string) => Promise<boolean>> = {
    [EXT_TYPE.txt]: uploadTxt,
    [EXT_TYPE.exe]: uploadExe,
    [EXT_TYPE.doc]: uploadDoc,
}

/**
 * 获取文件后缀名
 * @param {string} file 文件名
 * @returns {string} ext 文件后缀名
 */
function getExt(file: string): string {
    const ext = file.match(/\.(\w+)$/)?.[1]
    if (!ext) {
        warn('[getExt]: get ext warn, filename: ', file);
    }
    return ext || '';
}

/**
 * 校验文件后缀
 * @param {string} ext 文件后缀名
 * @returns {boolean} 文件后缀名是否校验通过
 */
function validateExt(ext: string): boolean {
    const isValid = Object.keys(uploadMap).includes(ext)
    if (isValid) {
        return true
    }
    warn(`[validateExt]: ext ${ext} is not valid.`, 'Please provide ext within " txt | exe | doc "');
    return false
}

/**
 * 过滤文件
 * @param {string[]} files 所有文件
 * @returns {string[]} 过滤后符合规则的文件
 */
function filterFiles(files: string[]): string[] {
    trace('[fileFilter]：filter files', files);
    const filteredFiles = files.filter(file => {
        const ext = getExt(file)
        if (validateExt(ext)) {
            return true
        }
        warn(   `[filterFiles]: file is not valid. filename: ${file}`, 'Please provide file with extension within " txt | exe | doc "');
        return false
    })
    if (!filteredFiles.length) {
        warn(`[filterFiles]: all files are not valid, files: ${files}`, 'Please provide file with extension within " txt | exe | doc "');
    }
    debug('[filterFiles]: filter files, result: ', filteredFiles)
    return filteredFiles;
}

/**
 * 上传文件
 * @param {string[]} ext 文件后缀名
 * @returns {Promise<boolean>} 文件是否上传成功
 */
export function upload(files: string[]): Promise<boolean> {
    trace('[upload]: receive files: ', files)
    const uploadPromises = filterFiles(files).map(file => {
        const ext = getExt(file)
        return uploadMap[ext](file);
    })
    info('[upload]: upload start')
    return Promise.all(uploadPromises).then(() => {
        info('[upload]: upload success')
        return true
    }).catch(() => {
        error('[upload]: upload error', 'Please try again')
        return false;
    });
}


