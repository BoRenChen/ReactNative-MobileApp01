import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const Users = [
  {id: "1", url: require('./assets/1.jpg'), desc: 'avc'},
  {id: "2", url: require('./assets/2.jpg')},
  {id: "3", url: require('./assets/3.jpg')},
  {id: "4", url: require('./assets/4.jpg')},
  {id: "5", url: require('./assets/5.jpg')},
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
            ,{height: SCREEN_HEIGHT - 120, width: 
            SCREEN_WIDTH, padding: 10, position:'absolute'}]}>
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
            <Image
              style={{flex: 1, height: null, width: null, resizeMode: 'cover',
            borderRadius: 20}}
              source={item.url} />
              <Animated.View>
                <Text style={{fontSize: 30, padding: 5, paddingTop: 30}}>薛大明</Text>
                <Text style={{padding: 8}}>
                在文字录入比赛（打字比赛）中，最公平的比赛用文本就是随机文本，这个随机汉字生成器便是为此所作。普通人的汉字录入速度一般是每分钟几十个到一百多个，我们可以生成一两千字的随机汉字文本，让比赛者录入完这些汉字，依据他们的比赛用时和正确率判断名次。生成随机汉字的原始文字一般选择常用汉字，经过随机排列之后只能一个字一个字的输入，对参赛者来说是相对公平的方案。
                随机汉字生成：
                可选择常用字和次常用字，或者选中“用户输入”然后自行输入要随机排列的汉字。在数量中输入想要输出的字数，3000字以内。然后点击“生成”便可，生成的随机汉字每５个一组，方便浏览。多次点击则输出汉字重新随机排列。
                注：常用字和次常用字分别为《现代汉语常用字表》中的2500个常用字和1000个次常用字，如果生成的字数大于选中项包含的字数，输出的随机汉字中会有重复字，反之不会有重复字。

                随机词语生成：
                选中随机词语后，还可选择单个词语字数：二字词、三字词、四字词、五字词，可单选也可多选。在数量中输入想要生成的词语个数，然后点击生成便可。输出的词语是从《辞海》中随机抽取的，不会重复。

                </Text>
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
