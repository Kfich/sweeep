import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'react-native-animatable';
import NavBar from '../components/Navbar';
import CustomButton from '../components/CustomButton';
import { Col, Row, Grid } from "react-native-easy-grid";
import imgLogo from '../images/logo.png';
import metrics from '../metrics';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import ChangeAddressForm from '../components/ChangeAddressForm';



const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.3

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerTop: {
    //justifyContent: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: "#DCDCDC"
  },
  containerBottom: {
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingBottom: 25,
    borderWidth: 0.5,
    borderColor: "#DCDCDC"
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: "#000"
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
  headerText:{
    alignSelf: 'center',
    textAlign:'center',
    fontSize: 18,
    color:'#1E3B63',
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
  headerTextSmall:{
    alignSelf: 'center',
    textAlign:'center',
    fontSize: 15,
    color:'#4A90E2',
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  createAccountButton: {
    backgroundColor: '#1E3B63',
  },
  createAccountButtonSelected: {
    backgroundColor: '#66ff66',
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});

export default class Schedule extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    isDateTimePickerVisible: false,
    selectedDate: '',
    dateSelected: false,
    isModalVisible: false,
    washSelected: false,
  };


  componentDidMount(){
      // Test nav
      console.log("Schedule: Data ", this.props.navigation.state.params)
      // Set current user
      var addressDict = this.props.navigation.state.params.currentUser.address

      this.setState({
        currentUser: this.props.navigation.state.params.currentUser,
        address:  addressDict.street + ', '+ addressDict.city + ' '+ addressDict.state + ', ' + addressDict.zip

      })

      console.log("Current state of affairs", this.state);


  }


 form = () => {
    return (
      <AddressForm />
  )}

  _calculateTotal = () => {

    return 150
  }

  _submitAddressChange = () => {
    // Set address
    addressDict = this.changeAddressRef.state
    // Set state w new address
    this.setState({
      address:  addressDict.street + ', '+ addressDict.city + ' '+ addressDict.state + ', ' + addressDict.zip

    })
    // Present modal
    Alert.alert(
       'Would you like to save this address for future appointments?',
       '',
       [
           {text: 'No', onPress: () => console.log('OK Pressed')},
           {text: 'Yes', onPress: this._saveUserAddress},
         ],
       { cancelable: false }
    )

  }

  _saveUserAddress = () => {
    // Update user object
    console.log("Hit firebase");

    // Drop screen
    this._hideModal()
  }

  _showPaymentInput = () => {
    // Config address string
    var address = this.state.currentUser.address
    var addressString =  address.street + ', '+ address.city + ' '+ address.state + ', ' + address.zip

    var amount = this._calculateTotal()

    // Initialize appointment
    appointment = {
      customer_name: this.state.currentUser.name,
      email: this.state.currentUser.email,
      userId: this.state.currentUser.userId,
      transactionId: '',
      appointment_date: this.state.selectedDate,
      appointment_time: this.state.selectedTime,
      mobile: this.state.currentUser.mobile,
      address: this.state.address,
      washSelected: this.state.washSelected,
      total: amount,
      employeeId: '',
      status: 'processing',
      paymentType: ''
    }

    // Show payment
    this.props.navigation.navigate('Payment', {currentUser: this.state.currentUser, appointment: appointment});
  };

  _dismiss = () => {
    this.props.navigation.goBack();
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  _selectWash = () => this.setState({ washSelected: true })

  _deselectWash = () => this.setState({ washSelected: false })

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.toString());
    this.setState({
      selectedDate: date.toDateString(),
      selectedTime: date.toLocaleTimeString(),
      dateSelected: true,
      dateString: this.state.selectedDate + '@' + this.state.selectedTime
    })
    this._hideDateTimePicker();
  };

  //dateString = this.state.selectedDate + '@' + this.state.selectedTime


  render() {
    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {'Create Appointment'}
          hasImages = {true}
          leftButtonHidden = {false}
          leftButtonAction = {this._dismiss}
          rightButtonAction = {null}
          rightButtonHidden = {true}
        />
        <Grid>
            <Row size={0.25}></Row>
            <Row style={styles.containerTop} size={1}>
              <Text style={styles.headerText}>Please Select a Time & Date</Text>
              <View style={styles.buttonContainer}>
                <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                  <CustomButton
                    onPress={this._showDateTimePicker}
                    isEnabled={true}
                    isLoading={false}
                    buttonStyle={styles.createAccountButton}
                    textStyle={styles.createAccountButtonText}
                    text={'Schedule Now'}
                  />
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode={'datetime'}
                  />
                </View>
              </View>
            </Row>
            <Row style={styles.containerBottom} size={0.5}>
              <Text style={styles.headerTextSmall}>{this.state.dateSelected ? `${this.state.selectedDate} @ ${this.state.selectedTime}`  : 'No date selected'}</Text>
            </Row>
            <Row style={styles.containerBottom} size={1}>
              <Text style={styles.headerText}>{this.state.address}</Text>
              <View style={styles.buttonContainer}>
                <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                  <CustomButton
                    onPress={this._showModal}
                    isEnabled={true}
                    isLoading={false}
                    buttonStyle={styles.createAccountButton}
                    textStyle={styles.createAccountButtonText}
                    text={'Change Address'}
                  />
                  <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 0.05 }}>
                      <Text onPress={this._hideModal} style={{color: 'white'}}>
                          Cancel
                      </Text>
                    </View>
                    <View style={{ flex: 0.95 }}>
                      <ChangeAddressForm
                          ref={(ref) => this.changeAddressRef = ref}
                          _submitForm = {this._submitAddressChange}
                          _cancel = {this._hideModal}
                          currentAddress = {this.address}
                      />
                    </View>
                  </Modal>
                </View>
              </View>
            </Row>
            <Row style={styles.containerBottom} size={1}>
              <Text style={styles.headerText}>Would you like to include wash & fold services?</Text>
              <View style={styles.buttonContainer}>
                <View ref={(ref) => this.washButtonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                  <CustomButton
                    onPress={this.state.washSelected ? this._deselectWash : this._selectWash}
                    isEnabled={true}
                    isLoading={false}
                    buttonStyle={this.state.washSelected ? styles.createAccountButtonSelected : styles.createAccountButton }
                    textStyle={styles.createAccountButtonText}
                    text={this.state.washSelected ? 'Selected' : 'Select'}
                  />
                </View>
              </View>
            </Row>
            <Row style={styles.containerBottom} size={1.5}>
              <View style={styles.buttonContainer}>
                <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                  <CustomButton
                    onPress={this._showPaymentInput}
                    isEnabled={true}
                    isLoading={false}
                    buttonStyle={styles.createAccountButton}
                    textStyle={styles.createAccountButtonText}
                    text={'Continue'}
                  />
                </View>
              </View>
            </Row>
        </Grid>
      </View>
    );
  }
}
