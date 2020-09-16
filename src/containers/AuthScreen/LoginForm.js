import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'
import { PropTypes } from 'prop-types'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../metrics'
import firebase from 'firebase'
import LoadingIndicator from '../../components/LoadingIndicator';


export default class LoginForm extends Component {

  // Bind func to page
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullName: '',
      user : null,
      token: '',
      currentUser: null
    }
    this._showSignup = this._showSignup.bind(this);
    this._navigateHome = this._navigateHome.bind(this);

    const rootRef = firebase.database().ref();
    this.usersRef = rootRef.child('users');

    this.fetchUser()

  }

  _showSignup(event) {

   this.props.navigate.navigate('SignupForm', {navigate: this.props.navigate});
 }

 _navigateHome(event) {

    this.state.userList.forEach((user) => {
      console.log("Function executing on navHome!", user);

      if (user.user.email === this.state.email){
        console.log("We found the current user!", user);
        // Set current user
        //this.state.currentUser = user

        this.props.navigate.navigate('Home', {currentUser: user.user});
      }else{

        console.log("There was an error locating the account");
      }
    })
 }

 onLoginPress = () => {

        this.setState({ error: '', isLoading: true });

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
              this.setState({ error: '', loading: false });
              console.log("The user successfully signed in!");
              this._navigateHome()

            })
            .catch(() => {
                // Error here - show pop up
                console.log("There was an error logging in.");
            });
  }

  renderLoadingView() {
    return (
      <LoadingIndicator loadStyle = {'CIRCLE'} promptText = {'Welcome back...'} />
    );
  }


  fetchUser = () => {

        this.usersRef.on('value', (snap) => {

          // get children as an array
          var items = [];
          snap.forEach((child) => {
            items.push({
              user: child.val()
            });
          });

          this.setState({
            userList: items
          });




          console.log("The items ", this.state.userList)

        });


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

  render () {
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onLoginPress } = this.props
    const isValid = email !== '' && password !== ''


    if (this.state.isLoading) {
      return this.renderLoadingView()
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
            <CustomTextInput
              name={'email'}
              ref={(ref) => this.emailInputRef = ref}
              placeholder={'Email'}
              keyboardType={'email-address'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.passwordInputRef.focus()}
              onChangeText={(value) => this.setState({ email: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              name={'password'}
              ref={(ref) => this.passwordInputRef = ref}
              placeholder={'Password'}
              editable={!isLoading}
              returnKeyType={'done'}
              secureTextEntry={true}
              withRef={true}
              onChangeText={(value) => this.setState({ password: value })}
              isEnabled={!isLoading}
            />
          </View>
          <View style={styles.footer}>
            <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
              <CustomButton
                onPress={this.onLoginPress}
                isEnabled={isValid}
                isLoading={isLoading}
                buttonStyle={styles.loginButton}
                textStyle={styles.loginButtonText}
                text={'Log In'}
              />
            </View>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.signupLink}
              onPress={this._showSignup}
              animation={'fadeIn'}
              duration={600}
              delay={400}
            >
              {'Not registered yet?'}
            </Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
