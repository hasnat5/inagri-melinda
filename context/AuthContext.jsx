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

    const login = (email, password) => {
        setIsLoading(true)

        axios.post(`${BASE_URL}login/`, {
            email,
            password
        })
            .then(res => {
                console.log(res.data.jwt)
                setUserToken(res.data.jwt)
                AsyncStorage.setItem('userToken', res.data.jwt)

            })
            .catch((error) => {
                console.log(`login error ${error}`)
                Alert.alert('email atau pass salah')
            })

        axios.get(`${BASE_URL}user/`)
            .then(res => {
                // handle success
                console.log(res.data)
                setUserInfo(res.data)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })

        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        setUserInfo(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
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