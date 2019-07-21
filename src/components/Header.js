import { View, Form, Input, Button } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { inject, observer } from '@tarojs/mobx';
@inject('todoStore')
@observer
class Header extends Component {
    constructor(props) {
      super(props);
      this.textInput = null;
    }

    render() {
        const { todoStore } = this.props;
        return (
            <View>
                <Form onSubmit={e => {
                    e.preventDefault();
                    if(!this.textInput)
                        return
                    // taro Input組件之坑
                    const { value } = this.textInput.inputRef;
                    console.log(this.textInput);
                    todoStore.addTodo(value);
                    this.textInput.inputRef.value = '';
                }}>
                    <Input type="text" ref={element => this.textInput = element} />
                    <Button type="primary">
                        添加计划事项
                    </Button>
                </Form>
            </View>
        )
    }
}

export default Header;
