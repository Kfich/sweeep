import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'react-native-animatable';
import NavBar from '../components/Navbar';
import CustomButton from '../components/CustomButton';
import { Col, Row, Grid } from "react-native-easy-grid";
import imgLogo from '../images/checkmark.png';
import metrics from '../metrics'


const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.3

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerTop: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column'
  },
  containerBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3B63',
    paddingBottom: 25
  },
  buttonContainer: {
    flex: 0.25,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  titleText:{
    alignSelf: 'center',
    textAlign:'center',
    paddingTop: 75,
    fontSize: 18,
    color:'#1E3B63',
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
  labelText:{
    textAlign:'center',
    fontSize: 24,
    color:'#fff',
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
  descriptionText:{
    textAlign:'center',
    fontSize: 16,
    color:'#1E3B63',
    fontFamily: 'Avenir',
    flex:1,                //Step 3
    paddingHorizontal: 15,
    paddingTop: 15
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15
  },
  createAccountButton: {
    backgroundColor: '#1E3B63',
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  imgContainer: {
    backgroundColor: '#1E3B63',
    flex: 0.5
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
});

export default class ConfirmOrder extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentWillMount(){
      // Test nav
      console.log("Confirm Pay: Data ", this.props.navigation.state.params)
      // Set current user
      this.setState({
        currentUser: this.props.navigation.state.params.currentUser
      })
  }



  _confirmOrder = () => {
    this.props.navigation.navigate('Home', {currentUser: this.state.currentUser});
  };

  render() {
    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {'Thank You!'}
          hasImages = {true}
          leftButtonHidden = {true}
          rightButtonAction = {null}
          rightButtonHidden = {true}
        />
        <View style={styles.imgContainer}>
          <Image
            animation={'bounceIn'}
            duration={1200}
            delay={200}
            ref={(ref) => this.logoImgRef = ref}
            style={styles.logoImg}
            source={imgLogo}
          />
          <NavBar
            title = {'Order confirmed!'}
            hasImages = {true}
            leftButtonHidden = {true}
            rightButtonAction = {null}
            rightButtonHidden = {true}
          />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.descriptionText}>Thank you very much for scheduling with CleanSweep! An electronic copy of your recipt will be emailed to you shortly. Please allow up to 24 hours for your order to be processed.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View ref={(ref) => this.cashButtonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={this._confirmOrder}
              isEnabled={true}
              isLoading={false}
              buttonStyle={styles.createAccountButton }
              textStyle={styles.createAccountButtonText}
              text={'Finished'}
            />
          </View>
        </View>
      </View>
    );
  }
}
