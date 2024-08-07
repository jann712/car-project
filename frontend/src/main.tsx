import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import CarSearch from './pages/CarSearch.tsx'
import Login from './pages/Login.tsx'
import VendaCarro from './pages/VendaCarro.tsx'
import AdminPanel from './pages/AdminPanel.tsx'
import NovoCarro from './pages/NovoCarro.tsx'
import EditCar from './pages/EditCar.tsx'
import Logout from './pages/Logout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "carros",
      element: <CarSearch />
    },
    {
      path: "login",
      element: <Login />
    },
    // {
    //   path: "carro/:id",
    //   element: <VendaCarro />
    // },
    {
      path: "admin",
      element: <AdminPanel />
    },
    {
      path: "carro/novo",
      element: <NovoCarro />
    },
    {
      path: "carro/edit/:id",
      element: <EditCar />
    }]

  },
  {
    path: "*",
    element: <Navigate to={"/carros"} replace />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
