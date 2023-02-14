import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { Alert } from 'react-native'
import { BASE_URL } from '../config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [userPoin, setUserPoin] = useState(null)

    // const [userData, setUserData] = useState({
    //     userToken: null,
    //     userPoin: null,
    //     userInfo: null
    // })

    // setUserData(prev => ({ ...prev, userPoin: }))

    const login = (email, password) => {
        setIsLoading(true)

        async function getToken() {
            try {
                const response = await axios.post(`${BASE_URL}login/`, {
                    email,
                    password
                })
                console.log(response.data.jwt)
                setUserToken(response.data.jwt)
                AsyncStorage.setItem('userToken', response.data.jwt)

            } catch (error) {
                console.log(`login error ${error}`)
                Alert.alert('email atau pass salah')
            }
        }

        const getInfo = async () => {
            try {
                const response = await axios.get(`${BASE_URL}user/`);
                console.log(response.data)
                setUserInfo(response.data)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

            } catch (error) {
                getInfo()
                // Alert.alert('tolong login ulang')
                // console.error(error);
            }
        }

        async function getPoin() {
            try {
                const response = await axios.get(`${BASE_URL}poin/`);
                console.log(response.data)
                setUserPoin(response.data)
                AsyncStorage.setItem('userPoin', JSON.stringify(userPoin))

            } catch (error) {
                // getPoin()
                Alert.alert('poin tidak terambil')
                console.error(error);
            }
        }

        getToken()
        getInfo()
        // getPoin()
        // if (userToken !== null) {
        //     getInfo()
        //     getPoin()
        // }

        setIsLoading(false)

    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        setUserInfo(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userPoin')

        axios.post(`${BASE_URL}logout/`, {

        })
            .then(res => {
                console.log(res.data.message)

            })
            .catch((error) => {
                console.log(`login error ${error}`)
                Alert.alert('logout gagal')
            })


        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            // let userPoin = await AsyncStorage.getItem('userPoin')
            userInfo = JSON.parse(userInfo)
            // userPoin = JSON.parse(userPoin)

            if (userToken) {
                setUserToken(userToken)
                setUserInfo(userInfo)
                // setUserPoin(userPoin)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(`isLogged in error ${error}`)
        }
    }




    useEffect(() => {
        isLoggedIn()

    }, [])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, userPoin }}>
            {children}
        </AuthContext.Provider>
    )
}