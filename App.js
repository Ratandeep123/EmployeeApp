import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants';
import Home from './screens/Home'
import Profile from './screens/Profile'
import CreateEmployee from './screens/CreateEmployee'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const myOptions = {

  title: "My Sweet Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff",
  }
}
function App() {
  return (
    <View style={styles.container}>

      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={myOptions}
        />
        <Stack.Screen
          name="CreateEmployee"
          component={CreateEmployee}
          options={{ ...myOptions, title: "Create Employee" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: "Profile" }}
        />

      </Stack.Navigator>

    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'white',
    // marginTop: Contants.statusBarHeight,

    justifyContent: 'center',
    // alignItems: "center"

  },
});