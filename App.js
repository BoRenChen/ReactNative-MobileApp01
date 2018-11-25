import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

// const Users = [
//   {id: "1", url: require('./assets/1.jpg'), desc: 'avc'},
//   {id: "2", url: require('./assets/2.jpg')},
//   {id: "3", url: require('./assets/3.jpg')},
//   {id: "4", url: require('./assets/4.jpg')},
//   {id: "5", url: require('./assets/5.jpg')},
// ]

const Users = [
  {id: "1", url: require('./assets/1.jpg'), title: '秋歌二十七首 - 之一  ', displayName: '陈东东', paragraph: '秋天暴雨后升起的亮星推迟黑暗\n玫瑰园内外，洗净的黄昏归妃子享用，\n被一个过路的吟唱者所爱。\n牛羊下来，谁还在奔走？\n隐晦的钟声仅仅让守时的僧侣听取。'},
  {id: "2", url: require('./assets/2.jpg'), title: '秘密是暗处的花朵', displayName: '赵丽华', paragraph: '秘密是暗处的花朵\n我说过∶没有秘密的事物是黯淡的\n但并不是说我由此就会变得很亮\n它开着，它开过\n当你千里迢迢、历经千难万险\n找到他，对不起宝贝，他缓缓地说∶\n太好了，原来这么好，都不象是真的！\n就枯萎了'},
  {id: "3", url: require('./assets/3.jpg'), title: '房 子', displayName: '丁当', paragraph: '你躲在房子里\n你躲在城市里\n你躲在冬天里\n你躲在自己的黄皮肤里\n你躲在吃得饱穿得暖的地方你在没有时间的地方\n你在不是地方的地方\n你就在命里注定的地方\n时候饥饿\n有时候困倦\n有时候无可奈何\n有时候默不作声'},
  {id: "4", url: require('./assets/4.jpg'), title: '小 诗', displayName: '王统照', paragraph: '多年的秋灯之前，\n一夕的温软之语，\n如今随著飞尘散去，\n不知那时的余音，\n又落在谁的心里？'},
  {id: "5", url: require('./assets/5.jpg'), title: '薛大明', displayName: '海子 骆一禾 戈麦', paragraph: '在文字录入比赛（打字比赛）中，最公平的比赛用文本就是随机文本，这个随机汉字生成器便是为此所作。普通人的汉字录入速度一般是每分钟几十个到一百多个，我们可以生成一两千字的随机汉字文本，让比赛者录入完这些汉字，依据他们的比赛用时和正确率判断名次。生成随机汉字的原始文字一般选择常用汉字，经过随机排列之后只能一个字一个字的输入，对参赛者来说是相对公平的方案。随机汉字生成'},
]


export default class App extends React.Component {

  constructor(){
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })
    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
    ]
    }
    this.likesOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikesOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
  }

  componentWillMount(){
    

    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder:(evt, gestrueState) => true,
      onPanResponderMove:(evt, gestrueState) => {
        
        this.position.setValue({x: gestrueState.dx, y:gestrueState.dy})
      },
      onPanResponderRelease:(evt, gestrueState) => {
        
        if(gestrueState.dx >120){ 
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestrueState.dy}
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex +1}, 
              () => {
                this.position.setValue({x:0, y:0})
              })

          })
        }
        else if(gestrueState.dx < -120){ 
          Animated.spring(this.position, {
            toValue: {x: - SCREEN_WIDTH - 100, y: gestrueState.dy}
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex +1}, 
              () => {
                this.position.setValue({x:0, y:0})
              })

          })
        }
        else {
          Animated.spring(this.position, {
            toValue: {x:0, y:0},
            friction: 4
          }).start()
        }
      }

    })
  }
  renderUsers = () =>{
    return Users.map((item, i) =>{
      if( i< this.state.currentIndex){
        return null
      }
      else if (i == this.state.currentIndex) {

        return(
          <Animated.View 
          {...this.PanResponder.panHandlers}
          key={item.id} style={[this.rotateAndTranslate
            ,{height: SCREEN_HEIGHT - 140, width: 
            SCREEN_WIDTH- 20, padding: 10, position:'absolute', borderRadius: 20, margin: 10}]}>
            <Animated.View style={{ opacity: this.likesOpacity, transform: [{rotate: '-30deg'}], 
            position: 'absolute', top:50, left:40, zIndex:1000}}>
              <Text style={{borderWidth: 1, borderColor: 'green', color:
            'green', fontSize: 32, fontWeight: '800', padding:10}}>LIKE</Text>
            </Animated.View>
            <Animated.View style={{ opacity: this.dislikesOpacity, transform: [{rotate: '30deg'}], 
            position: 'absolute', top:50, right:40, zIndex:1000}}>
              <Text style={{borderWidth: 1, borderColor: 'red', color:
            'red', fontSize: 32, fontWeight: '800', padding:10}}>NOPE</Text>
            </Animated.View>
            {/* <Image
              style={{flex: 1, height: null, width: null, resizeMode: 'cover',
            borderRadius: 20}}
              source={item.url} /> */}
              <Animated.View>
                <Text style={{fontSize: 30, padding: 5, paddingTop: 30}}>{item.title}</Text>
                <Text style={{fontSize: 20, padding: 8, paddingTop: 30, lineHeight: 31}}>
                {item.paragraph}
                </Text>
                <Text style={{fontSize: 28, padding: 10, paddingTop: 12, textAlign: 'right' }}>-{item.displayName}</Text>
                
              </Animated.View>
            </Animated.View>
        )

      } else {
        return(
          <Animated.View 
          key={item.id} style={[{opacity:this.nextCardOpacity, transform:[{scale: this.nextCardScale}],
          height: SCREEN_HEIGHT - 120, width: 
            SCREEN_WIDTH, padding: 10, position:'absolute'}]}>
            <Image
              style={{flex: 1, height: null, width: null, resizeMode: 'cover',
            borderRadius: 20}}
              source={item.url} />
            </Animated.View>
        )
      }
    }).reverse()
  }


  render() {
    return (
      <View style={{flex:1}}>
        <View style={{height:60}}>
        </View>

        <View style={{flex:1}}>
        {this.renderUsers()}
        
        </View>


        <View style={{height:60}}>
        <Text style={{position:"absolute" , right:20}}>© all rights reserve</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
