import { useSelector } from "react-redux";
import { useProfile } from "../hooks/userProfile";
import EditProfile from "./EditProfile";

const Profile = () => {
    
    const user = useSelector((state) => state.user);    
    useProfile();    
    return(
        <>
           { user && <EditProfile user={user} />  }
        </>
    );

}

export default Profile;