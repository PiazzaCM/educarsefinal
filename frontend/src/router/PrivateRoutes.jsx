import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoutes = () => {
    
    const { userState } = useContext(UserContext)
  
    return (
        userState.isLogged && userState.role === 1 ? <Outlet/> : <Navigate to={'/'} replace={true}/>
  )
}

export default PrivateRoutes