import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { TextInput,Card,List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


import Searchscreen from './comp/Searchscreen'
import Homescreen from './comp/Homescreen'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
const TabNavigator = createBottomTabNavigator({
  "Current city": Homescreen,
  "Search city": Searchscreen,
},
{
  defaultNavigationOptions:(data)=>{
    return{
         tabBarIcon:(dat)=>{
           let myicon
           if(data.navigation.state.routeName==="Current city")
           {myicon='md-cloud'}
           else 
           {myicon='md-search'}
           return  <Ionicons name={myicon} size={32} color={dat.tintColor} />
 
         },
         tabBarOptions: {
           activeTintColor: 'white',
           inactiveTintColor: 'gray',
           activeBackgroundColor:'#6200ee',
           inactiveBackgroundColor:'#6200ee'

         }
 
 
    }
 
  }
  }
);

export default createAppContainer(TabNavigator);