import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './Routes'
import UserProvider from './Hooks/Context/UserProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={Routes} />
    </UserProvider>
  </StrictMode>,
);
