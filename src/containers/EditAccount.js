import React, {
  Component
} from 'react';
import { Image } from 'react-native-animatable';
import imgLogo from '../images/user-sweeep.png';
import metrics from '../metrics';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, AppRegistry} from 'react-native';
import ImageButton from '../components/ImageButton';
import {kSilver, kBaseBlue, kLightText} from '../Colors';
import Modal from 'react-native-modal';
import {  Cell, Section, TableView } from 'react-native-tableview-simple';
import firebase from 'firebase';
import ChangeAddressForm from '../components/ChangeAddressForm';
import EditHomeInfoForm from './EditHomeInfo';
import EditProfileForm from './EditProfileInfo';


const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

// Page Styling
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1.0,
    backgroundColor: '#EFEFF4',
  },
  stage: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20,
    paddingTop: 0,
    flex: 0.8

  },
  toolbar:{
    backgroundColor:'#ffffff',
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'row'    //Step 1
  },
  toolbarButton:{
    width: 60,            //Step 2
    color:'#2d49e7',
    textAlign:'center',
    fontFamily: 'Avenir'
  },
  toolbarButtonClear:{
    width: 60,            //Step 2
    color:'#fff',
    textAlign:'center',
    opacity: 0
  },
  toolbarTitle:{
    textAlign:'center',
    fontSize: 18,
    color: kBaseBlue,
    fontFamily: 'Avenir',
    flex:1                //Step 3
  },
  containerBottom: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    borderWidth: 0.25,
    borderColor: kLightText

  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flex: 1
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  }
});

export default class EditAccount extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      isAddressModalVisible: false,
      isProfileModalVisible: false,
      isHomeInfoModalVisible: false
    }

    const rootRef = firebase.database().ref();
    this.appointmentRef = rootRef.child('users');

  }

  componentDidMount(){
      // Test nav
      console.log("Edit Account: Data ", this.props.navigation.state.params)
      // Set current user
      this.setState({
          currentUser: this.props.navigation.state.params.currentUser
      })

  }


  // Custom Methods
  // --------------------------

  goBack = () => {
    this.props.navigation.goBack();
  };

  showChangeProfile = () => {
    this.setState({ isProfileModalVisible: true })
  };

  hideChangeProfile = () => {
    this.setState({ isProfileModalVisible: false })
  };

  showChangeHome = () => {
    this.setState({ isHomeInfoModalVisible: true })
  };

  hideChangeHome = () => {
    this.setState({ isHomeInfoModalVisible: false })
  };

  showChangeAddress = () => {
    this.setState({ isAddressModalVisible: true })
  };
  hideChangeAddress = () => {
    this.setState({ isAddressModalVisible: false })
  };

  submitAddressChange = () => {
    // Present success modal
    // Drop popup
    this.hideChangeAddress()
  }

  submitHomeInfoChange = () => {
      // Present success modal
      // Drop popup
      this.hideChangeHome()
  }

  submitProfileChange = () => {
      // Present success modal
      // Drop popup
      this.hideChangeProfile()
  }

  // PageSetup
  render() {
    return (
      <View style={styles.mainContainer} >
        <View style={styles.toolbar}>
          <View style = {{marginLeft : 12, height: 20, width: 20, paddingTop: 5}}>
              <ImageButton style = {{marginRight : 8}}
                type = {'ARROW-BACK'}
                isRemoteImage = {false}
                height = {15}
                width = {15}
                imagePath = {'../images/gear_blue.png'}
                buttonAction = {this.goBack}
                backgroundColor = {'#ffffff'}
                titleColor = {'#D3D3D3'}
                borderRadius = {0}
              />
          </View>
          <Text style={styles.toolbarTitle}>Edit Account</Text>
          <View style = {{marginLeft : 8, height: 20, width: 20}}></View>
        </View>
        <Modal isVisible={this.state.isAddressModalVisible}>
          <View style={{ flex: 0.05 }}>
            <Text onPress={this.hideChangeAddress} style={{color: 'white'}}>
                Cancel
            </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <ChangeAddressForm
                ref={(ref) => this.changeAddressRef = ref}
                _submitForm = {this.submitAddressChange}
                _cancel = {this.hideChangeAddress}
                currentAddress = {this.address}
                currentUser = {this.state.currentUser}
            />
          </View>
        </Modal>
        <Modal isVisible={this.state.isHomeInfoModalVisible}>
          <View style={{ flex: 0.05 }}>
            <Text onPress={this.hideChangeHome} style={{color: 'white'}}>
                Cancel
            </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <EditHomeInfoForm
                ref={(ref) => this.changeHomeInfoRef = ref}
                submitHomeInfoChange = {this.submitHomeInfoChange}
                _cancel = {this.hideChangeHome}
                currentUser = {this.state.currentUser}
            />
          </View>
        </Modal>
        <Modal isVisible={this.state.isProfileModalVisible}>
          <View style={{ flex: 0.05 }}>
            <Text onPress={this.hideChangeProfile} style={{color: 'white'}}>
                Cancel
            </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <EditProfileForm
                ref={(ref) => this.changeProfileInfoRef = ref}
                _submitForm = {this.submitProfileChange}
                _cancel = {this.hideChangeHome}
                currentUser = {this.state.currentUser}
            />
          </View>
        </Modal>
      <ScrollView contentContainerStyle={styles.stage}>
          <View style={{
            backgroundColor: '#ffffff',
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Image
            animation={'bounceIn'}
            duration={1200}
            delay={200}
            ref={(ref) => this.logoImgRef = ref}
            style={styles.logoImg}
            source={imgLogo}
          />
          </View>
          <TableView>
            <Section>
              <Cell title="Basic Information" titleTextColor={kBaseBlue} onPress={this.showChangeProfile}/>
              <Cell title="Address Information" titleTextColor={kBaseBlue} onPress={this.showChangeAddress}/>
              <Cell title="Home Information" titleTextColor={kBaseBlue} onPress={this.showChangeHome}/>
            </Section>
          </TableView>
      </ScrollView>
    </View>
    );
  }
};
