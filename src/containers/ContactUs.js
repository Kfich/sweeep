import React, { Component } from 'react';
import { WebView } from 'react-native';
import NavBar from '../components/Navbar';
import { StyleSheet, Button, Text, View, TouchableOpacity, AppRegistry } from 'react-native';
import ImageButton from '../components/ImageButton';
import {kSilver, kCraneBlue, kLightText} from '../Colors';
import {kBetaUrl} from '../networking/Endpoints';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});

export default class ContactUs extends Component {

  // Custom methods
  _dismiss = () =>{
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title = {'Contact Us'}
          hasImages = {true}
          leftButtonAction = {this._dismiss}
          leftButtonHidden = {false}
          rightButtonAction = {null}
          rightButtonHidden = {true}
        />
        <WebView
          source={{uri: kBetaUrl}}
          style={{marginTop: 20}}
        />
      </View>
    );
  }
}
