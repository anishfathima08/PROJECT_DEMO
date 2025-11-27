import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const myContext = createContext()

const ContextProvider = ({ children }) => {

    const navigate = useNavigate()

    var url = 'https://project-demo-93ba.onrender.com'

    var [ productData, setProductData ] = useState([])

    const productFetchFun = async () => {
        try{
            const productList = await axios.get(`${url}/product/getProduct`)
            setProductData(productList.data)
        }
        catch(err){
            console.log(`Error Name : ${err.name}, Error Message : ${err.message}`)
        }
    }
    
    useEffect(() => {
        productFetchFun()
    }, [])

    const [ registerUsername, setRegisterUsername ] = useState('')
    const [ registerEmail, setRegisterEmail ] = useState('')
    const [ registerPassword, setRegisterPassword ] = useState('')

    const registerSubmitFun = async (e) => {
        e.preventDefault()

        const registerData = {
            registerUsername,
            registerEmail,
            registerPassword
        }

        await axios.post(`${url}/user/addUser`, registerData)
        alert('User Registered Successfully...')

        setRegisterUsername('')
        setRegisterEmail('')
        setRegisterPassword('')
    }

    const [ loginUsername, setLoginUsername ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    const loginSubmitFun = async (e) => {
        e.preventDefault()

        try{
            localStorage.setItem('username', loginUsername)
            
            const loginData = {
                registerUsername : loginUsername,
                registerPassword : loginPassword
            }

            await axios.post(`${url}/user/loginUser`, loginData)

            navigate('/home')

            setLoginUsername('')
            setLoginPassword('')

        }
        catch(err){
            alert('Invalid Username and Password...')
            console.log(`Error Name : ${err.name}, Error Message : ${err.message}`)
        }

    }

    const myContextValue = {
        navigate,
        productData,

        registerUsername, setRegisterUsername,
        registerEmail, setRegisterEmail,
        registerPassword, setRegisterPassword,

        registerSubmitFun,

        loginUsername, setLoginUsername,
        loginPassword, setLoginPassword,

        loginSubmitFun
    }

    return (
        <myContext.Provider value={myContextValue}>
            {children}
        </myContext.Provider>
    )
}

export default ContextProvider