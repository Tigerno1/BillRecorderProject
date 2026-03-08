// import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import sum from '@/test'
import router from './router'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import "./theme.css"
import store from './store'
// const total = sum(1, 3)
// console.log(total)

const root = createRoot(document.getElementById('root')!)
root.render(
  // <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider> 
    </Provider>
  
   
  // </StrictMode>,
)
