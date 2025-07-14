/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import  Title from '../components/Title'
import CarCard from '../components/CarCard'
import {assets} from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Cars = () => {

  //* obteniendo los parametros de busqueda de la url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios} = useAppContext()
const isSearchData = pickupLocation && pickupDate && returnDate
const [filteredCars, setFilteredCars] = useState([])
const [input, setInput] = useState('')
const applyFilter = async ()=>{
  if (input === '') {
    setFilteredCars(cars)
    return null
    
  }
  const filtered = cars.slice().filter((car)=>{
    return car.brand.toLowerCase().includes(input.toLocaleLowerCase()) || 
    car.model.toLowerCase().includes(input.toLocaleLowerCase()) ||
    car.category.toLowerCase().includes(input.toLocaleLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLocaleLowerCase())
    })
    setFilteredCars(filtered)
}


const searchCarAvailability = async ()=> {



const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
if (data.success) {
  setFilteredCars(data.availableCars)
  if (data.availableCars.length === 0) {
    toast("No Vehiculos disponibles")
    
  }
  return null
  
}
}
useEffect(()=>{
    isSearchData && searchCarAvailability()
},[])


useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter()
},[input, cars])

  
  return (
    <div>

      <motion.div
      initial={{opacity: 0, y:30}}
    animate={{ opacity: 1, y:0}}
    transition={{duration: 0.6, ease:'easeOut'}}
      
      className="flex flex-col items-center py-20 bg-light max-md:px4">
        <Title title=" Vehiculos Disponibles"  subTitle="Explore nuestra selección de vehículos premium disponibles para su próxima aventura"/>

        <motion.div
        initial={{ opacity: 0, y:20}}
    animate={{opacity: 1, y:0}}
    transition={{delay:0.3, duration: 0.5}}
        
        className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="search" className='w-4.5 h-4.5 mr-2' />
          <input  onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Buscar por marca, modelo o características' className='w-full h-full outline-none text-gray-500' />
           <img src={assets.filter_icon} alt="search" className='w-4.5 h-4.5 mr-2' />
        </motion.div>
      </motion.div>

      <motion.div
      
        initial={{ opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay:0.6, duration: 0.5}}
      
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Mostrando {filteredCars.length} Vehiculos</p>

        <div className="grid grid-c ols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index)=>(
            <motion.div 
              initial={{ opacity: 0, y:20}}
    animate={{opacity: 1, y:0}}
    transition={{delay:0.1 * index, duration: 0.4}}
            
            key={index} className="">
               <CarCard car={car}/>              
            </motion.div>
          ))}
        </div>
      </motion.div>

      
    </div>
  )
}

export default Cars
