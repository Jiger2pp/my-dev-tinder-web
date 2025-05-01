import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login = () => { 

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(false);   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try{

            if(!emailId || !password){
                setError("Either email or password is empty");
                return;
            }
            const res = await axios.post(BASE_URL + "login", {
                email: emailId,
                password: password
               
            }, { withCredentials: true });
            if(res.status !== 200){
                setError(res.data.message);
                return;
            }
            setError(false);
            dispatch( setUser(res.data.user));
            navigate("/");            
            
        }catch(err){            
            setError(err.response.data.message);            
        }
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center my-10">
                <div className="card card-dash bg-base-200 w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Login</h2>
                       { error && <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
        }
                        <label className="label flex flex-col items-start my-2">
                            <span>Email</span>
                            <input type="text" value={emailId} onChange={ (e) => setEmailId(e.target.value)} className="input input-md border-none" />
                        </label>
                        <label className="label flex flex-col items-start">
                            <span>Password</span>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-md border-none" />
                        </label>                       
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={ handleLogin }>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );  

}

export default Login;