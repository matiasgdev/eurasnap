import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TamaguiProvider} from 'tamagui';

import {PhotoProvider} from './src/store/PhotoStore';
import {HomeScreen} from './src/screens/HomeScreen';

import tamaguiCfg from './tamagui.config';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <TamaguiProvider config={tamaguiCfg}>
          <PhotoProvider>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                options={{headerShown: false}}
                name="Home"
                component={HomeScreen}
              />
            </Stack.Navigator>
          </PhotoProvider>
        </TamaguiProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
