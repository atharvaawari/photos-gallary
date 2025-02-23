import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {

  const userAuthenticate = useSelector(state => state.authSlice?.isAuthenticate);

  if(!userAuthenticate){
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute