import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useProfile } from "../hooks/userProfile";
import { useUserProfilePicture } from "../hooks/userProfilePicture";
import { useSelector } from "react-redux";


const Body = () => {      
    const user = useSelector((state) => state.user);      
    useProfile(user);
    useUserProfilePicture(user);
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );

}

export default Body;