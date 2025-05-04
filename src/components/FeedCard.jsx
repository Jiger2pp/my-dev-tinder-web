import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const FeedCard = ({user}) => {
    const { _id, firstName, lastName, age, skills, gender, phone, about } = user;
    const [message, setMessage] = useState(false);
    const handleSendRequest = async (status) => {
        setMessage(false);
        try{

            const res = await axios.post(BASE_URL + "request/send/" + status + "/"+_id, {}, { withCredentials: true});
            
            setMessage(res?.data?.message);
            //dispatch(setReceivedRequests(res?.data?.data));
            console.log(res.data.status);
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
            console.log(err);
            
        }
    }
    return (
            <div className="flex flex-col items-center justify-center my-10">
                { message && <div className="toast toast-top toast-center">            
                    <div className="alert alert-success">
                        <span>{message}</span>
                    </div>
                </div>
                }
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                        src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                        alt="Avatar"
                        className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{age ? age : "Age not added"}, { firstName + " " + lastName}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                        <button className="btn btn-primary" onClick={ () => handleSendRequest("ignore")}>Ignore</button>
                        <button className="btn btn-secondary" onClick={ () => handleSendRequest("interested")}>Interested</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default FeedCard;