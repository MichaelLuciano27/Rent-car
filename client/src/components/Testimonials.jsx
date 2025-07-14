import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import {motion} from 'motion/react'

const Testimonials = () => {
     const testimonials = [
        {  name: "Emma Rodriguez",
             location: "Barcelona, España",
              image: assets.testimonial_image_1, 
              testimonial: "He alquilado coches de varias compañías, pero la experiencia con CarRental fue excepcional." 
            },
            {  name: "Michael Rodriguez",
             location: "New York, USA",
              image: assets.testimonial_image_2, 
              testimonial: " CarRental me facilitó muchísimo el viaje. Me entregaron el coche directamente en la puerta y el servicio al cliente fue fantástico." 
            },
            {  name: "Manuel Rodriguez",
             location: "Santo Domingo, Republica Dominicana",
              image: assets.testimonial_image_1, 
              testimonial: "¡Recomiendo ampliamente CarRental! Su flota es increíble y siempre siento que consigo la mejor oferta con un servicio excelente." 
            }
     ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
        <Title title='Lo que dicen nuestros Cliente' subTitle='Descubra por qué los viajeros más exigentes eligen StayVenture para sus alojamientos de lujo en todo el mundo.' />
            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
            mt-18">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                    initial={{opacity:0, y:40}}
                    whileInView={{opacity:1, y:0}}
                    transition={{duration:0.6, delay: index * 0.2, ease: 'easeOut'}}
                    viewport={{once: true, amount: 0.3}}
                    
                    key={index} className="bg-white p-6 rounded-xl shadow-lg max-w-xs
                    hover:-translate-y-1 transition-all duration-500">

                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className=" text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="" />
                                
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
  )
}

export default Testimonials
