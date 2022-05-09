/**
 * 日志
 */

// 堆栈追踪日志
export function trace(...args: unknown[]) {
    console.trace(getLogInfo(), ...args);
}

// 信息日志
export function info(...args: unknown[]) {
    console.info(getLogInfo(), ...args);
}

// 生成日志头信息
function getLogInfo() {
    const date = new Date();
    return `[${date.toLocaleDateString()}-${date.toLocaleTimeString()}]: `;
}
