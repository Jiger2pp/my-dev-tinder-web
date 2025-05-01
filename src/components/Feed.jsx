import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../features/user/feed/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => { 

    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);    

    const fetchFeed = async () => {

        try{
            if(feed){
                return;
            }
            const res = await axios.get(BASE_URL + "user/feed", { withCredentials: true});            
            dispatch(setFeed(res?.data?.data));

        }catch(err){
            console.log(err);
        }


    }

    useEffect( () => {
        fetchFeed();
    }, []);

    return(
        <>
           { feed !== null && (<FeedCard user={feed[0]}/>) }
        </>
    );

}

export default Feed;