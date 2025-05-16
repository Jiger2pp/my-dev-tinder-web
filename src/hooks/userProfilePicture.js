import { useDispatch } from "react-redux";
import { addPicture } from "../features/user/picture";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";

export function useUserProfilePicture(user){

    const dispatch = useDispatch();   
   
    const fetchUserProfilePic = async (user) => {
        try{
            if(!user){                
                return;
            }            
            const res = await axios.get(BASE_URL+"profile/picture/" + user._id, { withCredentials: true });  
            //console.log(res?.data?.data);         
            dispatch(addPicture(res?.data?.data?.pictureUrl))

        } catch(err){
            if(err?.response?.status === 401){                
                return navigate("/login");
            }            
        }

    }

    useEffect(() => {
        fetchUserProfilePic(user);
    }, [user?._id]);

}

