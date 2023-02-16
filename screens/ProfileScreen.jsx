import React, { useLayoutEffect, useState, useContext } from 'react'
import { Image, View, Text, Alert, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
    // const [quote, setQuote] = useState('')
    // const [people, setPeople] = useState('')
    const { logout } = useContext(AuthContext)
    const { userInfo, userToken } = useContext(AuthContext)


    // async function getQuote() {
    //     try {
    //         const response = await axios.get('https://fadhli.pythonanywhere.com/minyak/');
    //         console.log(response.data.results);
    //         setMinyak(response.data.results)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Profil',
            headerRight: () => (
                <Pressable
                    onPress={() => {
                        Alert.alert(
                            'Peringatan',
                            'Anda yakin ingin keluar?',
                            [
                                {
                                    text: 'Batal',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                { text: 'Ya', onPress: () => logout() },
                            ]
                        );

                    }}
                    title="Info"
                    color="#000"
                >
                    <Icon name='logout' size={24} color='#fff' />
                </Pressable>),
            headerStyle: {
                backgroundColor: '#94D60A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'labelBold',
            },
        });

    }, [])


    return (
        <View className='py-5 px-4'>

            {/* FOTO */}
            <View className='justify-center items-center mb-5'>
                <Image
                    className='w-24 h-24 rounded-full mb-1.5'
                    source={{
                        uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    }}
                />
                <Text className='font-labelSemiBold text-primary6 text-xs'>Ubah foto profil</Text>

            </View>

            {/* INFORMASI */}
            <View className='mb-11'>

                {/* NOMOR TELEPON */}
                <View className='flex-row justify-between items-center gap-6 mb-6'>
                    <Icon name='phone' size={24} className='mr-4' color={'#BDBDBD'} />

                    <View className='flex-1 flex-row justify-between border-b-[1px] border-neutral5'>
                        <View>
                            <Text className='font-labelSemiBold text-sm mb-2'>Nomor Telepon</Text>
                            <Text className='font-labelReguler text-xs mb-1.5'>{userInfo.phone}</Text>
                        </View>

                        <Pressable className='self-center'>
                            <Icon name='chevron-right' size={24} color={'#BDBDBD'} />
                        </Pressable>
                    </View>
                </View>

                {/* NAMA */}
                <View className='flex-row justify-between items-center gap-6 mb-6'>
                    <Icon name='account' size={24} className='mr-4' color={'#BDBDBD'} />

                    <View className='flex-1 flex-row justify-between border-b-[1px] border-neutral5'>
                        <View>
                            <Text className='font-labelSemiBold text-sm mb-2'>Nama</Text>
                            <Text className='font-labelReguler text-xs mb-1.5'>{userInfo.name}</Text>
                        </View>

                        <Pressable className='self-center'>
                            <Icon name='chevron-right' size={24} color={'#BDBDBD'} />
                        </Pressable>
                    </View>
                </View>

                {/* EMAIL */}
                <View className='flex-row justify-between items-center gap-6 mb-6'>
                    <Icon name='email' size={24} className='mr-4' color={'#BDBDBD'} />

                    <View className='flex-1 flex-row justify-between border-b-[1px] border-neutral5'>
                        <View>
                            <Text className='font-labelSemiBold text-sm mb-2'>Email</Text>
                            <Text className='font-labelReguler text-xs mb-1.5'>{userInfo.email}</Text>
                        </View>

                        <Pressable className='self-center'>
                            <Icon name='chevron-right' size={24} color={'#BDBDBD'} />
                        </Pressable>
                    </View>
                </View>

                {/* PASSWORD */}
                <View className='flex-row justify-between items-center gap-6 mb-6'>
                    <Icon name='key' size={24} className='mr-4' color={'#BDBDBD'} />

                    <View className='flex-1 flex-row justify-between border-b-[1px] border-neutral5'>
                        <View>
                            <Text className='font-labelSemiBold text-sm mb-2'>Password</Text>
                            <Text className='font-labelReguler text-xs mb-1.5'>{userToken}</Text>
                        </View>

                        <Pressable className='self-center'>
                            <Icon name='chevron-right' size={24} color={'#BDBDBD'} />
                        </Pressable>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default ProfileScreen