import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { setUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { setFeed } from "../features/user/feed/feedSlice";
import { setReceivedRequests } from "../features/user/received/requests";
import { setConnections } from "../features/user/connections";
import socketConnect from "../utils/socket";

const Navbar = () => { 

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            
            await axios.post(BASE_URL+"logout", {}, { withCredentials: true });
            dispatch(setUser(null));
            dispatch(setFeed(null));
            dispatch(setReceivedRequests(null));
            dispatch(setConnections(null));
            const socket = socketConnect();
            socket.disconnect();
            return navigate("/login");
            
        }catch(err){            
            
        }
    }
    //console.log("navbar", user);

    return(
        <>
            <div className="navbar bg-base-200 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">My Dev Tinder</Link>                    
                </div>
                <div className="flex gap-2">                    
                    <div className="dropdown dropdown-end">
                    
                    {user && <> <label className="mx-2" tabIndex={0} >{ user.firstName + " " + user.lastName }</label>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full mr-2">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            </>
                    }
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">Profile <span className="badge">New</span></Link>                        
                        </li> 
                        <li>
                            <Link to="/connection" className="justify-between">Connections</Link>                        
                        </li>                        
                        <li>
                            <Link to="/my-connection-requests" className="justify-between">My Connection Requests</Link>                        
                        </li>                      
                        <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Navbar;