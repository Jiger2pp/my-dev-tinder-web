import { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

const EditProfile = ({user}) => {

    const dispatch = useDispatch();
    
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age === undefined ? "" : user?.age);
    const [skills, setSkills] = useState(user?.skills);
    const [gender, setGender] = useState(user?.gender === undefined ? "" : user?.gender);
    const [phone, setPhone] = useState(user?.phone === undefined ? "" : user?.phone);
    const [about, setAbout] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id eros arcu. Duis tristique lorem vel ultricies egestas. Nullam egestas sapien leo, at auctor purus rhoncus eget. Suspendisse potenti.");
    const [message, setMessage] = useState(false);
    
    const handleSaveProfile = async () => {
        try{
            setMessage(false);
            const skillArr = typeof skills === "string" ? skills.split(",") : skills ;                      
            const res = await axios.put(BASE_URL + "profile/edit", {
                firstName,
                lastName,
                age,
                skills: skillArr,
                gender,
                phone,
                about 
            }, { withCredentials: true});
            dispatch(setUser(res?.data?.user));
            setMessage(res?.data?.message);
            const time = setTimeout(() => {
                setMessage(false);
            }, 2000);
            //console.log(res?.data?.user);

        }catch(err){
            setMessage(err);
            clearTimeout(time);
            console.log(err);
        }
    }
  
    return (
    <div className="flex flex-row justify-center align-items">
       { message && <div className="toast toast-top toast-center">            
            <div className="alert alert-success">
                <span>{message}</span>
            </div>
        </div>
        }
        <div className="flex flex-col items-center justify-center my-10">
                <div className="card card-dash bg-base-200 w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>                   
        
                        <label className="label flex flex-col items-start my-2">
                            <span>First Name</span>
                            <input type="text" value={firstName} onChange={ (e) => setFirstName(e.target.value)} className="input input-md border-none" />
                        </label>
                        <label className="label flex flex-col items-start my-2">
                            <span>Last Name</span>
                            <input type="text" value={lastName} onChange={ (e) => setLastName(e.target.value)} className="input input-md border-none" />
                        </label>
                        <label className="label flex flex-col items-start">
                            <span>Age</span>
                            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input input-md border-none" />
                        </label> 
                        <label className="label flex flex-col items-start">
                            <span>Gender</span>
                            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input input-md border-none" />
                        </label> 
                        <label className="label flex flex-col items-start">
                            <span>Phone</span>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-md border-none" />
                        </label> 
                        <label className="label flex flex-col items-start">
                            <span>Skills</span>
                            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="input input-md border-none" />
                        </label> 
                        <label className="label flex flex-col items-start">
                            <span>About Me</span>
                            <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input input-md border-none" />
                        </label>                       
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={handleSaveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <FeedCard user={{firstName, lastName, age, skills, gender, phone, about}} />
        </div>
  );
}
export default EditProfile;