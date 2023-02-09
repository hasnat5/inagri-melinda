import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Tabs from './navigation/tabs'
import { useEffect } from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import { NativeBaseProvider } from "native-base";
import ProfileScreen from './screens/ProfileScreen';


export default function App() {
  const [fontsLoaded] = useFonts({
    labelReguler: require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    labelSemiBold: require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    labelMedium: require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
    labelBold: require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    // visbyBold: require('./assets/font/visbycf-bold.otf'),
    // visbyMedium: require('./assets/font/visbycf-medium.otf'),
    // visbyRegular: require('./assets/font/visbycf-regular.otf'),
    // visbyThin: require('./assets/font/visbycf-thin.otf'),
  });

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare()
  // }, [])

  if (!fontsLoaded) {
    return null;
  }
  // `else {
  //   SplashScreen.hideAsync()
  // }`

  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>

  );
}

