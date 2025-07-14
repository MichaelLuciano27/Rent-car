
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from '../context/AppContext.jsx'
import {MotionConfig} from 'motion/react'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppProvider>
    <MotionConfig viewport={{once: true}}>
<App />
    </MotionConfig>

  </AppProvider>
    
  </BrowserRouter>,
)
