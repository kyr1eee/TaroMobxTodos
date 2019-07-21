import store from '../store/todoStore';
import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { inject, observer } from '@tarojs/mobx';
@inject('todoStore')
@observer
class TodoList extends Component {
    render() {
        const List = todoStore.todos.map(item => {
            <View>{ item.todo }</View>
        });
    
        return (
            <List />
        );
    }
}



export default TodoList;