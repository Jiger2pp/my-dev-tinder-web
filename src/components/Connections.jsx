import { useEffect, useState} from "react";
import ConnectionItem from "./ConnectionItem";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../features/user/connections";

const Connections  = () => {

    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();    
    const connections = useSelector(state => state.connections); // Replace with your actual state selector
    const fetchConnections = async () => {
        setMessage(false);
        try{
            if(connections){
                return;

            }
            const res = await axios.get(BASE_URL+"user/connections", { withCredentials: true });            
            dispatch(setConnections(res?.data?.connections));

        }catch(err){
            if(err?.response?.status === 404){
                setMessage(err?.response?.data?.message);
                console.log(err);
            }
        }

    }
    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        
        <div className="flex flex-col items-center justify-center">
            <h1 className="my-10 text-2xl">Connections</h1>
            { message && <p>{message}</p>}  
            {connections && connections.map( (connection) => {
                return (
                    <ConnectionItem key={connection._id} connection={connection} />
                )

            }) } 
        </div>
    
        
    );
}

export default Connections