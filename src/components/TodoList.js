import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { inject, observer } from '@tarojs/mobx';

@inject('todoStore')
@observer
class TodoList extends Component {
    render() {
      const { todoStore: { todos } } = this.props;
      const newTodos = todos.slice();
      console.log('new:',newTodos,'old',todos);
      const List = newTodos.map(item => (
          <View key={item.id}>{ item.todo }</View>
      ));

      return (
          <View>
            <List />
          </View>
      );
    }
}



export default TodoList;
