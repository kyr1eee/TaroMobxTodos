import { View, Form, Input, Button } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { inject, observer } from '@tarojs/mobx';
import { throttle } from '../../utils';
import './index.scss';
@inject('todoStore')
@observer
class Header extends Component {
    startX = 0;
    startY = 0;
    nextX = 0;
    nextY = 0;
    lastX = 0;
    lastY = 0;

    constructor(props) {
      super(props);
      this.textInput = null;
      this.dragBox = null;
    }

    onStart(e) {
        e.stopPropagation();
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        console.log('X: ',this.startX);
        console.log('Y: ', this.startY);
    }

    onMove(e) {
        console.log(this.dragBox)
        // 深层次获取vnode.dom的style属性
        const { vnode: { dom: { style } } } = this.dragBox; 
        this.nextX = e.touches[0].clientX;
        this.nextY = e.touches[0].clientY;
        console.log('x:',this.nextX - this.startX,'y:',this.nextY - this.startY)
        style.transform = `translate(${this.lastX + this.nextX - this.startX}px, ${this.lastY + this.nextY - this.startY}px)`;
    }

    onEnd(e) {
        const { vnode: { dom: { style } } } = this.dragBox; 
        style.left = `${this.nextX}px`;
        style.top = `${this.nextY}px`
        this.lastX = this.nextX;
        this.lastY = this.nextY;
        console.log('end_x',this.lastX ,'end_y',this.lastY = this.nextY);
    }
    
    test() {
        console.log('test');
    }

    render() {
        const { todoStore } = this.props;
        const onMove = (e) => throttle(this.onMove(e), 1000)();
        const onStart = (e) => throttle(this.onStart(e), 1000)();
        const onEnd = (e) => throttle(this.onEnd(e), 10000);
        return (
            <View className="header-container">
                <View className="header-title">
                    <img className="header-img" src="https://pinduoduoimg.yangkeduo.com/ranch/dialog_big_bowl.png" />
                    <View 
                        className="drag-box"
                        ref={ele => this.dragBox = ele}
                        onTouchStart={(e) => throttle(this.onStart(e), 1000)}
                        onTouchMove={(e) => throttle(this.onMove(e), 1000)}
                        onTouchEnd={(e) => throttle(this.onEnd(e), 1000)}
                    >
                        <img className="header-animal" src="https://pinduoduoimg.yangkeduo.com/ranch/hungry_cow.png" />
                    </View>
                </View>
                <Form onSubmit={e => {
                    e.preventDefault();
                    if(!this.textInput)
                        return
                    // taro Input組件之坑
                    const { value } = this.textInput.inputRef;
                    todoStore.addTodo(value);
                    console.log(this.textInput)
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
