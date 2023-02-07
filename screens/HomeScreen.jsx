// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Alert, Dimensions, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// DATA PRODUK
const DATAPRODUK = [
    {
        gambar: require('../assets/product/beras.png'),
        jenis: 'Sembako',
        nama: 'Beras 1kg',
        poin: 100,
        ditukar: 27,

    },
    {
        gambar: require('../assets/product/minyak.png'),
        jenis: 'Sembako',
        nama: 'Minyak Goreng 1L',
        poin: 75,
        ditukar: 19,
    },
    {
        gambar: require('../assets/product/gula.png'),
        jenis: 'Sembako',
        nama: 'Gula Pasir 500gr',
        poin: 50,
        ditukar: 18,
    },
    {
        gambar: require('../assets/product/kopi.png'),
        jenis: 'Sembako',
        nama: 'Kopi Bubuk 250gr',
        poin: 55,
        ditukar: 17,
    },
    {
        gambar: require('../assets/product/mie.png'),
        jenis: 'Sembako',
        nama: 'Mie Goreng 5pcs',
        poin: 40,
        ditukar: 14,
    },


];

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
const ProdukCard = ({ gambar, jenis, nama, poin, ditukar }) => {
    return (
        <View className='overflow-hidden'>
            <Image className='w-[100px] h-[100px] rounded-lg' source={gambar} />

            <View className='mt-2'>
                <View className='mb-2'>
                    <Text className="font-labelReguler text-[8px] text-primary6 mb-0.5">{jenis}</Text>
                    <Text className="font-labelReguler text-[10px] text-[#979797] mb-0.5">{nama}</Text>
                    <Text className="font-labelSemiBold text-[10px] text-[#1F1F1F]">{poin} poin</Text>
                </View>

                <View className='flex-row flex-wrap mb-2'>
                    <Text className="py-[2px] px-1 rounded bg-primary2 text-primary6 font-labelReguler text-[8px]">Ditukar {ditukar} kali</Text>
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


const HomeScreen = () => {
    const insets = useSafeAreaInsets();

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
                    <View className='flex-row items-center left-4 gap-2'>
                        <Image
                            className="rounded-full h-9 w-9"
                            source={{
                                uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            }}
                        />
                        <View>
                            <Text className="font-labelSemiBold text-xs text-white">Selamat Datang, Farhan</Text>
                            <Text className="font-labelReguler text-[8px] text-white" style={{ lineHeight: 12 }}>085321667443</Text>
                        </View>
                    </View>

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
                        <View style={{ boxShadow: '0px 0px 8px #010101' }} className='shadow-sm flex-1 p-3 rounded-lg'>
                            <View className='flex-row items-center gap-1 mb-1'>
                                <Image className='w-4 h-4' source={require('../assets/icon/Point.png')} />
                                <Text className='font-labelMedium text-xs text-primary6'>Reward Mijan</Text>
                            </View>

                            <Text className='font-labelMedium text-sm'>100.000 Poin</Text>
                        </View>

                        {/* kontribusi mijan */}
                        <View style={{ boxShadow: '0px 0px 8px #010101' }} className='shadow-sm flex-1 p-3 rounded-lg'>
                            <View className='flex-row items-center gap-1 mb-1'>
                                <Image className='w-4 h-4' source={require('../assets/icon/Kontribusi.png')} />
                                <Text className='font-labelMedium text-xs text-primary6'>Kontribusi Mijan</Text>
                            </View>

                            <Text className='font-labelMedium text-sm'>20 Liter</Text>
                        </View>
                    </View>

                    {/* 3 MENU */}
                    <View style={{ boxShadow: "1px 3px 1px #9E9E9E" }} className='flex-row rounded-lg shadow-sm mx-4 mb-4'>
                        <View className='flex-1 justify-center items-center py-3'>
                            <Image className='h-6 w-6' source={require('../assets/icon/Lokasi.png')} />
                            <Text className='text-[10px] font-labelMedium mt-1'>Lokasi</Text>
                        </View>
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
                            data={DATAPRODUK}
                            contentContainerStyle={{ paddingRight: 16, paddingLeft: 16 }}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <ProdukCard gambar={item.gambar} jenis={item.jenis} nama={item.nama} poin={item.poin} ditukar={item.ditukar} />}
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