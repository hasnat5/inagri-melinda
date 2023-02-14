import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'
import { BASE_URL } from '../config';


// DATA ARTIKEL
const DATAARTIKEL = [
    {
        gambar: require('../assets/artikel/sedekah_jelantah.png'),
        tanggal: 'Rabu, 18 Januari 2023',
        judul: 'Sedekah Minyak Jelantah',

    },
    {
        gambar: require('../assets/artikel/minyak_jelantah.png'),
        tanggal: 'Selasa, 10 Januari 2023',
        judul: 'Cara Membuat Sabun Jelantah',

    },
    {
        gambar: require('../assets/artikel/sabun_jelantah.png'),
        tanggal: 'Selasa, 10 Januari 2023',
        judul: 'Cara Membuat Sabun Jelantah',

    },
]

// DATA BANNER
const DATABANNER = [
    {
        gambar: require('../assets/banner/tutorial.png'),
    },
    {
        gambar: require('../assets/banner/tutorial.png'),
    },
]

// KOMPONEN KARTU
const ProdukCard = ({ gambar, kategori, nama, harga, penukar, keterangan, stok }) => {
    return (
        <View className='overflow-hidden w-[120px]'>
            <Image className='w-[120px] h-[120px] rounded-lg' source={{ uri: `https://fourtour.site/melinda${gambar}` }} />

            <View className='mt-2'>
                <View className='mb-2'>
                    <Text className="font-labelReguler text-[8px] text-primary6 mb-0.5">{kategori}</Text>
                    <Text className="font-labelReguler text-[10px] text-[#979797] mb-0.5">{nama}</Text>
                    <Text className="font-labelSemiBold text-[10px] text-[#1F1F1F]">{harga} poin</Text>
                </View>

                <View className='flex-row flex-wrap mb-2'>
                    <Text className="py-[2px] px-1 rounded bg-primary2 text-primary6 font-labelReguler text-[8px]">{stok} stok</Text>
                </View>

                <Pressable
                    className="bg-primary6 py-2 rounded items-center justify-center"
                    onPress={() => Alert.alert('Simple Button pressed')}
                >
                    <Text className="font-labelSemiBold text-[10px] text-white">Tukar Poin</Text>
                </Pressable>
            </View >
        </View>
    )
}

// KOMPONEN ARTIKEL
const ArticleCard = ({ gambar, tanggal, judul }) => (
    <View className='mb-4'>
        <Image className='w-[260px] h-[127px] mb-2 rounded-lg' source={gambar} />
        <View>
            <Text className='font-labelReguler text-primary6 text-[8px] mb-0.5'>{tanggal}</Text>
            <Text className='font-labelSemiBold text-[10px]'>{judul}</Text>
        </View>
    </View>
)



