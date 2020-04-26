import React from 'react';
import {View, Button, ScrollView, Text, Slider, TextInput, Input, Form, Modal, StyleSheet, Switch} from 'react-native'
import {Constants} from 'expo'
import ChangeColor from './vibrate.js';
import vib from './vibrate.js';

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50
  },
  fill: {
    flex: 1,
  },
  heading_count: {
    fontSize: 54,
    textAlign: 'center',
  },
  heading_title: {
    fontSize: 36,
    textAlign: 'center',
  }
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      minutes: 25,
      seconds: 0,
      timer_command: "Start",
      work_or_rest: "work",
      pause: false,
    }
  }
 

  pad_number(number){
    if(number < 10){
      return "0" + number;
    }
    else{
      return number;
    }
  }

  decrement = () => { 
      if(this.state.seconds == 0 && this.state.minutes == 0){
        this.setState({minutes: 5, seconds: 0});
        if(this.state.work_or_rest == "work"){
          this.setState(prevState => ({work_or_rest: "rest"}));
        }
        else{
          this.setState(prevState => ({work_or_rest: "work"}));
        }
        vib();
        alert("Time to " + this.state.work_or_rest);
      }
      else if(this.state.seconds == 0){
        this.setState({
          minutes: this.state.minutes - 1, seconds: 59
        })
      }
      else{
        this.setState({
          seconds: this.state.seconds - 1
        })
      }
  }

  timer = (command) => {
    if(command == "run"){
      if(!this.state.pause){
        this.counter = setInterval(this.decrement, 1000);
        this.setState(prevState => ({pause: !prevState.pause}));    
        this.setState(prevState => ({timer_command: "Pause"}));    
      }
      else{
        clearInterval(this.counter);
        this.setState(prevState => ({pause: !prevState.pause}));
        this.setState(prevState => ({timer_command: "Restart"}));
      }
    }
    else{
        clearInterval(this.counter);
        this.setState(prevState => ({pause: false}));
        this.setState(prevState => ({timer_command: "Start"}));
        this.setState(prevState => ({minutes: 25, seconds: 0}));
    }    
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={[styles.appContainer, styles.fill]}>      
        <Text style={styles.heading_title}>Pomodoro</Text>
       <Button onPress={() => this.timer("run")} title={this.state.timer_command} />
        <Button onPress={() => this.timer("reset")} title="Reset"/>
        <Text style={styles.heading_count}>
          {this.pad_number(this.state.minutes)}:{this.pad_number(this.state.seconds)}
        </Text> 
        <Text style={styles.heading_title}>
          {this.work_or_rest}
        </Text>
      </View>
      </ScrollView>
    )
  }
}