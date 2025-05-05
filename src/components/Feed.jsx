import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../features/user/feed/feedSlice";
import FeedCard from "./FeedCard";
import { useNavigate } from "react-router-dom";

const Feed = () => { 

    const dispatch = useDispatch();
    const navigate = useNavigate()   
    const feeds = useSelector((state) => state.feed);    

    const fetchFeed = async () => {        
        try{
            if(feeds !== null && feeds.length !== 0){
                return;
            }
            const res = await axios.get(BASE_URL + "user/feed?page=1&limit=5", { withCredentials: true});            
            dispatch(setFeed(res?.data?.data));

        }catch(err){
            if(err?.response?.status === 404){                
                console.log(err);
            }else if(err?.response?.status === 401){
                navigate("/login");
                
            }
        }


    }

    useEffect( () => {
        fetchFeed();
    }, []);

    return(
        <> <div className="flex flex-col items-center justify-center"> 
           { feeds === null && <h1 className="my-10 text-2xl">No user feeds found.</h1> }           
            { feeds !== null && feeds.length !== 0 && <FeedCard user={feeds[0]} /> }
           </div>
        </>
    );

}

export default Feed;