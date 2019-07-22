import { View, Button, Input } from '@tarojs/components'
import './index.scss'
function TodoItem(props) {
    return (
        <View className="container">
            <Button className="add-btn" plain={true} >+</Button>
            <View className="input-wrapper">
                <Input className="todo-input" type="text" />
                <View className="line">{null}</View>
            </View>
            
        </View>
    )
}

export default TodoItem;