import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import { Home, Login, SignIn } from './pages'
import ProtectedRoute from './utils/ProtectedRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
