
//* funcion para ver si el carro esta disponible

import Booking from "../models/Bookings.js"
import Car from "../models/Car.js";


export const checkAvailability = async (car, pickupDate, returnDate) =>{

    const bookings = await Booking.find({
        car, 
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    return bookings.length ===  0;

}

//* api para verificar la disponibilidad

// export const checkAvailabilityOfCar = async (req, res) =>{
//     try {
//         const {location, pickupDate, returnDate} = req.body;

//         /** fetch todos los autos disponibles de una localidad */
//         // const cars  = Car.find({location, isAvaliable: true})
// const cars = await Car.find({location, isAvaliable: true})

//         const availableCarsPromises = cars.map(async (car)=>{
//           const  isAvailable =  await checkAvailability(car._id, pickupDate, returnDate)

//           return {...car._doc, isAvailable: isAvailable }
//         })

//         let availableCars = await Promise.all(availableCarsPromises);
//         availableCars = availableCars.filter(car => car.isAvailable === true)
//         res.json({success: true, availableCars})
//     } catch (error) {
 
//         console.log(error.message)
//         res.json({success:false, message: error.message})
//     }
// }

export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if (!location || !pickupDate || !returnDate) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son requeridos" });
    }

    // conversión y validación temprana
    const pickup = new Date(pickupDate);
    const ret = new Date(returnDate);

    if (isNaN(pickup.getTime()) || isNaN(ret.getTime())) {
      return res.status(400)
        .json({ success: false, message: "Fechas inválidas" });
    }

    const cars = await Car.find({ location, isAvaliable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickup, ret);
      return { ...car._doc, isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
  
};





















//* api para crear una reserva

// export const createBooking = async (req, res) =>{
//     try {
        
// const {_id} =req.user;
// const {car, pickupDate, returnDate} = req.body;

//    const isAvailable = await checkAvailability(car, pickupDate, returnDate)

//    if (!isAvailable) {
//     return res.json({success: false, message: "El Vehiculo no esta Disponible"})
    
//    }
//    const carData = await Car.findById(car)










//    //* calcular el precio en base a la fecha de recogida y la fecha de retorno
//    const picked = new Date(pickupDate);
//    const returned = new Date(returnDate);
//    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
//    const price = carData.pricePerDay * noOfDays;

//    await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})

//    res.json({success: true, message: "Reserva Creada"})


//     } catch (error) {

//         console.log(error.message)
//         res.json({success:false, message: error.message})
        
//     }
// }

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    // convertir fechas
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    // validar fechas
    if (isNaN(picked.getTime()) || isNaN(returned.getTime())) {
      return res.json({ success: false, message: "Fechas inválidas" });
    }

    // verificar disponibilidad con fechas Date
    const isAvailable = await checkAvailability(car, picked, returned);

    if (!isAvailable) {
      return res.json({ success: false, message: "El Vehiculo no esta Disponible" });
    }

    const carData = await Car.findById(car);

    // calcular precio
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate: picked,
      returnDate: returned,
      price
    });

    res.json({ success: true, message: "Reserva Creada" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}


//* Api para listar las reservas de los usuarios
export const getUserBookings = async (req, res)=>{
    try {
        

        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        
        console.log(error.message)
        res.json({success:false, message: error.message})
        
    }
}

//* Api para obtener las Reservas de los owner

export const getOwnerBookings = async (req, res)=>{
    try {

        if (req.user.role !== 'owner') {
            return res.json({success: false, message: "No Autirizado"})
            
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
        
        console.log(error.message)
        res.json({success:false, message: error.message})
        
    }
}

//* Api para cambiar el status de las reservas
export const changeBookingsStatus = async (req, res)=>{
    try {

        const {_id} = req.user;
        const {bookingId, status} = req.body;

        const booking = await Booking.findById(bookingId)
        if(booking.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "No Autorizado"})

        } 

        booking.status = status;
        await booking.save();

        res.json({success: true, message: "Estatus Actualizado"})


    } catch (error) {
        
        console.log(error.message)
        res.json({success:false, message: error.message})
        
    }
}