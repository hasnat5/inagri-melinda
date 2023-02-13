import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from "native-base";
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';


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

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare()
  }, [])

  if (!fontsLoaded) {
    return null;
  }
  else {
    SplashScreen.hideAsync()
  }



  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <AppNav />
        </AuthProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>

  );
}

