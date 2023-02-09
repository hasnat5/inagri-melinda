import React, { useLayoutEffect } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Register = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    useLayoutEffect(() => {
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
                <Text className='font-labelBold text-2xl text-primary6 mb-6 text-center'>Daftar</Text>

                <Text className='mb-1.5 text-[8px] font-labelBold text-[#00000080]' style={{ lineHeight: 12 }}>Lengkapi data berikut</Text>

                {/* NAMA INPUT */}
                <View className='w-full mb-4'>
                    <TextInput className='w-full bg-white p-2 rounded-xl border border-[#D2D2D2] font-labelBold text-[10px]' placeholder="Nama" />
                </View>

                {/* NOMOR INPUT */}
                <View className='w-full mb-4'>
                    <TextInput className='w-full bg-white p-2 rounded-xl border border-[#D2D2D2] font-labelBold text-[10px]' placeholder="0812-3456-7891" />
                </View>

                {/* EMAIL INPUT */}
                <View className='w-full mb-4'>
                    <TextInput className='w-full bg-white p-2 rounded-xl border border-[#D2D2D2] font-labelBold text-[10px]' placeholder="user@gmail.com" />
                </View>

                {/* PASSWORD INPUT */}
                <View className='w-full mb-5'>
                    <TextInput className='w-full bg-white p-2 rounded-xl border border-[#D2D2D2] font-labelBold text-[10px]' placeholder="Password" secureTextEntry={true} />

                    {/* <Input w={{
                        base: "75%",
                        md: "25%"
                    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" /> */}
                </View>

                {/* PUNYA AKUN */}
                <Text onPress={() => navigation.navigate('Login')} className='text-[#00000080] font-labelReguler text-[10px] mb-16'>
                    Sudah punya

                    <Text className='text-primary6 font-labelBold'> akun</Text>
                    ?
                </Text>

                <Pressable className='mb-3 bg-primary6 py-2 rounded-lg w-full' onPress={() => navigation.navigate('Login')}>
                    <Text className='text-center font-labelSemiBold text-xs text-primary1'>Daftar</Text>
                </Pressable>

                <Text className='font-labelReguler text-[10px] text-center'>
                    Dengan mendaftar. saya menyetujui
                    <Text className='text-primary6 font-labelBold' onPress={() => navigation.navigate('Register')}> Syarat dan Ketentuan </Text>
                    serta
                    <Text className='text-primary6 font-labelBold' onPress={() => navigation.navigate('Register')}> Kebijakan Privasi</Text>
                    .
                </Text>

            </View>
        </View >
    )
}

export default Register