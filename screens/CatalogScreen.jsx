import React, { useLayoutEffect, useState } from 'react'
import { Alert, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";

const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const DATA = [
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
    {
        gambar: require('../assets/product/mie.png'),
        jenis: 'Sembako',
        nama: 'Mie Goreng 5pcs',
        poin: 40,
        ditukar: 14,
    },


];



const CatalogScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const FlatListItemSeparator = () => {
        return (
            <View
                className='h-4'
            />
        )
    }

    const ProductCard = ({ gambar, jenis, nama, poin, ditukar }) => (
        <View style={[{ flex: 1 }, DATA % 2 == 0 ? { marginRight: 16 } : { marginLeft: 16 }]} className="shadow-sm bg-white rounded-lg h-auto w-full overflow-hidden">
            <Image
                className="self-center h-44 w-44 max-w-full max-h-full"
                source={gambar}
            />
            <View className='p-2 mt-2'>
                <View className='mb-2'>
                    <Text className="font-labelReguler text-[8px] text-primary6 mb-0.5">{jenis}</Text>
                    <Text className="font-labelReguler text-[10px] text-[#979797] mb-0.5">{nama}</Text>
                    <Text className="font-labelSemiBold text-[10px] text-[#1F1F1F]">{poin} Poin</Text>
                </View>

                <View className='flex-row flex-wrap'>
                    <Text className="py-[2px] px-1 rounded bg-primary2 text-primary6 font-labelSemiBold text-[8px]">Ditukar {ditukar} kali</Text>
                </View>

                <Pressable
                    className="bg-primary6 py-2 mt-2 rounded items-center justify-center"
                    onPress={toggleModal}

                >
                    <Text className="font-labelSemiBold text-[10px] text-white">Tukar Poin</Text>
                </Pressable>

            </View >

        </View >
    );


    return (
        <View
            style={{
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
            className='h-full bg-white'
        >

            {/* MODAL */}
            <Modal
                isVisible={isModalVisible}
                className='absolute items-center right-0 left-0 top-1/3'
                onBackdropPress={() => setModalVisible(false)}>
                <View style={{ flex: 1 }} className='bg-white w-[253px] rounded-lg justify-center items-center p-6'>

                    <Text className='font-labelSemiBold text-xs mb-2'>Apakah kamu yakin menukarkan</Text>
                    <Text className='font-labelBold text-4xl text-primary6 mb-2'>100 Poin</Text>
                    <Text className='font-labelSemiBold text-xs'>Untuk Beras 1kg?</Text>

                    <View className='flex-row mt-6'>
                        <Pressable className='bg-primary6 py-2 rounded mr-2 flex-1' onPress={toggleModal}>
                            <Text className='font-labelReguler text-[10px] text-white text-center' style={{ lineHeight: 12 }}>Batalkan</Text>
                        </Pressable>

                        <Pressable className='py-2 rounded flex-1 border border-primary6'
                            onPress={() => {
                                setModalVisible(!isModalVisible);
                                Alert.alert('Penukaran Berhasil', 'Pertukaran 100 Poin', [
                                    { text: 'Kembali ke beranda', onPress: () => navigation.navigate('Beranda') },
                                ])
                            }} >
                            <Text className='font-labelReguler text-primary6 text-[10px] text-center' style={{ lineHeight: 12 }}>Ya</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal >

            {/* SEARCH */}
            <View className='px-4 mb-2.5'>

                <View className='flex-row justify-center items-center bg-white px-2.5 py-1 my-2.5 border border-[#D2D2D2] rounded'>
                    <Icon style={{ paddingRight: 6 }} name={'search'} size={20} color={'#D2D2D2'} />
                    <TextInput className='flex-1 font-labelReguler text-xs' placeholder="Cari di katalog" />
                </View>


                <View className='flex-row mb-2.5'>
                    <SelectDropdown
                        buttonStyle={{ backgroundColor: 'white', width: 78, borderRadius: 4, height: 28, borderColor: '#D2D2D2', borderWidth: 1 }}
                        buttonTextStyle={{ fontFamily: 'labelReguler', fontSize: 12, lineHeight: 16, color: '#D2D2D2', paddingHorizontal: 8 }}
                        defaultButtonText='Urutan'
                        renderDropdownIcon={() => <Icon name={'expand-more'} color='#D2D2D2' size={20} />}
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    <View className='w-2.5' />
                    <SelectDropdown
                        buttonStyle={{ backgroundColor: 'white', width: 67, borderRadius: 4, height: 28, borderColor: '#D2D2D2', borderWidth: 1 }}
                        buttonTextStyle={{ fontFamily: 'labelReguler', fontSize: 12, lineHeight: 16, color: '#D2D2D2' }}
                        defaultButtonText='Stok'
                        renderDropdownIcon={() => <Icon name={'expand-more'} color='#D2D2D2' size={20} />}
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                </View>

                <Text className='text-xs font-labelReguler'>Menampilkan <Text className='font-labelSemiBold'>12</Text> sembako</Text>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                // className='flex-grow'
                data={DATA}
                numColumns={2}
                ItemSeparatorComponent={FlatListItemSeparator}
                contentContainerStyle={{ paddingRight: 16, paddingTop: 10, paddingBottom: 16 }}
                renderItem={({ item }) => <ProductCard gambar={item.gambar} jenis={item.jenis} nama={item.nama} poin={item.poin} ditukar={item.ditukar} />}
                keyExtractor={item => item.nama}
            />


            <StatusBar style="auto" />
        </View >
    )
}

export default CatalogScreen