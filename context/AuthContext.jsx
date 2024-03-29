import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { BASE_URL } from '../config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    // const [userData, setUserData] = useState({
    //     userToken: null,
    //     userPoin: null,
    //     userInfo: null
    // })

    // setUserData(prev => ({ ...prev, userPoin: }))

    const login = (email, password) => {
        setIsLoading(true)



        async function getInfo() {
            try {
                const response = await axios.post(`${BASE_URL}user/`, {
                    jwt: userToken
                })
                console.log(response.data)
                setUserInfo(response.data)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

            } catch (error) {
                Alert.alert('tolong login ulang')
                console.error(error);
            }
        }

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

        // const getInfo = async () => {
        //     try {
        //         const response = await axios.post(`${BASE_URL}user/`, {
        //             // headers: {
        //             //     'jwt': userToken,
        //             //     'Accept': 'application/json'
        //             // }
        //             jwt: userToken
        //         });
        //         console.log(response.data)
        //         setUserInfo(response.data)
        //         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))

        //     } catch (error) {
        //         getInfo()
        //         // Alert.alert('tolong login ulang')
        //         // console.error(error);
        //     }
        // }


        getToken()

        if (userToken !== null) {
            getInfo()
        }

        setIsLoading(false)

    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        setUserInfo(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')

        // axios.post(`${BASE_URL}logout/`, {

        // })
        //     .then(res => {
        //         console.log(res.data.message)

        //     })
        //     .catch((error) => {
        //         console.log(`login error ${error}`)
        //         Alert.alert('logout gagal')
        //     })


        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')

            userInfo = JSON.parse(userInfo)


            if (userToken) {
                setUserToken(userToken)
                setUserInfo(userInfo)

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
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )
}