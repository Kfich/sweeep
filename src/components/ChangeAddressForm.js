import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Image } from 'react-native-animatable'
import { PropTypes } from 'prop-types'
import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../metrics'
import NavBar from '../components/Navbar'
import imgLogo from '../images/location.png'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.3

export default class ChangeAddressForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _submitForm: props._submitForm,
      _cancel: props._cancel,
      currentAddress: props.address
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

  _cancel = () => {

  }

  render () {
    const { email, password, fullName } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    const isValid = email !== '' && password !== '' && fullName !== ''
    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {'Location Information'}
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
        </View>
        <View style={styles.container}>
          <View style={styles.form} ref={(ref) => this.formRef = ref}>
            <CustomTextInput
              ref={(ref) => this.nameInputRef = ref}
              placeholder={'Street Address'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.nameInputRef.focus()}
              onChangeText={(value) => this.setState({ street: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              ref={(ref) => this.mobileInputRef = ref}
              placeholder={'City'}
              editable={!isLoading}
              returnKeyType={'done'}
              secureTextEntry={false}
              withRef={true}
              onChangeText={(value) => this.setState({ city: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              ref={(ref) => this.emailInputRef = ref}
              placeholder={'State'}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.emailInputRef.focus()}
              onChangeText={(value) => this.setState({ state: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              ref={(ref) => this.passwordInputRef = ref}
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
                onPress={this.props._submitForm}
                isEnabled={isValid}
                isLoading={isLoading}
                buttonStyle={styles.createAccountButton}
                textStyle={styles.createAccountButtonText}
                text={'Save Changes'}
              />
            </View>
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
