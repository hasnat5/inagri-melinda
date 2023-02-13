import React, { useLayoutEffect, useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TextInput, View } from 'react-native'
import Checkbox from 'expo-checkbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

const Login = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const [isChecked, setChecked] = useState(false);
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = useState('natttt@gmail.com')
    const [password, setPassword] = useState('qwer')
    const { login } = useContext(AuthContext)


    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, [])

    return (
        <View
            style={{
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
            className='flex h-full bg-primary6 justify-center items-center'
        >
            <View className='bg-primary1 py-[18px] px-6 w-9/12 rounded-lg'>
                <Text className='font-labelBold text-2xl text-primary6 mb-6 text-center'>Login</Text>

                <Text className='mb-1.5 text-[8px] font-labelBold text-[#00000080]' style={{ lineHeight: 12 }}>Masukkan dan lengkapi data berikut</Text>

                {/* EMAIL INPUT */}
                <View className='w-full mb-4'>
                    <TextInput className='w-full bg-white p-2 rounded-xl border border-[#D2D2D2] font-labelBold text-[10px]' placeholder="user@gmail.com" value={email} onChangeText={(text) => setEmail(text)} />
                </View>

                {/* PASSWORD INPUT */}
                <View className='w-full mb-5'>
                    <TextInput className='w-full bg-white p-2 rounded-xl border border-[#D2D2D2] font-labelBold text-[10px]' placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />

                    {/* <Input w={{
                        base: "75%",
                        md: "25%"
                    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" /> */}
                </View>

                {/* INGAT & LUPA SANDI */}
                <View className='flex-row justify-between items-center mb-16'>

                    <View className='flex-row items-center'>
                        <Checkbox
                            // style={styles.checkbox}
                            className='mr-1.5'
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#94D60A' : undefined}
                        />
                        <Text className='font-labelBold text-[10px] text-[#00000080]'>Ingat Saya</Text>
                    </View>

                    <View>
                        <Text className='text-primary6 font-labelBold text-[10px]'>Lupa kata sandi?</Text>
                    </View>
                </View>

                <Pressable className='mb-3 bg-primary6 py-2 rounded-lg w-full' onPress={() => login(email, password)}>
                    <Text className='text-center font-labelSemiBold text-xs text-primary1'>Masuk</Text>
                </Pressable>

                <Text className='font-labelReguler text-[10px] text-center'>
                    Belum punya akun?

                    <Text className='text-primary6' onPress={() => navigation.navigate('Register')}> Daftar disini</Text>
                </Text>

            </View>

            <StatusBar style="auto" />
        </View >

    )
}

export default Login