import React, { Component } from 'react'
import { StyleSheet, Switch } from 'react-native'
import { Text, View, Image } from 'react-native-animatable'
import { PropTypes } from 'prop-types'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../metrics'
import NavBar from '../../components/Navbar'
import imgLogo from '../../images/sweeep_home.png'
import Stepper from 'react-native-ios-stepper'
import { Col, Row, Grid } from "react-native-easy-grid"
import * as firebase from 'firebase'


const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.3

export default class HomeInfoForm extends Component {

  static propTypes = {

  }

  state = {
    email: ''

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
    console.log("Current User ", this.props.navigation.state.params)

    this.state.currentUser = this.props.navigation.state.params.currentUser
    this.state.userAddress = this.props.navigation.state.params.userAddress

    uID = this.props.navigation.state.params.currentUser.userId
    // Init ref to DB
    const rootRef = firebase.database().ref();
    this.addressRef = rootRef.child('users/' + uID);
  }

  _goHome = () => {
    // Validate form
    homeInfo = {
      apartmentSelected: (this.state.apartmentSelected == null) ? false : this.state.apartmentSelected,
      houseSelected: (this.state.houseSelected == null) ? false : this.state.houseSelected,
      rooms: this.state.rooms,
      baths: this.state.baths
    }

    this.addressRef.update({ homeInfo })

    // Navigate
   this.props.navigation.navigate('Home', {currentUser: this.state.currentUser, userAddress: this.state.userAddress, homeInformation: homeInfo});
 }

  render () {
    const { email, password, fullName } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    const isValid = email !== '' && password !== '' && fullName !== ''
    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {'Tell Us About Your Home'}
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
            <View style={{justifyContent: 'center'}} style={styles.footer}>
                <View style={{flexDirection: 'row'}}>
                   <Text style={{flex: 0.75, color: 'white', paddingVertical: 10}}>Apartment?</Text>
                   <Switch value={this.state.apartmentSelected} tintColor={'#fff'} onValueChange={(value) => this.setState({apartmentSelected:value})}/>
                 </View>
                 <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 0.75, color: 'white',  paddingVertical: 5}}>Residential Home?</Text>
                    <Switch value={this.state.houseSelected} tintColor={'#fff'} onValueChange={(value) => this.setState({houseSelected:value})}/>
                  </View>
             </View>
            <View style={{flexDirection: 'row'}} style={styles.footer}>
                <Text style={{flex: 0.5, color: 'white'}}>How many rooms does your home have?</Text>
                <View style={{flexDirection: 'row'}}>
                   <Text style={{flex: 0.75, color: 'white'}}>{this.state.rooms}</Text>
                   <Stepper color={'#fff'} maxValue={10} onPress={(index) => this.setState({rooms:index})}/>
                 </View>
             </View>
             <View style={{flexDirection: 'row'}} style={styles.footer}>
                 <Text style={{flex: 0.5, color: 'white'}}>How many bathrooms does your home have?</Text>
                 <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 0.75, color: 'white'}}>{this.state.baths}</Text>
                    <Stepper color={'#fff'} maxValue={10} onPress={(index) => this.setState({baths:index})}/>
                  </View>
              </View>
          </View>
          <View style={styles.footer}>
            <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
              <CustomButton
                onPress={this._goHome}
                isEnabled={true}
                isLoading={isLoading}
                buttonStyle={styles.createAccountButton}
                textStyle={styles.createAccountButtonText}
                text={'Create Account'}
              />
            </View>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.loginLink}
              onPress={this._goHome}
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
  stepper: {
    color: '#ffffff',
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
