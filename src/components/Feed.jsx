import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../features/user/feed/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => { 

    const dispatch = useDispatch();
    const [message, setMessage] = useState(false);
    const feeds = useSelector((state) => state.feed);    

    const fetchFeed = async () => {
        setMessage(false);
        try{
            if(feeds){
                return;
            }
            const res = await axios.get(BASE_URL + "user/feed?page=1&limit=1", { withCredentials: true});            
            dispatch(setFeed(res?.data?.data));

        }catch(err){
            if(err?.response?.status === 404){
                setMessage(err?.response?.data?.message);
                console.log(err);
            }
        }


    }

    useEffect( () => {
        fetchFeed();
    }, []);

    return(
        <> <div className="flex flex-col items-center justify-center">            
            { message && <p>{message}</p>}
            { feeds !== null && feeds.map((feed) => { return (<FeedCard key={feed._id} user={feed}/>) })  }
           </div>
        </>
    );

}

export default Feed;