import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";
import EditProfile from "./EditProfile";

const Profile = () => { 

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const fetchUserProfile = async() => {
        try{

            if(user){                
                return;
            }
            
            const res = await axios.post(BASE_URL+"profile/view",{}, { withCredentials: true});
            //console.log(res?.data?.user);
            dispatch(setUser(res?.data?.user))

        } catch(err){
            if(err?.response?.status === 401){
                return navigate("/login");
            }
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);


    return(
        <>
           { user && <EditProfile user={user} />  }
        </>
    );

}

export default Profile;