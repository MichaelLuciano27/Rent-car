import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'

const Footer = () => {
  return (
    <motion.div 
    initial={{opacity:0, y:30}}
    whileInView={{opacity:1, y:0}}
    transition={{duration: 0.6}}

    className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <motion.div
             initial={{opacity:0, y:20}}
    whileInView={{opacity:1, y:0}}
    transition={{duration: 0.6, delay: 0.2}}
            
            
            className='flex flex-wrap justify-between items-start gap-8 pb-6
             border-borderColor border-b    '>
                <div >
                    <motion.img
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay:0.3}}
                    src={assets.logo} alt="logo" className=' h-8 md:h-9' />
                    <motion.p
                     initial={{opacity:0}}
                     whileInView={{opacity:1}}
                     transition={{duration: 0.5, delay: 0.4}}   
                    
                    className='max-w-80 mt-3'>
                        Servicio de alquiler de vehículos premium con una amplia selección de vehículos de lujo y de uso diario para todas sus necesidades de conducción.
                    </motion.p>
                    <motion.div
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    transition={{duration: 0.5, delay:0.5}}
                    
                    className='flex items-center gap-3 mt-4'>
                        {/* Instagram */}
                       <a href="#"> <img src={assets.instagram_logo} alt="facebook"  className='w-5 h-5'/></a>
                        {/* Facebook */}
                        <a href="#"> <img src={assets.facebook_logo} alt="facebook"  className='w-5 h-5'/></a>
                        {/* Twitter */}
                       <a href="#"> <img src={assets.twitter_logo} alt="facebook"  className='w-5 h-5'/></a>
                        {/* Gmail */}
                        <a href="#"> <img src={assets.gmail_logo} alt="facebook"  className='w-5 h-5'/></a>
                        
                    </motion.div>
                </div>

                <motion.div
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6, delay:0.4}}
                className='flex flex-wrap justify-between w-1/2 gap-8'>
                    <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Enlaces rápidos</h2>
                    <ul className='mt-3 flex flex-col gap-2 '>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Buscar Vehiculos</a></li>
                        <li><a href="#">Anuncia tu Vehiculo</a></li>
                        <li><a href="#">Acerca de </a></li>
                        
                    </ul>
                </div>
                 <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Recursos</h2>
                    <ul className='mt-3 flex flex-col gap-2 '>
                        <li><a href="#">Centro de ayuda</a></li>
                        <li><a href="#">Plazo de Servicio</a></li>
                        <li><a href="#">Política de privacidad</a></li>
                        <li><a href="#">Seguro </a></li>
                        
                    </ul>
                </div>
                  <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Contactos</h2>
                    <ul className='mt-3 flex flex-col gap-2 '>
                        <li>1417 Luxury Drive</li>
                        <li>Santo Domingo, Republica Dominicana</li>
                        <li><a href="#">809-896-4175</a></li>
                        <li><a href="#">info@example.com </a></li>
                        
                    </ul>
                </div>
                </motion.div>

          

                
            </motion.div>
            
            <motion.div
            initial={{opacity:1, y:10}}
            whileInView={{opacity:1, y: 0}}
            transition={{duration:0.6, delay: 0.6}}
            
            className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a> </li>
                    <li> | </li>
                    <li><a href="#">Terms</a> </li>
                    <li> | </li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </motion.div>
        </motion.div>

  )
}

export default Footer
