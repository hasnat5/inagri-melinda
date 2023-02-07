import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Tabs from './navigation/tabs'
import { useEffect } from 'react';

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

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

