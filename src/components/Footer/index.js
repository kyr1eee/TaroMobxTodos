import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { inject } from '@tarojs/mobx';

@inject('todoStore')
class Footer extends Component {

  onClick(type) {
    const { todoStore } = this.props;
    const currentTodos = this.getCurrentTodo(type, todoStore);
    console.log('current',currentTodos);
    todoStore.setCurrentTodos(currentTodos);
  }

  getCurrentTodo(type, todoStore) {
      switch(type) {
        case 'ALL': 
          return todoStore.todos.slice();
        case "COMPLETED":
          return todoStore.completedTodos.slice();
        case "UNCOMPLETED":
          return todoStore.unCompletedTodos.slice();
        default :
          return todoStore.todos.slice();
      }
  }

  test() {
    console.log('test:', this.props.todoStore.todos)
  }

  showAll(todoStore) {
    const currentTodos = todoStore.todos.slice();
    todoStore.setCurrentTodos(currentTodos);
  }

  showCompleted(todoStore) {
    const currentTodos = todoStore.completedTodos.slice();
    todoStore.setCurrentTodos(currentTodos);
  }

  showUnCompleted(todoStore) {
    const currentTodos = todoStore.unCompletedTodos.slice();
    todoStore.setCurrentTodos(currentTodos);
  }

  render() {
    const { todoStore } = this.props;
    return (
      <View>
        <Button onClick={() => this.showAll(todoStore)}>所有</Button>
        <Button onClick={() => this.showUnCompleted(todoStore)}>未完成</Button>
        <Button onClick={() => this.showCompleted(todoStore)}>已完成</Button>
      </View>
    )
  }
}

export default Footer;
