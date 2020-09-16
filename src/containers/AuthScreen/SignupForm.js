import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, LayoutAnimation, Platform } from 'react-native'
import { Text, View, Image } from 'react-native-animatable'
import { PropTypes } from 'prop-types'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../metrics'
import NavBar from '../../components/Navbar'
import imgLogo from '../../images/user-sweeep.png'
import * as firebase from 'firebase'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.3

var randomize = require('randomatic');

export default class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullName: '',
      user : null
    }
    this._showAddress = this._showAddress.bind(this);

    this.uid = randomize('Aa0', 20)

    const rootRef = firebase.database().ref();
    this.itemsRef = rootRef.child('users/' + this.uid);

  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  _createUserAccount = () =>{

    //Login was not successful, let's create a new account
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          // User created
          this.setState({ error: '', loading: false });
          console.log("User created successfully!");
          this._showAddress()
       })
        .catch(() => {
            this.setState({ error: 'Authentication failed.', loading: false });
            console.log("There was an error creating the account");
        });

  }

  _uploadUserInfo = () => {



  }

  _showAddress(){
    // Validate form
    console.log("Sign up form, button press state", this.state);


    user = {

      name: this.state.fullName,
      email: this.state.email,
      userId: this.uid,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      mobile: this.state.mobile
    }

    this.itemsRef.set({
      name: this.state.fullName,
      email: this.state.email,
      userId: this.uid,
      mobile: this.state.mobile

     })

    // Navigate
   this.props.navigation.navigate('AddressForm', {currentUser: user});
 }

  render () {
    const { email, password, fullName } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    const isValid = email !== '' && password !== '' && fullName !== ''
    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {'Account Information'}
          hasImages = {true}
          leftButtonAction = {this._dismiss}
          leftButtonHidden = {false}
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
        </View>
        <View style={styles.container}>
          <View style={styles.form} ref={(ref) => this.formRef = ref}>
            <CustomTextInput
              ref={(ref) => this.nameInputRef = ref}
              placeholder={'Full Name'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.nameInputRef.focus()}
              onChangeText={(value) => this.setState({ fullName: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              ref={(ref) => this.mobileInputRef = ref}
              placeholder={'Mobile Number'}
              editable={true}
              returnKeyType={'next'}
              secureTextEntry={false}
              withRef={true}
              onChangeText={(value) => this.setState({ mobile: value })}
              isEnabled={true}
            />
            <CustomTextInput
              ref={(ref) => this.emailInputRef = ref}
              placeholder={'Email'}
              keyboardType={'email-address'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.emailInputRef.focus()}
              onChangeText={(value) => this.setState({ email: value })}
              isEnabled={true}
            />
            <CustomTextInput
              ref={(ref) => this.passwordInputRef = ref}
              placeholder={'Password'}
              editable={true}
              returnKeyType={'done'}
              secureTextEntry={true}
              withRef={true}
              onChangeText={(value) => this.setState({ password: value })}
              isEnabled={true}
            />
            <CustomTextInput
              ref={(ref) => this.passwordInputRef = ref}
              placeholder={'Confirm Password'}
              editable={true}
              returnKeyType={'done'}
              secureTextEntry={true}
              withRef={true}
              onChangeText={(value) => this.setState({ confirmPassword: value })}
              isEnabled={true}
            />
          </View>
          <View style={styles.footer}>
            <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
              <CustomButton
                onPress={this._createUserAccount}
                isEnabled={isValid}
                isLoading={isLoading}
                buttonStyle={styles.createAccountButton}
                textStyle={styles.createAccountButtonText}
                text={'Next'}
              />
            </View>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.loginLink}
              onPress={this._showAddress}
              animation={'fadeIn'}
              duration={600}
              delay={400}
            >
              {'Already have an account?'}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({


  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
    backgroundColor: '#1E3B63',
    flex: 1
  },
  containerMain: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  imgContainer: {
    backgroundColor: '#ffffff',
    flex: 0.3
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
