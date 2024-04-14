import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoutes = () => {
   
    const token = useSelector((state) => state?.user?.token);
    return(
        token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes;