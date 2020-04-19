import React from 'react';
import { StyleSheet, Text, View,ScrollView,Image ,AsyncStorage, Alert} from 'react-native';
import { TextInput,Card,List,Title } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient'
import Myheader from './header'
class Homescreen extends React.Component {

    state={
        info:{
               name:'Loading',
               temp:'loading',
               desc:'loading',
               humidity:'loading',
               icon:'loading'

        }
    }

   async getweather(){
       let Mycity=await AsyncStorage.getItem('Mycity');
       if(!Mycity)
       Mycity=this.props.navigation.getParam('city','dasuya');
       console.log(Mycity)

       
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&APPID=7ffb2e2bd4aa8e2b0e22bb96f85a87f8

        `)
        .then(data=>data.json())
        .then(res=>{
            if(res.cod=="404")
            Alert.alert('Invalid city.Enter a valid city')
            else{
            this.setState(()=>{console.log(res)

                return{info:
                    {name:res.name,
                        temp:res.main.temp,
                        desc:res.weather[0].description,
                        humidity:res.main.humidity,
                        icon:res.weather[0].icon


                    

                              

                }

                }
            })}
        }).catch(err=>{console.log('error')
            Alert.alert("Error:"+err.message+":please connect to internet")
        })

    }
componentDidMount()
{
    this.getweather()
}

  render(){
      
      let Mycity=this.props.navigation.getParam('city');
      if(Mycity)
      this.getweather()
  
  return (
    <View style={styles.container}>
      <Myheader title="current-weather"/>
       <Card style={{margin:20,marginTop:80}}>
           <LinearGradient colors={['#021B79','#0575E6']}>
           <View style={{padding:20,alignItems:"center"}}>
               <Title style={{textAlign:"center",fontSize:25, color:'#cce6ff'}}>{this.state.info.name}</Title>
               <Image style={{height:120,width:120}} 
               source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}} />
               <Title style={styles.text}>Temperature : {this.state.info.temp}°C</Title>
               <Title style={styles.text}>Description : {this.state.info.desc}</Title>
               <Title style={styles.text}>Humidity : {this.state.info.humidity}%</Title>
         </View>
     </LinearGradient>
       </Card>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
 
  },
  text:{
      textAlign:"center",
      marginBottom:10,
      color:'white',
      fontSize:22,
 
  }
  
});
export default Homescreen