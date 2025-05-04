import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ReceivedRequestItem from "./ReceivedRequestItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReceivedRequests } from "../features/user/received/requests";

const ReceivedRequests = () => {

    const dispatch = useDispatch();
    const [message, setMessage] = useState(false);
    const receivedRequests = useSelector((state) => state.receivedRequests);    
    const loggedInUser = useSelector((state) =>  state.user);
    const fetchReceivedRequests = async () => {
        setMessage(false);
        try{
            if(receivedRequests){
                return;

            }
            const res = await axios.get(BASE_URL+"user/request/received", { withCredentials: true });            
            dispatch(setReceivedRequests(res?.data?.connections));
            console.log(res?.data?.connections);


        }catch(err){
            if(err?.response?.status === 404){
                setMessage(err?.response?.data?.message);
                console.log(err);
            }
            
        }

    }
    useEffect(() => {
        fetchReceivedRequests();
    }, []);

    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className="my-10 text-2xl">My Connection Requests</h1>
            { message && <p>{message}</p>}
           {receivedRequests && receivedRequests.map((receivedRequest) => {
                return(
                    <ReceivedRequestItem key={receivedRequest._id} receivedRequestItem={receivedRequest} loggedInUser={loggedInUser}/>
                )
           })} 
           
        </div>
    )
}
export default ReceivedRequests;