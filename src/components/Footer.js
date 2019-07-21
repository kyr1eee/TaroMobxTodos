import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
class Footer extends Component {


  render() {

    return (
      <View>
        <Button>所有</Button>
        <Button>未完成</Button>
        <Button>已完成</Button>
      </View>
    )
  }
}

export default Footer;
