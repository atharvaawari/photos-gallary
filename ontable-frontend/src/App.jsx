import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import { Home, Login, SignIn } from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
