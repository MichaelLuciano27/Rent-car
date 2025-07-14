/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {assets} from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'
const ManageCar = () => {

  const {isOwner, axios, currency}= useAppContext()
   
   const [cars, setCars] = useState([])
   const fecthOwnerCars = async () =>{
   try {
    
    const {data} = await axios.get('/api/owner/cars')
    if (data.success) {
      setCars(data.cars)
      
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
   }

 const toggleAvailability = async (carId) =>{
   try {
    
    const {data} = await axios.post('/api/owner/toggle-car', {carId})
    if (data.success) {
    toast.success(data.message)
    fecthOwnerCars()
      
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
   }

    const deleteCar = async (carId) =>{
   try {
    const confirm = window.confirm("¿Estas seguro de eliminar este Vehiculo?")

    if (!confirm) return null
    
    
    const {data} = await axios.post('/api/owner/delete-car', {carId})
    if (data.success) {
      // setCars(data.cars)
      fecthOwnerCars()
      
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
   }




   useEffect(()=>{
  isOwner &&  fecthOwnerCars()
   },[isOwner])

  return (

    <div className='px-4 pt-10 md:px-10 w-full'>

    <Title  title='Administracion Vehiculos' subTitle='Ver todos los coches listados, actualizar sus detalles o eliminarlos de la plataforma de reservas.' />
    <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor">
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Vehiculo</th>
              <th className='p-3 font-medium max-md:hidden'>Categoria</th>
              <th className='p-3 font-medium'>Precio</th>
              <th className='p-3 font-medium max-md:hidden'>Estatus</th>
              <th className='p-3 font-medium'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index)=>(
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 items-center gap-3'>
                  <img src={car.image} alt="" className='h-12 w-12 aspect-square rounded-md
                  object-cover' />
                  <div className="max-md:hidden">
                    <p className='font-medium'>{car.brand} {car.model} </p>
                    <p className='text-xs text-gray-500'>{car.seating_capacity} - {car.transmission} </p>
                  </div>

                </td>

                <td className='p-3 max-md:hidden'>{car.category}</td>
                <td className='p-3'>{currency}{car.pricePerDay}/dia</td>

                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${car.isAvaliable ? 'bg-green-100 text-green-500': 'bg-red-100'}`}>
                    {
                      car.isAvaliable ? "Disponible" : "No Disponible "
                    }
                  </span>
                </td>

                <td className='flex items-center p-3'>
                  <img onClick={()=> toggleAvailability(car._id)} src={ car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} className='cursor-pointer' alt="" />
                  
                    <img onClick={()=> deleteCar(car._id)} src={assets.delete_icon  } className='cursor-pointer' alt="" />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        </div>  
    </div>
  )
}

export default ManageCar
