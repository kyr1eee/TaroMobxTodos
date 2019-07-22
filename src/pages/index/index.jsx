import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Header from '../../components/Header';
import TodoList from '../../components/TodoList';
import Footer from '../../components/Footer';
import TodoItem from '../../components/TodoItem';
import './index.scss'


@inject('counterStore')
@inject('todoStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  render () {
    const { counterStore: { counter } } = this.props
    const { todoStore: { currentTodos } } = this.props
    return (
      <View className='index'>
        {/* <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button> */}
        <Text>{counter}</Text>
        <Header />
        <TodoList currentTodos={currentTodos}/>
        <Footer />
        <TodoItem />
      </View>
    )
  }
}

export default Index
