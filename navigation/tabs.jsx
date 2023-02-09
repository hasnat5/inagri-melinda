import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLayoutEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import CatalogScreen from '../screens/CatalogScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <Pressable
        className='justify-center items-center -top-[18px]'
        onPress={onPress}
    >
        <View className='h-[60px] w-[60px] rounded-[30px] bg-primary6 border-2 border-white'>
            {children}
        </View>

        <Text className="text-primary6 mt-1 font-labelReguler" style={{ fontSize: 8, lineHeight: 12 }}>Scan QR</Text>
    </Pressable>
)

const Tabs = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <Tab.Navigator
            initialRouteName={HomeScreen}
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'rgb(74, 222, 128)',
                tabBarLabelStyle: {
                    fontSize: 8,
                    lineHeight: 12,
                    paddingBottom: 6,
                },
                tabBarStyle: {
                    height: 56,
                    elevation: 0
                },
                headerShown: false,


            }}
        >
            <Tab.Screen name="Beranda" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className="items-center justify-center">
                            <Image
                                source={require('../assets/icon/HomeIcon.png')}
                                resizeMode='cover'
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#94D60A' : '#D2D2D2',
                                }}
                            />
                            <Text className="mt-1 font-labelReguler" style={{ color: focused ? 'black' : '#D2D2D2', fontSize: 8, lineHeight: 12 }}>Beranda</Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen name="Scan QR" component={ScanScreen}
                options={{

                    tabBarIcon: () => (
                        <View className='items-center justify-center'>
                            <Image
                                source={require('../assets/icon/ScanIcon.png')}
                                resizeMode='cover'
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                            />

                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )

                }}
            />

            <Tab.Screen name="Katalog" component={CatalogScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className='items-center justify-center'>
                            <Image
                                source={require('../assets/icon/CatalogIcon.png')}
                                resizeMode='cover'
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#94D60A' : '#D2D2D2',
                                }}
                            />
                            <Text className="mt-1 font-labelReguler" style={{ color: focused ? 'black' : '#D2D2D2', fontSize: 8, lineHeight: 12 }}>Katalog</Text>
                        </View>
                    ),
                }} />
        </Tab.Navigator >
    );
}

export default Tabs