import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext"


const PrivateRoutes = ({children}) => {

        const {user, loading} = useAuth();

        if(loading){
                return <div style={{textAlign:'center', marginTop:60}}>Loading</div>;
        }
        if (!user){
                return <Navigate to={'/login'} replace />
        }
  return children;
}

export default PrivateRoutes