import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeReceivedRequest } from "../features/user/received/requests";

const ReceivedRequestItem = ({receivedRequestItem, loggedInUser}) => {    
    
    const dispatch = useDispatch();
    const {toUserId, fromUserId, _id} = receivedRequestItem;
    
    const {firstName, lastName, about, pictureUrl} = toUserId._id === loggedInUser._id ? fromUserId : toUserId;
    const [message, setMessage] = useState(false);

    const handleReviewRequest = async (status) => {
        setMessage(false);
        try{

            const res = await axios.post(BASE_URL + "request/review/" + status + "/"+_id, {}, { withCredentials: true});
            
            setMessage(res?.data?.message);
            dispatch(removeReceivedRequest(_id));            
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

    return(
        <div className="card card-side bg-base-200 shadow-sm border-0 my-5">
        { message && <div className="toast toast-top toast-center">            
            <div className="alert alert-success">
                <span>{message}</span>
            </div>
        </div>
        }
        <div className="flex width-auto">
            <img
                src={pictureUrl ? BASE_URL + pictureUrl : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"}
                alt="My Connections" className="w-40 rounded-full" />
        </div>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <div className="w-98"><p>{about ? about : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id eros arcu. Duis tristique lorem vel ultricies egestas. Nullam egestas sapien leo, at auctor purus rhoncus eget. Suspendisse potenti."}</p></div>
            <div className="card-actions justify-end">
            {
                fromUserId?._id !== loggedInUser?._id ? (<><button className="btn btn-primary" onClick={ () => handleReviewRequest("accepted") }>Accept</button>
                    <button className="btn btn-error" onClick={ () => handleReviewRequest("rejected") } >Reject</button></>)
                : (<button className="btn btn-primary">Pending</button>)
            }
                
            </div>
        </div>
    </div>
    );
}

export default ReceivedRequestItem;