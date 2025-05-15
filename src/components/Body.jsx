import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useProfile } from "../hooks/userProfile";


const Body = () => {      
      
    useProfile();
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );

}

export default Body;