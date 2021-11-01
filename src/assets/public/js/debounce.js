const debounce = (func, time, isDebounce, ctx) => {
    var timer, lastCall, rtn;
    if (isDebounce) {//防抖函数
        rtn = (...params) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(ctx, params);
            }, time);
        };
    } else {//节流函数
        rtn = (...params) => {
            const now = new Date().getTime();
            if (now - lastCall < time && lastCall) return;
            lastCall = now;
            func.apply(ctx, params);
        };
    }
    return rtn;
};

export default {
    name: 'Debounce',
    abstract: true,
    props: {
        time: {
            type: Number,
            default: 1000,//时间，如果未传，则默认800毫秒
        },
        events: {
            type: String,
            default: 'click',
        },
        isDebounce: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.eventKeys = this.events.split(',');
        this.originMap = {};
        this.debouncedMap = {};
    },
    render() {
        const vnode = this.$slots.default[0];
        this.eventKeys.forEach(key => {
            const target = vnode.data.on[key];
            if (target === this.originMap[key] && this.debouncedMap[key]) {
                vnode.data.on[key] = this.debouncedMap[key];
            } else if (target) {
                this.originMap[key] = target;
                this.debouncedMap[key] = debounce(
                    target,
                    this.time,
                    this.isDebounce,
                    vnode
                );
                vnode.data.on[key] = this.debouncedMap[key];
            }
        });
        return vnode;
    },
};

/****
 * 页面使用 
 *  isDebounce 防抖； 点击的时候不会执行，会等到时间节点到了之后才会执行
 *  !isDebounce 节流;采用节流方法会在点击的时候执行一次，然后下次点击必须是时间过了之后执行一次。
 *  <Debounce :time='1000' isDebounce>
        <button  @click='fdClick'>btn</button>
    </Debounce>
 */

