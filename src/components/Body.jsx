import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";

const Body = () => {
    
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUserprofile = async () => {
        try{
            if(user){                
                return;
            }
            const res = await axios.post(BASE_URL+"profile/view",{}, { withCredentials: true });           
            dispatch(setUser(res?.data?.user))

        } catch(err){
            if(err?.response?.status === 401){
                return navigate("/login");
            }            
        }

    }

    useEffect(() => {
        fetchUserprofile();
    }, []);

    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );

}

export default Body;