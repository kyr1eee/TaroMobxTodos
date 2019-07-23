# TaroMobxTodos
Taro + Mobx 的 todos 应用

# mobx
- @observal : 观察变量
- @computed : 计算属性,依赖,同vue
- @action : 改变observal变量
- @inject : 注入store进入组件props, provider包括组件, 像react context一样传递store
- @observer : 响应式组件, 观察组件state, props是否变化, autorun包裹render函数, 变化则强制更新视图
- autorun : observal变量变化时,自动执行
- when : 第一个函数返回true, 才执行第二个函数
- reaction: 语法糖,computed(expression).observe(action(sideEffect)) | autorun(() => action(sideEffect)(expression))
```
class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }
}

// autorun
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'
```
# 小程序
