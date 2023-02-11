import React, { useEffect, useState } from 'react'
import { Text, View, Button, Pressable } from 'react-native'
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import { TouchableOpacity } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScanScreen = ({ navigation }) => {
    // const insets = useSafeAreaInsets();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [mesin, setMesin] = useState('Not yet Scanned');

    const isFocused = useIsFocused();

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }

    //REQUEST CAMERA PERMISSION
    useEffect(() => {
        askForCameraPermission()
    }, [])

    //WHAT HAPPEN WHEN WE SCAN THE BARCODE
    const handleBarCodeScanned = ({ type, data }) => {
        console.log('Type: ' + type + '\nData: ' + data)
        setMesin(data)
        apiScan()
        navigation.navigate('Beranda')

    }

    //CHECK PERMISSION AND RETURN THE SCREEN
    if (hasPermission === null) {
        return (
            <View>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View>
                <Text>NO ACCESS TO CAMERA</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    async function apiScan() {
        try {
            const change = {
                "id_mesin": `${mesin}`,
                "id_pengguna": "63e5accbf67447ffa5bae5e3"
            };
            const response = await axios.put('https://fourtour.site/melinda/mesin/scan', change);
            console.log(response.data)
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const apiScanDelete = () => {
        const change = {
            "id_mesin": "63e5accbf67447ffa5bae5e3",
            "id_pengguna": ""
        };
        axios.put('https://fourtour.site/melinda/mesin/scan', change)
            .then(response => console.log(response.data.updateAt))
            .catch(error => {
                // this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }


    return (
        <View
            className='bg-white h-full flex justify-between'>

            {isFocused ? (
                <Camera
                    // scanned ? undefined :
                    barCodeScannerSettings={{
                        barCodeTypes: ['qr'],
                    }}
                    type={CameraType.back}
                    onBarCodeScanned={handleBarCodeScanned}
                    className='flex-grow m-4'

                />

            ) : null}

            <View className='bg-[#F0F0F0] py-2 px-9 justify-end'>
                <TouchableOpacity className='rounded-lg bg-primary6 py-2' onPress={apiScanDelete}>
                    <Text className='font-labelBold text-base text-center text-white'>Masukkan ID mesin</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>

    )
}

export default ScanScreen