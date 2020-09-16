import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, AppRegistry } from 'react-native';
import ImageButton from './ImageButton';


const styles = StyleSheet.create({
  toolbar:{
    backgroundColor:'#ffffff',
    paddingTop:30,
    flexDirection:'row'    //Step 1
  },
  toolbarButton:{
    width: 60,            //Step 2
    color:'#2d49e7',
    fontFamily: 'Avenir',
    textAlign:'center'
  },
  toolbarButtonClear:{
    width: 60,            //Step 2
    color:'#fff',
    textAlign:'center',
    opacity: 0
  },
  toolbarTitle:{
    textAlign:'center',
    fontSize: 18,
    color:'#1E3B63',
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
  titleText: {
    fontSize: 20,
    color:'#2d49e7',
    fontFamily: 'Avenir'
  }
});

export default class NavBar extends Component {
    // Init
    constructor(props) {
      super(props);

      this.state = {
        title: props.title,
        backgroundColor: props.backgroundColor,
        hasImages: props.hasImages,
        leftButtonText: props.leftButtonText,
        leftButtonHidden: props.leftButtonHidden,
        leftButtonAction: props.leftButtonAction,
        rightButtonText: props.rightButtonText,
        rightButtonHidden: props.rightButtonHidden,
        rightButtonAction: props.rightButtonAction,
        type: props.type

      }

    }

    componentDidMount(){
      console.log("Nav bar mounted, current state", this.state);

    }

  // Custom Methods

  // Page Setup
  render() {

      if (this.state.leftButtonHidden && !this.state.rightButtonHidden) {
          return (
            <View style={styles.toolbar}>
              <View style = {{marginLeft : 8, height: 20, width: 20}}></View>
              <Text style={styles.toolbarTitle}>{this.state.title}</Text>
              <View style = {{marginRight : 8, paddingBottom: 5, height: 30, width: 30}}>
                  <ImageButton style = {{marginRight : 8}}
                    type = {'GEAR'}
                    isRemoteImage = {false}
                    height = {25}
                    width = {25}
                    imagePath = {''}
                    buttonAction = {this.state.rightButtonAction}
                    backgroundColor = {'#ffffff'}
                    titleColor = {'#D3D3D3'}
                    borderRadius = {0}
                  />
              </View>
            </View>
        );


      } else if (!this.state.leftButtonHidden && this.state.rightButtonHidden) {

            if (this.state.hasImages) {

                return (
                  <View style={styles.toolbar}>
                    <View style = {{marginLeft : 12, height: 20, width: 20, paddingTop: 5}}>
                        <ImageButton style = {{marginRight : 8}}
                          type = {'ARROW-BACK'}
                          isRemoteImage = {false}
                          height = {15}
                          width = {15}
                          imagePath = {''}
                          buttonAction = {this.state.leftButtonAction}
                          backgroundColor = {'#ffffff'}
                          titleColor = {'#D3D3D3'}
                          borderRadius = {0}
                        />
                    </View>
                    <Text style={styles.toolbarTitle}>{this.state.title}</Text>
                    <View style = {{marginLeft : 8, height: 20, width: 20}}></View>
                  </View>
              );


            } else {

                return (
                  <View style={styles.toolbar}>
                      <TouchableOpacity onPress={this.state.leftButtonAction}>
                        <Text style={styles.toolbarButton}>{this.state.leftButtonText}</Text>
                      </TouchableOpacity>
                      <Text style={styles.toolbarTitle}>{this.state.title}</Text>
                      <Text style={styles.toolbarButtonClear}>{this.state.rightButtonText}</Text>
                  </View>
              );

            }

      }else if (!this.state.leftButtonHidden && !this.state.rightButtonHidden){

          return (
            <View style={styles.toolbar}>
                <TouchableOpacity onPress={this.state.leftButtonAction}>
                  <Text style={styles.toolbarButton}>{this.state.leftButtonText}</Text>
                </TouchableOpacity>
                <Text style={styles.toolbarTitle}>{this.state.title}</Text>
                <TouchableOpacity onPress={this.state.rightButtonAction}>
                  <Text style={styles.toolbarButtonClear}>{this.state.rightButtonText}</Text>
                </TouchableOpacity>
            </View>
          );
      }else{

        return (
          <View style={styles.toolbar}>
              <TouchableOpacity onPress={this.state.leftButtonAction}>
                <Text style={styles.toolbarButton}>{this.state.leftButtonText}</Text>
              </TouchableOpacity>
              <Text style={styles.toolbarTitle}>{this.state.title}</Text>
              <TouchableOpacity onPress={this.state.rightButtonAction}>
                <Text style={styles.toolbarButtonClear}>{this.state.rightButtonText}</Text>
              </TouchableOpacity>
          </View>
        );

      }
  }
}
