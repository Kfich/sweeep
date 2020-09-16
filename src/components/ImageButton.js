import React, { Component } from 'react';
import { StyleSheet, Image, Button, Text, View, TouchableOpacity, AppRegistry } from 'react-native';
import imgLogo from '../images/logo.png';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  titleText: {
    fontSize: 12,
    fontFamily: 'Avenir'
  },
  image: {
    flex: 0.8,
  }
});


export default class ImageButton extends Component {
    // Init
    constructor(props) {
      super(props);

      this.state = {
        title: props.title,
        type: props.type,
        isRemoteImage: props.isRemoteImage,
        height: props.height,
        width: props.width,
        imagePath: props.imagePath,
        buttonAction: props.buttonAction,
        backgroundColor: props.backgroundColor,
        titleColor: props.titleColor,
        borderRadius: props.borderRadius
      }

    }

    componentDidMount(){
      console.log("ImageButton mounted, current state", this.state);

    }

  // Custom Methods

  // Page Setup
  render() {

    if (this.state.isRemoteImage) {

      return(
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: this.state.height,
          width: this.state.width,
          backgroundColor: this.state.backgroundColor}}>
          <TouchableOpacity onPress={this.props.buttonAction}>
            <Image
              source={{uri: this.state.imagePath}}
              style={{flex: 1.0, borderRadius: this.state.borderRadius}}
            />
            <Text style={{fontSize: 12, fontFamily: 'Avenir', color: this.state.titleColor}}>{this.state.title}</Text>
          </TouchableOpacity>
        </View>

      );

    } else {

        var source = '';

        if (this.state.type === 'LOGO') {
            source = require("../images/logo.png");
        }else if (this.state.type === 'ARROW') {
            source = require("../images/arrow.png");
        }else if (this.state.type === 'ARROW-BACK') {
            source = require("../images/arrow_back.png");
        }else if (this.state.type === 'GEAR') {
            source = require("../images/gear_dark_blue.png");
        }else if (this.state.type === 'USER') {
            source = require("../images/user-sweeep.png");
        }

        console.log("Source post selection", source);

      return(
        <View style={{
          alignItems: 'center',
          height: this.state.height,
          width: this.state.width,
          backgroundColor: this.state.backgroundColor}}>
              <TouchableOpacity onPress={this.props.buttonAction}>
                  <Image
                  source={source}
                  style={{flex: 1.0, height: this.state.height, width: this.state.width}}
                />
            </TouchableOpacity>
        </View>

      );

    }
  }

}
