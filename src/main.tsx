// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import sum from '@/test'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import "./theme.css"
// const total = sum(1, 3)
// console.log(total)
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RouterProvider router={router}>
     <App />
  </RouterProvider> 
   
  // </StrictMode>,
)
