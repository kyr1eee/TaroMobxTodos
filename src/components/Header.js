import { View, Form, Input, Button } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { inject, observer } from '@tarojs/mobx';
@inject('todoStore')
@observer
class Header extends Component {

    render() {
        let textInput = '';

        return (
            <View>
                <Form onSubmit={e => {
                    e.preventDefault();
                    if(!textInput)
                        return
                    todoStore.addTodo(textInput.trim());
                    textInput.value = '';
                }}>
                    <Input ref={element => textInput = element} />
                    <Button type="submit">
                        Add Todo
                    </Button>
                </Form>
            </View>
        )
    }
}

export default Header;