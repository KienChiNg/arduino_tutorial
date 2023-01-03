import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    processColor,
} from 'react-native';
import { DATA } from './srcfirebase';
import { LineChart, BarChart } from 'react-native-charts-wrapper';

const { width, height } = Dimensions.get("window")
const red = "red";
const blue = "blue";
class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "",
            arrHumidity: [
            //     {
            //     y: 64.4
            // },
            // {
            //     y: 64.5
            // },
            // {
            //     y: 64.6
            // },
            // {
            //     y: 64.4
            // },
            // {
            //     y: 64.5
            // },
            // {
            //     y: 64.6
            // },
            // {
            //     y: 64.8
            // },
            // {
            //     y: 64.5
            // },
        ],
            arrTemperature: [
            //     {
            //     y: 30.4
            // },
            // {
            //     y: 30.5
            // },
            // {
            //     y: 30.6
            // },
            // {
            //     y: 30.4
            // },
            // {
            //     y: 30.5
            // },
            // {
            //     y: 30.6
            // },
            // {
            //     y: 30.8
            // },
            // {
            //     y: 31
            // },
        ],
        }
    }
    getTime = () => {
        let currentDate = new Date();
        let minutes = currentDate.getMinutes() >= 10 ? currentDate.getMinutes() : `0${currentDate.getMinutes()}`
        let hours = currentDate.getHours() >= 10 ? currentDate.getHours() : `0${currentDate.getHours()}`
        let seconds = currentDate.getSeconds() >= 10 ? currentDate.getSeconds() : `0${currentDate.getSeconds()}`
        let time = hours + ":" + minutes + ":" + seconds;
        let cDay = currentDate.getDate()
        let cMonth = currentDate.getMonth() + 1
        let cYear = currentDate.getFullYear()
        let date = `${time}\n${cDay}/${cMonth}/${cYear}`
        return date
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
                // console.log(this.getTime())
                let arrHumidity1 = [...this.state.arrHumidity]
                let arrTemperature1 = [...this.state.arrTemperature]
                arrHumidity1.push({ y: array[0].value, marker: `${this.getTime()}\nĐộ ẩm: ${array[0].value}%` })
                arrTemperature1.push({ y: array[1].value, marker: `${this.getTime()}\nNhiệt độ: ${array[1].value}*C` })
                this.setState({ arrHumidity: arrHumidity1 })
                this.setState({ arrTemperature: arrTemperature1 })
                // console.log("arrHumidity", this.state.arrHumidity)
            });
    }
    render() {
        const { txt, arrTemperature, arrHumidity } = this.state;
        return (
            <View style={styles.container}>
                <LineChart style={styles.chart}
                    data={{
                        dataSets: [
                        {
                            label: "Độ ẩm",
                            values: arrHumidity,
                            config: {
                                lineWidth: 2,
                                color: processColor(blue),
                                circleRadius: 2.5,
                                circleColor: processColor(blue),
                            }
                        }
                        ],
                    }}
                    animation={{
                        durationX: 0,
                        durationY: 1500,
                        easingY: "EaseInOutQuart"
                    }}
                    autoScaleMinMaxEnabled={true}
                    yAxis={{
                        right: {
                            enabled: false,
                        }
                    }}
                    xAxis={{
                        position: "BOTH_SIDED",
                        valueFormatter: []
                    }}
                    marker={{
                        enabled: true,
                        markerColor: processColor("lightgray"),
                        textColor: processColor("black"),
                    }}
                    chartDescription={{ text: "Biểu đồ nhiệt độ, độ ẩm" }}
                    doubleTapToZoomEnabled={false}
                    visibleRange={{ x: { min: 10, max: 10 } }}
                />
                <View style={[
                    styles.chart,
                    { flexDirection: 'row' }
                ]}>
                    <BarChart style={styles.chart}
                        data={{
                            dataSets: [{
                                label: "Độ ẩm",
                                values: arrHumidity,
                                config: {
                                    color: processColor('blue'),
                                }
                            }],
                        }}
                        animation={{ durationX: 2000 }}
                        drawValueAboveBar={true}
                        drawHighlightArrow={true}
                        marker={{
                            enabled: true,
                            markerColor: processColor("lightgray"),
                            textColor: processColor("black"),
                        }}
                        xAxis={{
                            valueFormatter: [],
                            granularityEnabled: true,
                            granularity: 1,
                        }}
                        yAxis={{
                            right: {
                                enabled: false,
                            }
                        }}
                        chartDescription={{ text: "Biểu đồ cột độ ẩm" }}
                        visibleRange={{ x: { min: 10, max: 10 } }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
})

export default Display