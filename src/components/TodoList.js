import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { inject, observer } from '@tarojs/mobx';

@inject('todoStore')
@observer
class TodoList extends Component {

    onClick(index) {
      const { todoStore } = this.props;
      todoStore.toggleTodo(index);  
    }

    render() {
      const { todoStore: { currentTodos } } = this.props;
      const newTodos = currentTodos.slice();
      const List = newTodos.map(item => (
          <View 
            key={item.id}
            onClick={() => this.onClick(item.id)}
            style={{textDecoration: item.completed ? 'line-through' : 'none'}}  
          >{ item.todo }</View>
      ));

      return (
          <View>
            <List />
          </View>
      );
    }
}



export default TodoList;
