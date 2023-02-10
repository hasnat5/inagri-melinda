import React, { useEffect, useState } from 'react'
import { Text, View, Button, Pressable, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';

const ScanScreen = ({ navigation }) => {
    // const insets = useSafeAreaInsets();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet Scanned');

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status == 'granted')
        })()
    }

    //REQUEST CAMERA PERMISSION
    useEffect(() => {
        askForCameraPermission()
    }, [])


    //WHAT HAPPEN WHEN WE SCAN THE BARCODE
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
    }

    //CHECK PERMISSION AND RETURN THE SCREEN
    if (hasPermission === null) {
        return (
            <View
                style={{
                    // Paddings to handle safe area
                    // paddingTop: insets.top,
                    // paddingBottom: insets.bottom,
                }}>

                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View
                style={{
                    // Paddings to handle safe area
                    // paddingTop: insets.top,
                    // paddingBottom: insets.bottom,
                }}>

                <Text>NO ACCESS TO CAMERA</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    const pindah = () => {
        navigation.navigate('Katalog')
    }

    return (
        <View
            className='bg-[#F0F0F0] h-screen flex'
            style={{
                // Paddings to handle safe area
                // paddingTop: insets.top,
                // paddingBottom: insets.bottom,
            }}>

            <View className='p-4 bg-white'>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    className='h-full w-full flex-grow '

                />
            </View>


            <View className='py-2 px-9 flex-grow'>
                <Pressable className='rounded-lg bg-primary6 py-1'>
                    <Text className='font-labelBold text-base text-center text-white'>Masukkan ID mesin</Text>
                </Pressable>
            </View>


            {/*             
            <View className='bg-primary6 items-center justify-center h-96 w-80 overflow-hidden rounded-3xl'>
            </View> */}

            <StatusBar style="auto" />
        </View>

    )
}

export default ScanScreen