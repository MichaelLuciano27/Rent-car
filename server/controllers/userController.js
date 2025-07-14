//* Registrar usuario

import User from "../models/User.js"
import Car from '../models/Car.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//* generar jwtoken

const generateToken = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: 'Llenar todos los campos' });
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.json({ success: false, message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


//* Logear Usuario

export const loginUser = async (req, res) =>{
    try {
        
const {email, password} = req.body;
const user = await User.findOne({email})

if (!user) {
    return res.json({success: false, message: "Usuario no Encontrado"})
    
}
const isMatch = await bcrypt.compare(password, user.password)
if (!isMatch) {
    return res.json({success: false, message: "Credenciales Invalidas"})
    
}
const token = generateToken(user._id.toString())
res.json({success: true, token})


 
} catch (error) {

    
        console.log(error.message);
        return res.json({success: false, message: error.message})
        
    }
}

//* Obtener la data del usuario con JWT
export const getUserData = async (req, res)=>{
    try {
        const {user} = req;
        res.json({success: true, user})



    } catch (error) {
        
        console.log(error.message);
        return res.json({success: false, message: error.message})
        
     }
}
//* obtener los vehiculos para el frontend
export const getCars = async (req, res)=>{
    try {
        const cars = await Car.find({isAvaliable})
        res.json({success: true , cars  })



    } catch (error) {

        console.log(error.message);
        return res.json({success: false, message: error.message})
        
    }
}