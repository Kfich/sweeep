import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import NavBar from '../components/Navbar';
import metrics from '../metrics';
import CustomButton from '../components/CustomButton';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import * as firebase from 'firebase';
import LoadingIndicator from '../components/LoadingIndicator';

var randomize = require('randomatic');


//var stripe = require('stripe')('sk_test_dMRUlUPcf9dVkKLuTwIfGY2V');

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: "#FFF",
  },
  cardContainer: {
    flex: 0.5,
    backgroundColor: "#FFF",
    paddingTop: 10,
    borderWidth: 0.5,
    borderColor: "#DCDCDC"
  },
  optionsSeparator: {
    flex: 0.1,
    backgroundColor: "#FFF",
  },
  cashContainer: {
    flex: 0.2,
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 25,
    borderWidth: 0.5,
    borderColor: "#DCDCDC"
  },
  containerBottom: {
    alignItems: 'center',
    justifyContent: 'center',
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
  createAccountButton: {
    backgroundColor: '#1E3B63',
  },
  createAccountButtonSelected: {
    backgroundColor: '#66ff66',
  },
  label: {
    color: "#1E3B63",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "#1E3B63",
  },
  titleText:{
    alignSelf: 'center',
    textAlign:'center',
    paddingTop: 8,
    fontSize: 25,
    color:'#1E3B63',
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
  labelText:{
    alignSelf: 'center',
    textAlign:'center',
    paddingVertical: 12,
    fontSize: 20,
    color:'#4A90E2',
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
  headerText:{
    alignSelf: 'center',
    textAlign:'center',
    paddingTop: 8,
    fontSize: 18,
    color:'#1E3B63',
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
});

const USE_LITE_CREDIT_CARD_INPUT = false;

export default class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cashSelected: false,
      isLoading: false,
    }

    this.transactionId = randomize('Aa0', 20)

    const rootRef = firebase.database().ref();
    this.appointmentRef = rootRef.child('orders/' + this.transactionId);

  }


  state = {
    cashSelected: false
  };

  componentWillMount(){
      // Test nav
      console.log("Payment: Data ", this.props.navigation.state.params)
      // Set current user
      this.setState({
        currentUser: this.props.navigation.state.params.currentUser,
        appointment: this.props.navigation.state.params.appointment
      })
  }


  _selectCash = () => this.setState({ cashSelected: true })

  _deselectCash = () => this.setState({ cashSelected: false })

  _showConfirmOrder = () => {
    this.props.navigation.navigate('ConfirmOrder', {currentUser: this.state.currentUser});
  };

  _dismiss = () => {
    this.props.navigation.goBack();
  };

  _onChange = formData => {
    /* eslint no-console: 0 */
    console.log(JSON.stringify(formData, null, " "));

    this.payment = formData
    console.log("Form data var", this.payment);
  };

  _confirmPayment = () => {
    // Set loading state
    this.setState({isLoading: true})

    // Get card data
    console.log("The card data", this.payment);

    let number = this.payment.values.number
    let exp = this.payment.values.expiry
    let cvc = this.payment.values.cvc
    let amount = this.state.appointment.total


    paths = exp.split("/");

    let month = paths[0]
    let year = paths[1]

    fetch(`https://api.stripe.com/v1/tokens?card[number]=${number}&card[exp_month]=${month}&card[exp_year]=${year}&card[cvc]=${cvc}&amount=${amount}&currency=usd`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer sk_test_dMRUlUPcf9dVkKLuTwIfGY2V"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      // HERE WE HAVE ACCESS TO THE TOKEN TO SEND IT TO OUR SERVERS
      // ALONG WITH INSENSITIVE DATA
      console.log("The token was recieved", data.id);

      // Set token
      this.token = data

      console.log(this.token);

      var params = {
        stripeToken: data.id,
        amount: amount,
        currency: 'usd',
        description: "New user paid me!"
      }

      paymentDict = JSON.stringify(params)

      console.log("The payment", paymentDict);

      fetch('http://localhost/cs_payments/payment.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: paymentDict
        })
        .then(resp => console.log("The response", resp))
        .then(function(response) {
          // DO SOMETHING AFTER PAYMENT CONFIRMATION
            console.log("The payment was made!");

            // Save appointment
            this._submitAppointment()

          }.bind(this)).catch(err => console.error(err));

    }).catch((err) => {

      console.log("There was an error retrieving the token", err.toString());
      // Show alert view

    })
  }

  _submitAppointment = () =>{

    // Add trans id to object
    this.state.appointment.transactionId = this.transactionId

    this.appointmentRef.set({
      customer_name: this.state.appointment.customer_name,
      email: this.state.appointment.email,
      userId: this.state.appointment.userId,
      transactionId: this.transactionId,
      appointment_date: this.state.appointment.appointment_date,
      appointment_time: this.state.appointment.appointment_time,
      mobile: this.state.appointment.mobile,
      address: this.state.appointment.address,
      total: this.state.appointment.total,
      washSelected: this.state.appointment.washSelected,
      employeeId: '',
      status: 'processing',
      paymentType: this.state.cashSelected ? 'cash' : 'credit'

     })

     // Transition to confirm view
     this._showConfirmOrder()

  }

  _submitPayment = () => {

    var params = {
      stripeToken: data.id,
      amount: 999,
      currency: 'usd',
      description: "New user paid me!",
      source: data
    }

    payment = JSON.stringify(params)

    console.log("The payment", payment);

    fetch('http://localhost/cs_payments/payment.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: payment
      })
      .then(resp => console.log("The response", resp))
      .then(function(response) {
        if(response != null) {
        // DO SOMETHING AFTER PAYMENT CONFIRMATION
          console.log("The payment was made!");

          }
        }.bind(this)).catch(err => console.error(err));
  }

  _onFocus = field => {
    /* eslint no-console: 0 */
    console.log(field);
  };

  renderLoadingView() {
    return (
      <LoadingIndicator loadStyle = {'SNAIL'} promptText = {'Processing payment...'} />
    );
  }

  render() {

    if (this.state.isLoading) {
      return this.renderLoadingView()
    } else {
      return (
        <View style={styles.container}>
          <NavBar
            title = {'Select Payment Method'}
            hasImages = {true}
            leftButtonAction = {this._dismiss}
            leftButtonHidden = {false}
            rightButtonAction = {null}
            rightButtonHidden = {true}
          />
          <View style={styles.cardContainer}>
              { USE_LITE_CREDIT_CARD_INPUT ?
                (<LiteCreditCardInput
                    autoFocus
                    inputStyle={styles.input}

                    validColor={"black"}
                    invalidColor={"red"}
                    placeholderColor={"darkgray"}

                    onFocus={this._onFocus}
                    onChange={this._onChange} />) :
                  (<CreditCardInput
                      autoFocus

                      requiresName
                      requiresCVC
                      requiresPostalCode

                      labelStyle={styles.label}
                      inputStyle={styles.input}
                      validColor={"black"}
                      invalidColor={"red"}
                      placeholderColor={"darkgray"}

                      onFocus={this._onFocus}
                      onChange={this._onChange} />)
              }
          </View>
          <View style={styles.optionsSeparator}>
              <Text style={styles.labelText}>Total: $ {this.state.appointment.total}.00</Text>
          </View>
          <View style={styles.cashContainer}>
            <Text style={styles.headerText}>Pay with cash?</Text>
            <View style={styles.buttonContainer}>
              <View ref={(ref) => this.cashButtonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                <CustomButton
                  onPress={this.state.cashSelected ? this._deselectCash : this._selectCash}
                  isEnabled={true}
                  isLoading={false}
                  buttonStyle={this.state.cashSelected ? styles.createAccountButtonSelected : styles.createAccountButton }
                  textStyle={styles.createAccountButtonText}
                  text={this.state.cashSelected ? 'Selected' : 'Select'}
                />
              </View>
            </View>
          </View>
          <View style={styles.cashContainer}>
            <View style={styles.buttonContainer}>
              <View ref={(ref) => this.cashButtonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                <CustomButton
                  onPress={this._confirmPayment}
                  isEnabled={true}
                  isLoading={false}
                  buttonStyle={styles.createAccountButton }
                  textStyle={styles.createAccountButtonText}
                  text={'Confirm Payment'}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}
