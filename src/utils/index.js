// 函数节流
export function throttle(callback, delay) {
    let lastTime = 0;
    return function() {
        let context = this;
        let args = arguments;
        let nowTime = +new Date();
        if(nowTime - lastTime >= delay|| !lastTime) {
            console.log('执行');
            callback.apply(context, args);
            lastTime = nowTime;
        }
    }
}