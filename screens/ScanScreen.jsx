import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Button, Pressable, Alert } from 'react-native'
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native';
import { BASE_URL } from '../config';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScanScreen = ({ navigation }) => {
    // const insets = useSafeAreaInsets();

    const { userInfo } = useContext(AuthContext)

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
        // apiScan()
        // console.log(`useState mesin menampilkan ${mesin}`)
    }, [])

    //WHAT HAPPEN WHEN WE SCAN THE BARCODE
    const handleBarCodeScanned = ({ type, data }) => {
        setMesin(data, apiScan())
        console.log('Type: ' + type + '\nData: ' + data)
        console.log(`useState mesin menampilkan ${mesin}`)
        // apiScan()
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
                // id_mesin: '63e5accbf67447ffa5bae5e3',
                // id_pengguna: '63ec4e960098938a9604ee38'
                id_mesin: mesin,
                id_pengguna: userInfo._id,
            };
            const response = await axios.put(`${BASE_URL}mesin/scan`, change);
            console.log(response.data)
            Alert.alert(`${response.data.message}`)

        } catch (error) {
            // console.error('QR code tidak valid', error);
            Alert.alert('QR code tidak valid')
        }

    }


    // const apiScanNat = () => {
    //     axios.put(`${BASE_URL}mesin/scan`, {
    //         id_mesin: '63e5accbf67447ffa5bae5e3',
    //         id_pengguna: '63ec4e960098938a9604ee38'
    //     })
    //         .then(function (response) {
    //             console.log(response.data)
    //             Alert.alert(`${response.data.message}`)
    //         })
    //         .catch(function (error) {
    //             // console.error('QR code tidak valid', error);
    //             Alert.alert(`QR code tidak valid ${error}`)
    //         });
    // }

    const apiScanDelete = () => {
        const change = {
            "id_mesin": "63e5accbf67447ffa5bae5e3",
            "id_pengguna": ""
        };
        axios.put(`${BASE_URL}mesin/scan`, change)
            .then(response => {
                console.log(response.data)
                Alert.alert(`User terhapus ${response.data.message}`)
            })
            .catch(error => {
                // this.setState({ errorMessage: error.message });
                console.error('error masbro', error);
            });

        // axios({
        //     method: 'PUT',
        //     url: `${BASE_URL}mesin/scan`,
        //     data: {
        //         change
        //     },
        //     validateStatus: (status) => {
        //         return true; // I'm always returning true, you may want to do it depending on the status received
        //     },
        // }).catch(error => {
        //     console.log(error)

        // }).then(response => {
        //     // this is now called!
        //     console.log(response.data)
        //     Alert.alert(`${response.data.message}`)
        // });
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