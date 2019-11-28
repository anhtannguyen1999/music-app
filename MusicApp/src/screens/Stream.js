    import React, { Component } from "react";
    import {
      StyleSheet,
      View,
      Button,
      ProgressBarAndroid,
      Text,
      Image,
      TouchableOpacity,
      Dimensions
    } from "react-native";
    import Player, { MyPlayerBar } from '../player/Player'
    import StopPause from "../components/StopPause";
    import play from "../../res/play_.png";
    import pause from "../../res/pause_.png";
    const screenWidth = Math.round(Dimensions.get("window").width);
    export default class StreamScreen extends Component {
      constructor(props) {
        super(props);
        this.state = {
          pause: false,
          repeat: false,
          random: false
        };
      }

      _setPause() {
        if (this.state.pause == true) {
          this.setState({ pause: false });
          Player._setPlay();
        } else {
          this.setState({ pause: true });
          Player._setPause();
        }
        console.log(this.state.pause);
      }

      _renderButtonPause() {
        var scPause = this.state.pause ? play : pause;
        return <Image width={20} resizeMode="cover" source={scPause}></Image>;
      }

      render() {
        return (
          <View style={styles.container}>
            <View style={styles.con2}>
            </View>
            <View style={styles.con1}>
              <View style={styles.container}>
        
                  



                  <MyPlayerBar  >
                    
                      
                    
                  </MyPlayerBar>



                <View style={styles.containerButton}>
                  <View flex={1}>
                    <TouchableOpacity flex={1}>
                      <Image
                        resizeMode="center"
                        source={
                          this.props.pause
                            ? require("../../res/shuffle.png")
                            : require("../../res/shuffle.png")
                        }
                      ></Image>
                    </TouchableOpacity>
                    <View flex={1}></View>
                  </View>

                  <View style={{ flex: 2.5, flexDirection: "row" }}>
                    <TouchableOpacity>
                      <Image
                        resizeMode="center"
                        source={require("../../res/prev.png")}
                      ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        this._setPause();
                      }}
                    >
                      {this._renderButtonPause()}
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Image
                        resizeMode="center"
                        source={require("../../res/next.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>

                  <View flex={1}>
                    <TouchableOpacity>
                      <Image
                        resizeMode="center"
                        source={require("../../res/repeat.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
      },
      con1: {
        flex: 1.2
      },
      con2: {
        flex: 6
      },

      containerButton: {
        flex: 4,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#054",
        flexDirection: "row",
        width: screenWidth
      },
      containerProc: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#fff",
        flexDirection: "row",
        width: screenWidth
      }
    });
