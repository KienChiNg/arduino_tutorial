import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { DATA } from './srcfirebase';

const { width, height } = Dimensions.get("window")
const red = "red";
const blue = "blue";
class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "TỰ ĐỘNG",
            led: 0,
            contr: 0,
        }
    }
    control = (ctr) => {
        DATA
        .ref(`/control`)
        .set({
            control: ctr,
        })
        let txt = ""
        if(ctr == 1){
            txt = "MỞ"
        }else if(ctr == 0){
            txt = "TỰ ĐỘNG"
        }else{
            txt = "TẮT"
        }
        this.setState({
            contr: ctr,
            txt
        })
    }
  
    componentDidMount = () => {
        DATA.ref(`Sensor`)
            .on("value", (snapshot) => {
                let array = []
                snapshot.forEach((child) => {
                    array.push({
                        value: child.val()
                    })
                });
                // console.log("vlue",array[1].value)
                this.setState({ led: array[2].value })
            });
    }
    render() {
        const { txt, led, contr} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.viewControl}>
                <TouchableOpacity
                    style ={styles.btnControl}
                    onPress={()=> this.control(0)}
                >
                    <Text style={styles.txtBtnControl}>Tự động</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style ={[styles.btnControl,{backgroundColor:'blue'}]}
                    onPress={()=> this.control(1)}
                >
                    <Text style={styles.txtBtnControl}>Mở </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style ={[styles.btnControl,{backgroundColor:'red'}]}
                    onPress={()=> this.control(2)}
                >
                    <Text style={styles.txtBtnControl}>Tắt</Text>
                </TouchableOpacity>
                </View>
                <View style={{width: width, height: width*0.2, justifyContent:'center',alignItems:'center'}}>
                    <Text style={[styles.txtBtnControl,{color:'black'}]}>{`Trang thái:  ${txt}`}</Text>
                </View>
                {(
                (led == 1 && contr==0)||(contr==1))?(
                    <Image
                    style={styles.image}
                    source={require('./image/on.png')}
                    />
                ):(
                    <Image
                    style={styles.image}
                    source={require('./image/off.png')}
                    />
                )
            
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems:'center'
    },
    image: {
        width: width/2,
        height: height/3,
    },
    viewControl: {
        flexDirection:'row', 
        justifyContent:'space-around',
        alignItems:'center',
        width: width,
        // marginBottom: width*0.1
    },
    btnControl: {
        width: width/4,
        height: width/10, 
        backgroundColor: 'green', 
        justifyContent: 'center', 
        alignItems:'center', 
        borderRadius: 24   
    },
    txtBtnControl: {
        color:'white', 
        fontSize:width*0.05,
    }
})

export default Display