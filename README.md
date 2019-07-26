# TaroMobxTodos
Taro + Mobx 的 todos 应用

# mobx
![流程图](https://github.com/kyr1eee/TaroMobxTodos/blob/master/src/mobx.png)
## @observal  
可观察变量
```
import { decorate, observable } from "mobx"

class Todo {
    id = Math.random()
    title = ""
    finished = false
}
decorate(Todo, {
    title: observable,
    finished: observable
})
```
## @computed  
计算属性, 只有依赖改变时, computed值才改变, 同vue
```
class TodoList {
    @observable todos = []
    @computed
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length
    }
}
```
## Reactions  
不生成新的值, 会产生副作用, 如打印数据到控制台, 网络请求, 逐步更新render tree来修补dom. Reactions是响应式与命令式编程的桥梁
### @observer  
将react组建转变为响应式组件, 如果是class组件, 该组件的props和state都将转化为observable. mobx.autorun 包装了组件的 render 函数以确保任何组件渲染render中使用的数据变化时都可以强制刷新组件
```
@observer
class TodoListView extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(todo => (
                        <TodoView todo={todo} key={todo.id} />
                    ))}
                </ul>
                Tasks left: {this.props.todoList.unfinishedTodoCount}
            </div>
        )
    }
}
```
### 自定义 Reactions  
#### autorun  
observal变量变化时,自动执行
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
#### when  
第一个函数返回true, 才执行第二个函数
```
class MyResource {
    constructor() {
        when(
            // 一旦...
            () => !this.isVisible,
            // ... 然后
            () => this.dispose()
        );
    }

    @computed get isVisible() {
        // 标识此项是否可见
    }

    dispose() {
        // 清理
    }
}
```
#### reaction  
语法糖,computed(expression).observe(action(sideEffect)) | autorun(() => action(sideEffect)(expression)), autorun 的变种，对于如何追踪 observable 赋予了更细粒度的控制。 它接收两个函数参数，第一个(数据 函数)是用来追踪并返回数据作为第二个函数(效果 函数)的输入。
```
const reaction2 = reaction(
    () => todos.map(todo => todo.title),
    titles => console.log("reaction 2:", titles.join(", "))
);
```

## @action  
改变observal变量
## @action.bound  
绑定action中的this

## @inject  
注入store进入组件props, provider包括组件, 像react context一样传递store
```
@inject("color")
@observer
class Button extends React.Component {
    render() {
        return <button style={{ background: this.props.color }}>{this.props.children}</button>
    }
}

class Message extends React.Component {
    render() {
        return (
            <div>
                {this.props.text} <Button>Delete</Button>
            </div>
        )
    }
}

class MessageList extends React.Component {
    render() {
        const children = this.props.messages.map(message => <Message text={message.text} />)
        return (
            <Provider color="red">
                <div>{children}</div>
            </Provider>
        )
    }
}
```

# 小程序
