import User from '../models/User.js'
import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Car from '../models/Car.js';
import Booking from '../models/Bookings.js';
//* cambiar el role a owner


export const changeRoleToOwner = async (req, res)=>{
try {
    const {_id} = req.user;
    await  User.findByIdAndUpdate(_id, {role: "owner"})
    res.json({success: true, message: "Ahora Puedes Registrar Vehiculos"})
    
} catch (error) {
    console.log(error.message);
    res.json({success: false, message:error.message })
    
    
}
}

//* api para agregar un Vehiculo

export const addCar = async (req, res)=>{

try {
    
const {_id} = req.user;
let car = JSON.parse(req.body.carData);

const imageFile = req.file;
// subir imagen

const fileBuffer = fs.readFileSync(imageFile.path)
const response = await imagekit.upload({
    file:fileBuffer,
    fileName: imageFile.originalname,
    folder: '/cars'
})

// optimizacion a traves de imagekit
var optimizedImageURL = imagekit.url({
    path : response.filePath,
    
    transformation : [
        {width: '1200'},
        {quality: 'auto'},
        {format: 'webp'}
    ]
});

const image = optimizedImageURL;
await Car.create({...car, owner: _id, image})

res.json({success: true, message: "Vehiculo Agregado"})

} catch (error) {
    console.log(error.message)
    res.json({success: false, message: error.message})
}


}


//* APi para list
export const getOwnerCars = async ( req, res) =>{
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})  

            res.json({success: true, cars})


    } catch (error) {
        
    console.log(error.message)
    res.json({success: false, message: error.message})
    }
}

//* Api to toggle Car Availanility

export const toggleCarAvailability = async (req, res) => {
try {
        const {_id} = req.user;
        const {carId} = req.body 
        const car = await Car.findById(carId)
        
        // Verificar si el vehiculo pertenece al usuario
        if (car.owner.toString() !== _id.toString()) {
            return res.json({success: false, message: "No Autorizado"})
            
        }
        car.isAvaliable = !car.isAvaliable;
        await car.save()

            res.json({success: true, message: "Availability Toggled"})


    } catch (error) {
        
    console.log(error.message)
    res.json({success: false, message: error.message})
    }

}

//* Api para eliminar un carro

// export const deleteCar = async (req, res) => {
// try {
//         const {_id} = req.user;
//         const {carId} = req.body 
//         const car = await Car.findById(carId)
        
//         // Verificar si el vehiculo pertenece al usuario
//         if (car.owner.toString() !== _id.toString()) {
//             return res.json({success:false, message: "No Autorizado"})
            
//         }
//         car.owner = null;
//         car.isAvaliable = false;
//         await car.save()

//             res.json({success: true, message: "Vehiculo Removido"})


//     } catch (error) {
        
//     console.log(error.message)
//     res.json({success: false, message: error.message})
//     }

// }

export const deleteCar = async (req, res) => {
  try {
    const {_id} = req.user;
    const {carId} = req.body;
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
    }

    // Verificar si el vehiculo pertenece al usuario
    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({success: false, message: "No Autorizado"});
    }

    car.owner = null;
    car.isAvaliable = false;
    await car.save();

    res.json({success: true, message: "Vehiculo Removido"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success: false, message: error.message});
  }
};


//* Api para obtener la data del dashboard
export const getDashboardData = async (req, res) => {

    try {
        
    const {_id, role} = req.user;

    if (role !== 'owner') {
        return res.json({success: false, message: "No Autorizado"})
    }

    const cars = await Car.find({owner: _id})
    const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt: -1})

    const pendingBookings = await Booking.find({owner: _id, status: "Pendiente"})
      const completedBookings = await Booking.find({owner: _id, status: "Confirmada"})

      //* calcular el monto ganado desde las reservas con estatos confirmadas
      const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'Confirmada').reduce((acc, booking)=>acc + booking.price, 0)

      const dashboardData = {
        totalCars: cars.length,
        totalBookings: bookings.length,
        pendingBookings: pendingBookings.length,
        completedBookings: completedBookings.length,
        recentBookings: bookings.slice(0,3),
        monthlyRevenue
      }

      res.json({success: true, dashboardData})
    } catch (error) {
 
        console.log(error.message)
    res.json({success: false, message: error.message})

    }
}

//* api para actualizar la imagen del usuario

export const updateUserImage = async (req, res)=>{
    try {
        const {_id} = req.user;

const imageFile = req.file;
// subir imagen

const fileBuffer = fs.readFileSync(imageFile.path)
const response = await imagekit.upload({
    file:fileBuffer,
    fileName: imageFile.originalname,
    folder: '/users'
})

// optimizacion a traves de imagekit
var optimizedImageURL = imagekit.url({
    path : response.filePath,
    
    transformation : [
        {width: '400'},
        {quality: 'auto'},
        {format: 'webp'}
    ]
});

const image = optimizedImageURL;
await User.findByIdAndUpdate(_id, {image})
res.json({success: true, message: "Imagen Actualizada"})
    } catch (error) {
        
        
        console.log(error.message)
    res.json({success: false, message: error.message})
    }
}