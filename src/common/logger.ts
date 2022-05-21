/**
 * 根据环境不同设置日志级别
 * 使用方法：
 * 设置级别：setLogLevel(levelTypeName)，由高到低分别为：trace，debug，info，warn，error， none
 * 调用日志方法：log(levelTypeName, ...args)或者形如trace(...args)
 */
const isDev = process.env.NODE_ENV === 'development';

export enum LEVEL_TYPE {
    trace = 'trace',
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
    none = 'none',
}

const levels: Record<string, string[]> = {
    [LEVEL_TYPE.trace]: [LEVEL_TYPE.trace, LEVEL_TYPE.debug, LEVEL_TYPE.info, LEVEL_TYPE.warn, LEVEL_TYPE.error],
    [LEVEL_TYPE.debug]: [LEVEL_TYPE.debug, LEVEL_TYPE.info, LEVEL_TYPE.warn, LEVEL_TYPE.error],
    [LEVEL_TYPE.info]: [LEVEL_TYPE.info, LEVEL_TYPE.warn, LEVEL_TYPE.error],
    [LEVEL_TYPE.warn]: [LEVEL_TYPE.warn, LEVEL_TYPE.error],
    [LEVEL_TYPE.error]: [LEVEL_TYPE.error],
    [LEVEL_TYPE.none]: []
}

// 生成日志头信息
function getLogInfo() {
    const date = new Date();
    return `[${date.toLocaleDateString()}-${date.toLocaleTimeString()}]: `;
}

let openLevels: string[] = levels[LEVEL_TYPE.info]

function isOpen(levelType = LEVEL_TYPE.info) {
    return openLevels.includes(levelType)
}

export function log(levelType = LEVEL_TYPE.info, ...args: unknown[]) {
    if (!isOpen(levelType)) {
        return
    }
    const logInfo = getLogInfo()
    switch (levelType) {
        case "trace":
            console.trace(logInfo, ...args);
            break;
        case "debug":
            console.debug(logInfo, ...args);
            break;
        case "info":
            console.info(logInfo, ...args);
            break;
        case "warn":
            console.warn(logInfo, ...args);
            break;
        case "error":
            console.error(logInfo, ...args);
            break;
        default:
            console.info(logInfo, ...args);
            break;
    }
}

// 实时调试日志
export function trace(...args: unknown[]) {
    log(LEVEL_TYPE.trace, ...args)
}

// 调试日志
export function debug(...args: unknown[]) {
    log(LEVEL_TYPE.debug, ...args)
}

// 信息日志
export function info(...args: unknown[]) {
    log(LEVEL_TYPE.info, ...args)
}

// 告警日志
export function warn(...args: unknown[]) {
    log(LEVEL_TYPE.warn, ...args)
}

// 错误日志
export function error(...args: unknown[]) {
    log(LEVEL_TYPE.error, ...args)
}

export function setLogLevel(level = LEVEL_TYPE.info) {
    openLevels = levels[level] || []
}

if (isDev) {
    setLogLevel(LEVEL_TYPE.trace)
} else {
    setLogLevel(LEVEL_TYPE.info)
}
