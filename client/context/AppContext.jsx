/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
export const AppContext = createContext();

export const AppProvider =({children})=>{

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY
const [token, setToken] = useState(null)
const [user, setUser] = useState(null)
const [isOwner, setIsOwner] = useState(false)
const [showLogin, setShowLogin] = useState(false)
const [pickupDate, setPickupDate] = useState('')
const [returnDate, setReturnDate] = useState('')

const [cars, setCars] = useState([])

//* funcion para verificar si el usuario esta loggeado

const fecthUser = async ()=>{
    try {
    const {data} =  await axios.get('/api/user/data')

    if (data.success) {
        setUser(data.user)
        setIsOwner(data.user.role === 'owner')
        
    }
    else{
        navigate('/')
    }
    } catch (error) {
        toast.error(error.message)
    }
}
//* funcion para traer todos los carros del servidor
const fetchCars = async ()=>{
    try {
     const {data} = await axios.get('/api/owner/cars')
     console.log("CARS FROM BACKEND - data completo:", data)
        data.success ? setCars(data.cars) : toast.error(data.message)
    } catch (error) {
        toast.error(error.message)
        
    }
}
//* funcion para salir de la app
const logout = ()=>{
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsOwner(false)
    axios.defaults.headers.common['Authorization'] = ''
    toast.success('Has salido de sesion')

}

//useffect

useEffect(()=>{
    const token = localStorage.getItem('token')
    setToken(token)
   
},[])

//* useefect cuando el token esta diponible
useEffect(()=>{
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`
        fecthUser()
         fetchCars()
    }
},[token])
   const  value = {
  navigate, currency, axios, user, setUser,
  token, setToken, isOwner, setIsOwner, fecthUser, showLogin,
setShowLogin, logout, fetchCars, cars, setCars, pickupDate, setPickupDate, returnDate, setReturnDate   }
    return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>

    )
}

export const useAppContext = () =>{
    return useContext(AppContext)
}