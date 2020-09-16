import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager, AlertIOS} from 'react-native';
import { Image, View } from 'react-native-animatable';
import imgLogo from '../../images/logo.png';
import metrics from '../../metrics';
import Opening from './Opening';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import NavBar from '../../components/Navbar';
import Onboarding from 'react-native-onboarding-swiper';
import * as firebase from 'firebase';


const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

const firebaseConfig = {
  apiKey: "AIzaSyCbS4xqR3HOCcfvfEp7wGnX1JLmQgZL7b0",
  authDomain: "cedarcleaners-73d2b.firebaseapp.com",
  databaseURL: "https://cedarcleaners-73d2b.firebaseio.com/",
  storageBucket: "cedarcleaners-73d2b.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('users');


//const REQUEST_URL = kBaseUrl + kGetUserToken

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)

export default class Auth extends Component {

  // Init properties
  /*static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    onLoginAnimationCompleted: PropTypes.func.isRequired // Called at the end of a succesfull login/signup animation
  }*/

  state = {
    visibleForm: 'LOGIN', // Can be: null | SIGNUP | LOGIN
    token: '',
    user: '',
    isOnboarding: true,
  }

  componentWillUpdate (nextProps) {

    console.log("The state on AUTH.JS", this.state);

    // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen();
    }
  }

  componetWillMount() {


  }

  componentDidMount(){
/*
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        dataSource: items
      });

      console.log("The items ", items)

    });*/

    //console.log("The NAV item", this.props.navigation);

    /*PushNotificationIOS.addEventListener('register', (token) => {

        console.log("The user token", token);

    });

    PushNotificationIOS.requestPermissions();*/
  }

  _simulateLogin = (username, password) => {
    this.setState({ isLoading: true })
    console.log("Login execution!", username, password);

    //setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  _simulateSignup = (username, password, fullName) => {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null)
    // 2. Fade out the logo
    await this.logoImgRef.fadeOut(800)
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onLoginAnimationCompleted()
  }

  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    // 3. Set the new visible form
    this.setState({ visibleForm })
  }

  _showAuth = () => {
    this.setState({
      isOnboarding: false
    })

  }


  render () {
    const { isLoggedIn, isLoading, signup, login} = this.props
    const { visibleForm } = this.state
    // The following style is responsible of the "bounce-up from bottom" animation of the form

    console.log("The NAV item in render", this.props.navigation);

    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 40 }

    if (this.state.isOnboarding) {
      return (
        <Onboarding
          pages={[
            {
              backgroundColor: '#1E3B63',
              image: <Image
                        animation={'bounceIn'}
                        duration={1200}
                        delay={200}
                        style={styles.logoImg}
                        source={require('../../images/logo_white.png')}
                         />,
              title: 'Welcome to CleanSweep',
              subtitle: 'Need a clean home? Look no further.',
            },
            {
              backgroundColor: '#1E3B63',
              image: <Image
                        animation={'bounceIn'}
                        duration={1200}
                        delay={200}
                        style={styles.logoImg}
                        source={require('../../images/logo_white.png')}
                         />,
              title: 'The Title',
              subtitle: 'This is the subtitle that sumplements the title.',
            },
            {
              backgroundColor: '#1E3B63',
              image: <Image
                        animation={'bounceIn'}
                        duration={1200}
                        delay={200}
                        style={styles.logoImg}
                        source={require('../../images/logo_white.png')}
                         />,
              title: 'Triangle',
              subtitle: "Beautiful, isn't it?",
            },
          ]}
          onDone = {this._showAuth}
          onSkip = {this._showAuth}
        />

      );

    } else {

      return (
        <View style={styles.container}>
        <NavBar
          title = {'CleanSweep'}
          hasImages = {true}
          leftButtonHidden = {true}
          rightButtonAction = {null}
          rightButtonHidden = {true}
        />
          <Image
            animation={'bounceIn'}
            duration={1200}
            delay={200}
            ref={(ref) => this.logoImgRef = ref}
            style={styles.logoImg}
            source={imgLogo}
          />
          {(!visibleForm && !isLoggedIn) && (
            <Opening
              onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
              onSignInPress={() => this._setVisibleForm('LOGIN')}
            />
          )}
          <KeyboardAvoidingView
            keyboardVerticalOffset={-100}
            behavior={'padding'}
            style={[formStyle, styles.bottom]}
          >
            {(visibleForm === 'SIGNUP') && (
              <SignupForm
                ref={(ref) => this.formRef = ref}
                onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
                onSignupPress={signup}
                navigate = {this.props.navigation}
                isLoading={isLoading}
              />
            )}
            {(visibleForm === 'LOGIN') && (
              <LoginForm
                ref={(ref) => this.formRef = ref}
                onSignupLinkPress={() => this._setVisibleForm('LOGIN')}
                onLoginPress={() => this._simulateLogin("kevin", "password")}
                navigate = {this.props.navigation}
                isLoading={isLoading}
              />
            )}
          </KeyboardAvoidingView>
        </View>
      )

    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: '#1E3B63'
  }
})
