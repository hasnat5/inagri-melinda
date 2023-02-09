import React, { useEffect, useState } from 'react'
import { Text, View, Button } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';

const ScanScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

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
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
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
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
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
            className='h-screen'
            style={{
                // Paddings to handle safe area
                // paddingTop: insets.top,
                // paddingBottom: insets.bottom,
            }}>


            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                className='w-full h-full'
            />
            {/*             
            <View className='bg-primary6 items-center justify-center h-96 w-80 overflow-hidden rounded-3xl'>
            </View> */}

            <View className='absolute bg-red-400 mx-auto bottom-14'>
                <Text>ScanScreen</Text>
                <Text className='text-xl m-5'>{text}</Text>
                {scanned && navigation.navigate('Katalog') && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>


            <StatusBar style="dark" />
        </View>

    )
}

export default ScanScreen