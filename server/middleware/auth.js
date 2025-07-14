// // import jwt from 'jsonwebtoken'
// // import User from '../models/User.js';

// // export const protect = async (req, res, next)=>{
// //     const token = req.headers.authorization;

// //     if (!token) {
// //         return res.json({success: false, message: "No Autorizado"})
        
// //     }
// //     try {

// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // const userId = decoded.userId;
// //         if (!userId) {
// //          return res.json({success: false, message: "No Autorizado"})
            
// //         }
// //         req.user = await User.findById(userId).select("-password")
// //         next()
// //     } catch (error) {
// //  return res.json({success: false, message: "No Autorizado"})
        
// //     }
// // }

// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = async (req, res, next) => {
//   const token = req.headers.authorization;
//   console.log('Authorization header:', token);   // 🔍 NUEVO

//   if (!token) {
//     console.log(' No token provided');
//     return res.json({ success: false, message: "No Autorizado: Token faltante" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded token:', decoded);      // 🔍 NUEVO

//     const userId = decoded.userId;
//     console.log('Extracted userId:', userId);    // 🔍 NUEVO

//     if (!userId) {
//       console.log(' userId not found in token');
//       return res.json({ success: false, message: "No Autorizado: Token inválido" });
//     }

//     const user = await User.findById(userId).select("-password");
//     console.log('User from DB:', user);          // 🔍 NUEVO

//     if (!user) {
//       console.log(' User not found in DB');
//       return res.json({ success: false, message: "No Autorizado: Usuario no encontrado" });
//     }

//     req.user = user;
//     next();

//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return res.json({ success: false, message: "No Autorizado: Token inválido o expirado" });
//   }
// };


import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('Authorization header:', token);

  if (!token) {
    return res.json({ success: false, message: "No Autorizado: Token faltante" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Soporta ambos formatos
    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return res.json({ success: false, message: "No Autorizado: Token inválido" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "No Autorizado: Usuario no encontrado" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Error verifying token:', error);
    return res.json({ success: false, message: "No Autorizado: Token inválido o expirado" });
  }
};

