import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'


import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {
    const {currency, axios  } = useAppContext()

   
  const [bookings, setBooking] = useState([])

  const fecthOwnerBooking = async () =>{

    try {
      const {data} = await axios.get('/api/bookings/owner')
      data.success ? setBooking(data.bookings) : toast.error(data.message)

    } catch (error) {
      toast.error(error.message)
      
    }
    
     }
     
  const changeBookingStatus = async (bookingId, status) =>{

    try {
      const {data} = await axios.post('/api/bookings/change-status', {bookingId, status})
      if (data.success) {
        toast.success(data.message)
        fecthOwnerBooking()
        
      }else {
        toast.error(data.message)
      }
      

    } catch (error) {
      toast.error(error.message)
      
    }
    
     }
     useEffect(()=>{
      fecthOwnerBooking()
     },[])
  return (
    <div className='px-4 pt-10 md:px-10 w-full'>

    <Title  title='Administracion Reservas' subTitle='Realizar un seguimiento de todas las reservas de los clientes, aprobar o cancelar solicitudes y administrar los estados de las reservas.' />
    <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor">
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Vehiculo</th>
              <th className='p-3 font-medium max-md:hidden'>Rango de Fechas</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-md:hidden'>Pagos</th>
              <th className='p-3 font-medium'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index)=>(
              <tr key={index} className='border-t border-borderColor text-gray-500'>

                <td className='p-3 flex items-center gap-3'>
                  <img src={booking.car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
                  <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
                </td>
                <td className='p-3 max-md:hidden'>
                  {booking.pickupDate.split('T')[0]} hasta {booking.returnDate.split('T')[0]} 
                </td>
                <td className='p-3'>{currency}{booking.price}</td>
                        <td className='p-3 max-md:hidden'>
                          <span className='bg-gray-100 px-3 py-1 rounded-full'>Desconectado</span>
                        </td>

                      <td className='p-3' >
                        {booking.status === 'Pendiente' ? (
                          <select onChange={e=>changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Cancelada">Cancelada</option>
                            <option value="Confirmada">Confirmada</option>
                          </select>
                        ): (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'Confirmada' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{booking.status}</span>
                        ) }
                      </td>
              </tr>
            ))}
          </tbody>

        </table>
        </div>  
    </div>
  )
}

export default ManageBookings
