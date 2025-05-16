import { useSelector } from "react-redux";
import { useProfile } from "../hooks/userProfile";
import EditProfile from "./EditProfile";
import { useUserProfilePicture } from "../hooks/userProfilePicture";

const Profile = () => {
    
    const user = useSelector((state) => state.user);    
    useProfile(user); 
    useUserProfilePicture(user);  
    return(
        <>
           { user && <EditProfile user={user} />  }
        </>
    );

}

export default Profile;