const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const [product, setProduct] = useState([])
    const [poin, setPoin] = useState([])

    const { userInfo } = useContext(AuthContext)

    async function getProduk() {
        try {
            const response = await axios.get(`https://fourtour.site/melinda/produk/0`);
            console.log(response.data.results);
            setProduct(response.data.results)
        } catch (error) {
            console.error(error.response);
        }
    }

    async function getPoin() {
        try {
            const response = await axios.get(`${BASE_URL}poin/`);
            console.log(response.data)
            setPoin(response.data)
            // AsyncStorage.setItem('userPoin', JSON.stringify(userPoin))

        } catch (error) {
            // getPoin()
            Alert.alert('poin tidak terambil')
            console.error(error);
        }
    }

    useEffect(() => {
        getProduk()
        getPoin()
    }, [])



    const FlatListItemSeparator = () => {
        return (
            <View
                className='w-4'
            />
        )
    }

    const FlatListItemSeparatorBanner = () => {
        return (
            <View
                className='w-2'
            />
        )
    }



    return (
        <View
            style={{
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
            className='bg-primary6 flex justify-between h-screen'
        >

            {/* TOP Display */}
            <View>
                {/* PROFILE PIC */}
                <View className='flex-row justify-between items-center my-2'>
                    {/* USER PROFILE */}
                    <Pressable className='flex-row items-center left-4 gap-2' onPress={() => navigation.navigate('Profile')}>
                        <Image
                            className="rounded-full h-9 w-9"
                            source={{
                                uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            }}
                        />

                        <View>
                            <Text className="font-labelSemiBold text-xs text-white">Selamat Datang, {userInfo.name}</Text>
                            <Text className="font-labelReguler text-[8px] text-white" style={{ lineHeight: 12 }}>{userInfo.phone}</Text>
                        </View>
                    </Pressable>

                    {/* APP LOGO */}
                    <View className='flex-row items-center gap-1 right-4'>
                        <Image
                            source={require('../assets/icon/logoMijan.png')}
                            className='w-5 h-7'
                        />
                        <Text className='text-white font-labelSemiBold'>MIJAN</Text>
                    </View>
                </View>

                {/* BANNER */}
                {/* https://www.npmjs.com/package/react-native-snap-carousel */}
                <View className='pt-2 pb-2.5'>
                    <FlatList
                        data={DATABANNER}
                        horizontal
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                        ItemSeparatorComponent={FlatListItemSeparatorBanner}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <Image
                            resizeMode='cover'
                            className='rounded-lg w-[90vw] h-32'
                            source={item.gambar}
                        />}
                    />
                </View>
            </View>

            <View className='bg-white rounded-t-xl flex-grow h-96'>
                {/* WRAPPER */}
                <ScrollView className='mt-4'>
                    {/* INFORMASI POIN */}
                    <View className='flex-row gap-4 px-4 pb-4'>
                        {/* reward  mijan */}
                        <View className='shadow-sm flex-1 p-3 rounded-lg'>
                            <View className='flex-row items-center gap-1 mb-1'>
                                <Image className='w-4 h-4' source={require('../assets/icon/Point.png')} />
                                <Text className='font-labelMedium text-xs text-primary6'>Reward Mijan</Text>
                            </View>

                            <Text className='font-labelMedium text-sm'>{poin.poin} Poin</Text>
                        </View>

                        {/* kontribusi mijan */}
                        <View className='shadow-sm flex-1 p-3 rounded-lg'>
                            <View className='flex-row items-center gap-1 mb-1'>
                                <Image className='w-4 h-4' source={require('../assets/icon/Kontribusi.png')} />
                                <Text className='font-labelMedium text-xs text-primary6'>Kontribusi Mijan</Text>
                            </View>

                            <Text className='font-labelMedium text-sm'>{poin.volume} Liter</Text>
                        </View>
                    </View>

                    {/* 2 MENU */}
                    <View
                        className='shadow-sm flex-row rounded-lg mx-4 mb-4'

                    >
                        <View className='flex-1 justify-center items-center py-3'>
                            <Image className='h-6 w-6' source={require('../assets/icon/Tukar.png')} />
                            <Text className='text-[10px] font-labelMedium mt-1'>Petunjuk Tukar Poin</Text>
                        </View>
                        <View className='flex-1 justify-center items-center py-3'>
                            <Image className='h-6 w-6' source={require('../assets/icon/History.png')} />
                            <Text className='text-[10px] font-labelMedium mt-1'>History</Text>
                        </View>
                    </View>

                    {/* PILIHAN PRODUK */}
                    <View className='mb-4'>
                        <Text className='left-4 mb-2.5 font-labelSemiBold'>Rekomendasi Pilihan</Text>

                        <FlatList
                            horizontal
                            data={product}
                            contentContainerStyle={{ paddingRight: 16, paddingLeft: 16 }}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <ProdukCard gambar={item.gambar} kategori={item.kategori} nama={item.nama} harga={item.harga} penukar={item.penukar} stok={item.stok} />}
                        />
                    </View>

                    {/* ARTIKEL */}
                    <View>
                        <Text className='left-4 mb-2.5 font-labelSemiBold'>Artikel</Text>

                        <FlatList
                            horizontal
                            data={DATAARTIKEL}
                            contentContainerStyle={{ paddingRight: 16, paddingLeft: 16 }}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <ArticleCard gambar={item.gambar} tanggal={item.tanggal} judul={item.judul} />}
                        />
                    </View>


                </ScrollView>
            </View >

            <StatusBar style="auto" />
        </View >

    )
}

export default HomeScreen

// input literan minyak
// verifikasi
// tukar poin
// tampilin poin