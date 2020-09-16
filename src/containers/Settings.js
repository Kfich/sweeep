import React, {
  Component
} from 'react';
import { Image } from 'react-native-animatable';
import imgLogo from '../images/logo.png';
import metrics from '../metrics';
import { Alert, StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, AppRegistry} from 'react-native';
import ImageButton from '../components/ImageButton';
import {kSilver, kBaseBlue, kLightText} from '../Colors';
import firebase from 'firebase';
import {
  Cell,
  Section,
  TableView
} from 'react-native-tableview-simple';

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

export default class Settings extends Component<{}> {

  componentDidMount(){
      // Test nav
      console.log("Settings: Data ", this.props.navigation.state.params)
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

  showTerms = () => {
    this.props.navigation.navigate('Webviewer');
  };

  showEditAccount = () => {
    this.props.navigation.navigate('EditAccount', {currentUser: this.state.currentUser});
  };

  showContactUs = () => {
    this.props.navigation.navigate('ContactUs');
  };

  logout = () => {
    // Unauth on firebase
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      this.props.navigation.navigate('Auth');

    }).catch(function(error) {
      // An error happened.
      Alert.alert(
       'Please try again',
       'An error occured logging out',
       [
           {text: 'Ok', onPress: () => console.log('OK Pressed')},
         ],
       { cancelable: false }
    )
    });

  };

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
          <Text style={styles.toolbarTitle}>Settings</Text>
          <View style = {{marginLeft : 8, height: 20, width: 20}}></View>
        </View>
      <ScrollView contentContainerStyle={styles.stage}>
          <View style={{
            backgroundColor: '#ffffff',
            flex: 1.0,
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
              <Cell title="Edit Account Info" titleTextColor={kBaseBlue} onPress={this.showEditAccount}/>
              <Cell title="Appointment History" titleTextColor={kBaseBlue} onPress={this.showEditAccount}/>
              <Cell title="Contact Us" titleTextColor={kBaseBlue} onPress={this.showContactUs}/>
              <Cell title="Terms & Conditions" titleTextColor={kBaseBlue} onPress={this.showTerms}/>
              <Cell title="Logout" titleTextColor={kBaseBlue} onPress={this.logout}/>
            </Section>
          </TableView>
      </ScrollView>
    </View>
    );
  }
};
