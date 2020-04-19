import React from 'react';
import { StyleSheet, Text, View,ScrollView,AsyncStorage } from 'react-native';
import { TextInput,Card,List,Button } from 'react-native-paper';
import Myheader from './header'
class Searchscreen extends React.Component {
  state = {
    text: '',
    cities:[]
  };

  fetchcities=(text)=>{

    this.setState({text})
    if(text!='')
    
    {fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
    .then(data=>data.json())
    .then(city=>{
      this.setState(()=>{
        return{cities:city.RESULTS.slice(0,9)

        }
      })
    })}
    else
    {
        this.setState({cities:[]})
    }
}

  

  list=(city)=>{

    AsyncStorage.setItem('Mycity',city)
    this.setState(()=>{
        return{text:city

        }
    })
    
    this.props.navigation.navigate('Current city',{city:this.state.text})
    
  }
  clicked=()=>{
      console.log('clicked')
      AsyncStorage.setItem('Mycity',this.state.text)
      this.props.navigation.navigate('Current city',{city :this.state.text})
      
  }
  render(){
    let rendercity;
    console.log(this.state.text)
    
    if(this.state.cities.length>0)
    rendercity=this.state.cities.map((city)=>{
      return (
        <Card style={{margin:5}}  onPress={()=>{this.list(city.name)}}>
        <List.Item title={city.name} key={city.id} />
        </Card>
      )
    })
  return (
    <View style={styles.container}>
      <Myheader title="Search city"/>
      <TextInput
        label='search location'
        value={this.state.text}
        onChangeText={text=>this.fetchcities(text)}
        mode="outlined"
      />
    <Button  style={{margin:10}} mode="contained" onPress={()=>this.clicked()}>
    save changes
  </Button>
     <ScrollView>{rendercity}</ScrollView>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
 
  },
});
export default Searchscreen