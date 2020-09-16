import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
});

export default class LoadingIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      indeterminate: true,
      isVisible: true,
      loadStyle: props.loadStyle,
      promptText: props.promptText
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount(){
    this.setState({
      progress: 0,
      indeterminate: true,
      isVisible: false
    });

    console.log("Progress State", this.state);
  }


  dismiss(){
      return(
        null
      );
  }

  animate() {
    let progress = 0;

    this.setState({ progress });

    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
      }, 100);
    }, 8000);
  }

  render() {

    if (this.state.isVisible){

      if (this.state.loadStyle === 'PIE') {

        return (
          <View style={styles.container}>
              <Progress.Pie
                style={styles.progress}
                progress={this.state.progress}
                indeterminate={this.state.indeterminate}
                size={150}
              />
              <Text>{this.state.promptText}</Text>
          </View>
        );

      } else if (this.state.loadStyle === 'CIRCLE') {

        return(
          <View style={styles.container}>
            <Progress.Circle
              style={styles.progress}
              progress={this.state.progress}
              indeterminate={this.state.indeterminate}
              size={150}
              />
            <Text>{this.state.promptText}</Text>
          </View>
        );
      }else if (this.state.loadStyle === 'CIRCLE-COUNTERWISE') {

        return(
            <View style={styles.container}>
              <Progress.Circle
                style={styles.progress}
                progress={this.state.progress}
                indeterminate={this.state.indeterminate}
                size={150}
                />
              <Text>{this.state.promptText}</Text>
            </View>
        );
      }else if (this.state.loadStyle === 'BAR') {

        return(
            <View style={styles.container}>
              <Progress.Bar
                style={styles.progress}
                progress={this.state.progress}
                indeterminate={this.state.indeterminate}
              />
              <Text>{this.state.promptText}</Text>
            </View>
        );
      }else if (this.state.loadStyle === 'SNAIL') {

        return(
            <View style={styles.container}>
              <Progress.CircleSnail
                style={styles.progress}
                size={150}
                color={['#F44336', '#2196F3', '#009688',]}
              />
              <Text>{this.state.promptText}</Text>
            </View>
        );
      }

    }else{

      return(
        null
      );

    }
  }
}
