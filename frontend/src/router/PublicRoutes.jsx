import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    
    const { userState } = useContext(UserContext)
  
    return (
        !userState.isLogged ? <Outlet/> : <Navigate to={'/'} replace={true}/>
  )
}

export default PublicRoutes