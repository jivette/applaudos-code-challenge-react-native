import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen/HomeScreen';
import SerieScreen from './views/SerieScreen/SerieScreen';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
library.add(fab);

const Stack = createStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const LoadFonts = async () => {
    setIsLoading(true);
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsLoading(false);
  }
  useEffect(() => {
    LoadFonts();
  }, []);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={styleHeader} />
        <Stack.Screen name="Detail" component={SerieScreen} options={styleHeader} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styleHeader = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: '#fff',
}