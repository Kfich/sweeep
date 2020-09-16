import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Image } from 'react-native-animatable'
import { PropTypes } from 'prop-types'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../metrics'
import NavBar from '../../components/Navbar'
import imgLogo from '../../images/location.png'
import * as firebase from 'firebase'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.3

export default class AddressForm extends Component {

  constructor(props) {
    super(props);

    // Set default state
    state = {
      currentUser: null,
      email: '',
      ownerId: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    }

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

  componentDidMount(){

    console.log("Current User ", this.props.navigation.state.params.currentUser);

    this.setState({
      currentUser : this.props.navigation.state.params.currentUser,
      ownerId: this.props.navigation.state.params.currentUser.userId
    });

    uID = this.props.navigation.state.params.currentUser.userId
    // Init ref to DB
    const rootRef = firebase.database().ref();
    this.addressRef = rootRef.child('users/' + uID);
  }

  _showHomeInfo = () => {
    // Validate form
    address = {
      ownerId: this.state.ownerId,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
    }

    this.addressRef.update({address})

    // Navigate
   this.props.navigation.navigate('HomeInfoForm', {userAddress: address, currentUser: this.state.currentUser});
 }

  render () {
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {'Location Information'}
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
              ref={(ref) => this.streetInputRef = ref}
              placeholder={'Street Address'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.streetInputRef.focus()}
              onChangeText={(value) => this.setState({ street: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              ref={(ref) => this.cityInputRef = ref}
              placeholder={'City'}
              editable={!isLoading}
              returnKeyType={'next'}
              secureTextEntry={false}
              withRef={true}
              onChangeText={(value) => this.setState({ city: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              ref={(ref) => this.stateInputRef = ref}
              placeholder={'State'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.stateInputRef.focus()}
              onChangeText={(value) => this.setState({ state: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              ref={(ref) => this.zipInputRef = ref}
              placeholder={'Zip'}
              editable={!isLoading}
              returnKeyType={'done'}
              secureTextEntry={false}
              withRef={true}
              onChangeText={(value) => this.setState({ zip: value })}
              isEnabled={!isLoading}
            />
          </View>
          <View style={styles.footer}>
            <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
              <CustomButton
                onPress={this._showHomeInfo}
                isEnabled={true}
                isLoading={isLoading}
                buttonStyle={styles.createAccountButton}
                textStyle={styles.createAccountButtonText}
                text={'Continue'}
              />
            </View>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.loginLink}
              onPress={this._showHomeInfo}
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
