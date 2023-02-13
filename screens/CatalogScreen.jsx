import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'
import Modal from "react-native-modal";

const countries = ["Egypt", "Canada", "Australia", "Ireland"]


const CatalogScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const [isModalVisible, setModalVisible] = useState(false);
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');

    // FETCH API
    async function getProduk() {
        try {
            const response = await axios.get(`https://fourtour.site/melinda/produk/0?search=(${search})`);
            console.log(response.data.results);
            setMessage(response.data.count);
            setProduct(response.data.results)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProduk()
        console.log(search)
    }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const searchFilter = (text) => {
        setSearch(text)
        console.log(text)
        getProduk()
    }

    const FlatListItemSeparator = () => {
        return (
            <View
                className='h-4'
            />
        )
    }

    const ProductCard = ({ gambar, kategori, nama, harga, penukar, keterangan, stok }) => (
        <View style={[{ flex: 1 }, product % 2 == 0 ? { marginRight: 16 } : { marginLeft: 16 }]} className="shadow-sm bg-white rounded-lg h-auto w-full overflow-hidden">
            <Image
                className="self-center h-44 w-44 max-w-full max-h-full"
                source={{ uri: `https://fourtour.site/melinda${gambar}` }}
            />
            <View className='p-2 mt-2'>
                <View className='mb-2'>
                    <Text className="font-labelReguler text-[8px] text-primary6 mb-0.5">{kategori}</Text>
                    <Text className="font-labelReguler text-[10px] text-[#979797] mb-0.5">{nama}</Text>
                    <Text className="font-labelSemiBold text-[10px] text-[#1F1F1F]">{harga} Poin</Text>
                </View>

                <View className='flex-row flex-wrap'>
                    <Text className="py-[2px] px-1 rounded bg-primary2 text-primary6 font-labelSemiBold text-[8px]">Stok {stok}</Text>
                </View>

                <Pressable
                    className="bg-primary6 py-2 mt-2 rounded items-center justify-center"
                    onPress={() => {
                        toggleModal()
                        setPrice(harga)
                        setName(nama)
                    }}

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
                    <Text className='font-labelBold text-4xl text-primary6 mb-2'>{price} Poin</Text>
                    <Text className='font-labelSemiBold text-xs'>Untuk {name}?</Text>

                    <View className='flex-row mt-6'>
                        <Pressable className='bg-primary6 py-2 rounded mr-2 flex-1' onPress={toggleModal}>
                            <Text className='font-labelReguler text-[10px] text-white text-center' style={{ lineHeight: 12 }}>Batalkan</Text>
                        </Pressable>

                        <Pressable className='py-2 rounded flex-1 border border-primary6'
                            onPress={() => {
                                toggleModal()
                                Alert.alert('Penukaran Berhasil', `${price} Poin untuk ${name}`, [
                                    { text: 'Kembali ke beranda', onPress: () => navigation.navigate('Beranda') },
                                ])
                            }} >
                            <Text className='font-labelReguler text-primary6 text-[10px] text-center' style={{ lineHeight: 12 }}>Ya</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal >

            {/* SEARCH */}
            < View className='px-4 mb-2.5' >

                {/* SEARCH */}
                < View className='flex-row justify-center items-center bg-white px-2.5 py-1 my-2.5 border border-[#D2D2D2] rounded' >
                    <Icon style={{ paddingRight: 6 }} name={'search'} size={20} color={'#D2D2D2'} />
                    <TextInput className='flex-1 font-labelReguler text-xs' placeholder="Cari di katalog" value={search} onChangeText={(text) => searchFilter(text)} />
                </ View >

                {/* FILTER */}
                < View className='flex-row mb-2.5' >
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
                </ View >

                <Text className='text-xs font-labelReguler'>Menampilkan {message} produk</Text>

            </View >

            <FlatList
                showsVerticalScrollIndicator={false}
                // className='flex-grow'
                data={product}
                numColumns={2}
                ItemSeparatorComponent={FlatListItemSeparator}
                contentContainerStyle={{ paddingRight: 16, paddingTop: 10, paddingBottom: 16 }}
                renderItem={({ item }) => <ProductCard gambar={item.gambar} kategori={item.kategori} nama={item.nama} harga={item.harga} penukar={item.penukar} stok={item.stok} />}
                keyExtractor={item => item.nama}
            />


            <StatusBar style="auto" />
        </View >
    )
}

export default CatalogScreen