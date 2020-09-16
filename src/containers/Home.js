import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'react-native-animatable';
import NavBar from '../components/Navbar';
import CustomButton from '../components/CustomButton';
import { Col, Row, Grid } from "react-native-easy-grid";
import imgLogo from '../images/logo_white.png';
import metrics from '../metrics';
import firebase from 'firebase';
import Modal from 'react-native-modal';
import AppointmentDetails from './AppointmentDetails';


const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.5

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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3B63',
    paddingVertical: 10
  },
  buttonContainer: {
    flex: 1,
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccountButton: {
    backgroundColor: '#1E3B63',
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
    marginVertical: 10
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasActiveAppointments: false,
      isModalVisible: false,
    }

    const rootRef = firebase.database().ref();
    this.appointmentRef = rootRef.child('orders');

  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  form = () => {
     return (
       <AppointmentDetails />
   )}

  showScheduler = () => {
    this.props.navigation.navigate('Schedule', {currentUser: this.state.currentUser});
  };

  _toSettings = () => {
    this.props.navigation.navigate('Settings', {currentUser: this.state.currentUser});
  };

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })


  fetchUserAppointments = () => {

    this.appointmentRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        console.log("The trans", child.val());

        if (child.val().userId != null) {
          if (child.val().userId === this.state.currentUser.userId && child.val().status != 'complete') {
            items.push({
              trans: child.val()
            });

            // Set state to render view
            this.setState({
              hasActiveAppointments: true,
            });

          }
        }

      });

      this.setState({
        appointmentList: items,
        activeAppointment: items[0]
      });

      console.log("The appointments ", this.state.appointmentList)

      this.setState({
        activeAppointment: this.state.appointmentList[0]
      });

      console.log("The active appointment", this.state.activeAppointment);

    });
  }

  componentDidMount(){
      // Test nav
      console.log("Home: Data ", this.props.navigation.state.params)
      // Set current user
      this.setState({
          currentUser: this.props.navigation.state.params.currentUser,
          username: this.props.navigation.state.params.currentUser.name
      })
      //console.log("Home: Data user ", this.state.currentUser)
      this.fetchUserAppointments()
  }

  render() {
    return (
      <View style={styles.containerMain}>
        <NavBar
          title = {`Welcome, ${this.props.navigation.state.params.currentUser.name}`}
          hasImages = {true}
          leftButtonHidden = {true}
          rightButtonAction = {this._toSettings}
          rightButtonHidden = {false}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 0.05 }}>
            <Text onPress={this._hideModal} style={{color: 'white'}}>
                Done
            </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <AppointmentDetails
                _cancel = {this._hideModal}
                activeAppointment = {this.state.activeAppointment}
            />
          </View>
        </Modal>
        <Grid>
            <Row style={styles.logoContainer} size={0.5}>
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
            </Row>
            <Row style={styles.containerTop} size={1}>
              <Text style={styles.titleText}>{this.state.hasActiveAppointments ? `You have 1 active appointment`  : 'You have no active appointments'}</Text>
              <View style={styles.buttonContainer}>
                <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                  <CustomButton
                    onPress={this.state.hasActiveAppointments ? this._showModal : this.showScheduler}
                    isEnabled={true}
                    isLoading={false}
                    buttonStyle={styles.createAccountButton}
                    textStyle={styles.createAccountButtonText}
                    text={this.state.hasActiveAppointments ? `Click to View`  : 'Schedule Now'}
                  />
                </View>
              </View>
            </Row>
            <Row style={styles.containerBottom} size={1.5}>
          </Row>
        </Grid>
      </View>
    );
  }
}
