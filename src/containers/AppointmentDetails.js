import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'react-native-animatable';
import NavBar from '../components/Navbar';
import CustomButton from '../components/CustomButton';
import { Col, Row, Grid } from "react-native-easy-grid";
import imgLogo from '../images/logo_white.png';
import metrics from '../metrics';
import Modal from 'react-native-modal';


const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

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
    fontSize: 15,
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
  cancelAppointmentButton: {
    backgroundColor: 'red',
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

export default class AppointmentDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _cancel: props._cancel
    }

  }

  componentWillMount(){
      // Test nav
      //console.log("Confirm Pay: Data ", this.props.navigation.state.params)
      // Set current user
  }

  _showCancelAppointment = () => {
      Alert.alert(
       'Are you sure you want to cancel your appointment?',
       'It\'s not too late to turn back',
       [
           {text: 'Yes, cancel it', onPress: () => console.log('OK Pressed')},
           {text: 'No, forget it', onPress: () => console.log('OK Pressed')},
         ],
       { cancelable: false }
      )
  };

  _showRecurringAppointment = () => {
      Alert.alert(
       'Please select a time interval',
       '',
       [
           {text: 'Monthly', onPress: (choice) => console.log(choice)},
           {text: 'Bi-Monthly', onPress: (choice) => console.log(choice)},
           {text: 'Weekly', onPress: (choice) => console.log(choice)},
           {text: 'Daily', onPress: (choice) => console.log(choice)},
         ],
       { cancelable: false }
      )
  };

  render() {
    let status = `Order Status: ${this.props.activeAppointment.trans.status}`
    let location = `Location: ${this.props.activeAppointment.trans.address}`
    let date = `Date: ${this.props.activeAppointment.trans.appointment_time} @ ${this.props.activeAppointment.trans.appointment_time}`
    let amount = `Total Amount: $${this.props.activeAppointment.trans.total}`
    let wash = this.props.activeAppointment.trans.washSelected ? 'Yes' : 'No'
    let laundrySelected = `Wash & Fold: ` + wash

    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {'Appointment Details'}
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
            title = {`Thank You!`}
            hasImages = {true}
            leftButtonHidden = {true}
            rightButtonAction = {null}
            rightButtonHidden = {true}
          />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.descriptionText}>{status}</Text>
            <Text style={styles.descriptionText}>{location}</Text>
            <Text style={styles.descriptionText}>{date}</Text>
            <Text style={styles.descriptionText}>{amount}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View ref={(ref) => this.cashButtonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={this._showRecurringAppointment}
              color={'red'}
              isEnabled={true}
              isLoading={false}
              buttonStyle={styles.createAccountButton }
              textStyle={styles.createAccountButtonText}
              text={'Make This a Recurring Appointment'}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View ref={(ref) => this.cashButtonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={this.state._cancel}
              color={'red'}
              isEnabled={true}
              isLoading={false}
              buttonStyle={styles.createAccountButton }
              textStyle={styles.createAccountButtonText}
              text={'Contact CleanSweep'}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View ref={(ref) => this.cashButtonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={this._showCancelAppointment}
              color={'red'}
              isEnabled={true}
              isLoading={false}
              buttonStyle={styles.cancelAppointmentButton}
              textStyle={styles.createAccountButtonText}
              text={'Cancel Appointment'}
            />
          </View>
        </View>
      </View>
    );
  }
}
