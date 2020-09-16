import { StyleSheet } from 'react-native';
import React from 'react';
import {PropTypes} from 'prop-types';
import { Image, View } from 'react-native-animatable';
import metrics from '../metrics';


import Onboarding from 'react-native-onboarding-swiper';

const IMAGE_WIDTH = metrics.DEVICE_WIDTH


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 0.75,
    backgroundColor: "#1E3B63",
    height: metrics.DEVICE_HEIGHT/2,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: '#1E3B63'
  }
})

_test = () => {

  console.log("The button was pressed on done");
}

 propTypes = {
  test: PropTypes.func
}


const Onboard = () => (
  <Onboarding
    pages={[
      {
        backgroundColor: '#1E3B63',
        image: <Image
                  animation={'bounceIn'}
                  duration={1200}
                  delay={200}
                  style={styles.logoImg}
                  source={require('../images/logo_white.png')}
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
                  source={require('../images/logo_white.png')}
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
                  source={require('../images/logo_white.png')}
                   />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
    onDone = {()=>console.log("The shit is done")}

  />
);

export default Onboard;
