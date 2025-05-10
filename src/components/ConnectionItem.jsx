import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectionItem  = ({connection}) => {
    const {firstName, lastName, _id} = connection;
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();
    const handleNavigateToChatWindow = () => {
        
        return navigate("/chat/"+_id);
        
    }
    
    return (
            <>               
                <div className="card card-side bg-base-200 shadow-sm border-0 my-5">
                    { message && <div className="toast toast-top toast-center">            
                        <div className="alert alert-success">
                            <span>{message}</span>
                        </div>
                    </div>
                    }
                    <div className="flex width-auto">
                        <img
                            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                            alt="My Connections" className="w-40 rounded-full" />
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">{firstName + " " + lastName}</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={ handleNavigateToChatWindow }>Chat Now</button>
                            
                        </div>
                    </div>
                </div>        
            </>
    );
}

export default ConnectionItem