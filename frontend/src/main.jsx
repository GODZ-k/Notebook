
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route , RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import './index.css'
import Layout from './Layout.jsx'
import { Add, Home, Login, Signup, Verify } from './Components/index.js'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='create' element={<Add/>}/>

      <Route path='/user'>
      <Route path='login' element={<Login/>}/>
      <Route path='verify' element={<Verify/>}/>
      <Route path='signup' element={<Signup/>}/>
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={route}/>
  </React.StrictMode>,
)
