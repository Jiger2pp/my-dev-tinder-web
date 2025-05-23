import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed, setFeed } from "../features/user/feed/feedSlice";

const FeedCard = ({user}) => {
       
    const { _id, firstName, lastName, age, skills, gender, phone, about, pictureUrl } = user;   
    const [message, setMessage] = useState(false);
    const feeds = useSelector(state => state.feed);
    const dispatch  = useDispatch()
    const handleSendRequest = async (status) => {
        setMessage(false);
        try{

            const res = await axios.post(BASE_URL + "request/send/" + status + "/"+_id, {}, { withCredentials: true});
            
            setMessage(res?.data?.message);           
            if(feeds.length === 1){                 
                dispatch(setFeed(null));
            }else{                
                dispatch(removeFeed(_id));
            }            
            setTimeout(function(){
                setMessage(false);
            }, 2000);

        }catch(err){
            if(err?.response?.status !== 200 ){
                setMessage(err?.response?.data?.message);
                setTimeout(function(){
                    setMessage(false);
                }, 2000);
            }            
            
        }
    }
    return (
           user != null &&  <div className="flex flex-col items-center justify-center my-10">
                { message && <div className="toast toast-top toast-center">            
                    <div className="alert alert-success">
                        <span>{message}</span>
                    </div>
                </div>
                }
                <div className="card bg-base-100 w-98 shadow-sm">
                   <figure className="px-10 pt-10">
                        <img
                        src={!pictureUrl ? "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" : BASE_URL + pictureUrl}
                        alt="Avatar"
                        className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{gender? gender : "Not Avaiable"}, {age ? age : "Age not added"}, { firstName + " " + lastName}</h2>                        
                        <div className="w-98"><p>{about ? about : "A card component has a figure, a body part, and inside body there are title and actions parts"}</p></div>
                        { typeof _id !=="undefined" && (<div className="card-actions">
                        <button className="btn btn-primary" onClick={ () => handleSendRequest("ignore")}>Ignore</button>
                        <button className="btn btn-secondary" onClick={ () => handleSendRequest("interested")}>Interested</button> 
                        </div>)}
                    </div>
                </div>
            </div>
    );
}

export default FeedCard;