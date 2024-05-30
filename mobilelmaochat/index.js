/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {name as appName} from './app.json';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ThemeProvider from './contexts/ThemeProvider';
import SocketContext from './contexts/SocketContext';
import GlobalVariables from './GlobalVariables';

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <ThemeProvider>
      <SocketContext.Provider value={GlobalVariables.socket}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignInPage">
              {(props) => <SignInPage {...props} />}
            </Stack.Screen>
            <Stack.Screen name="SignUpPage">
              {(props) => <SignUpPage {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SocketContext.Provider>
    </ThemeProvider>
  )
}

AppRegistry.registerComponent("mobilelmaochat", () => Main);
