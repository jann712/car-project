import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import CarSearch from './pages/CarSearch.tsx'
import Login from './pages/Login.tsx'

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
