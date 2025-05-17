import { useRef, useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";
import UploadPhoto from "./UploadPhoto";
import { addPicture } from "../features/user/picture";

const EditProfile = ({user}) => {

    const dispatch = useDispatch();   
    const userPictureUrl = useSelector((state) => state.pictureUrl);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age === undefined ? "" : user?.age);
    const [skills, setSkills] = useState(user?.skills);
    const [gender, setGender] = useState(user?.gender === undefined ? "" : user?.gender);
    const [phone, setPhone] = useState(user?.phone === undefined ? "" : user?.phone);
    const [about, setAbout] = useState(user?.about === undefined ? "" : user?.about);
    const [message, setMessage] = useState(false); 
    const [previewPicture, setPreviewPicture] = useState(false);    
    const [isError, setIsError] = useState(false);       
    const setTimeOutRef = useRef(null);
    const phoneRef = useRef(null);
    const ageRef = useRef(null);
    
    
    const handleSaveProfile = async () => {
        try{
            setMessage(false);
            setIsError(false);            
            if( age && ( parseInt(age) <= 0 || parseInt(age) >= 100 ) ){
                ageRef.current.focus();
                setMessage("Please enter valid age.");
                setIsError(true);
                setTimeOutRef.current = setTimeout(() => {
                    setMessage(false);
                }, 2000);
                return; 
            }
            if(phone && phone.length > 10){
                phoneRef.current.focus();
                setMessage("Please enter valid phone number.");
                setIsError(true);
                setTimeOutRef.current = setTimeout(() => {
                    setMessage(false);
                }, 2000);
                return;
            }
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
            setTimeOutRef.current = setTimeout(() => {
                setMessage(false);
            }, 2000);            

        }catch(err){
            setMessage(err);
            setIsError(true);
            clearTimeout(setTimeOutRef.current);            
        }
    }

    const handleUserPicture = async (e) => {

        setMessage(false);
        setIsError(false); 
        const validFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if(typeof e.target.files === "undefined"){            
            setMessage("Please upload an image.");
            setIsError(true);
            setTimeOutRef.current = setTimeout(() => {
                setMessage(false);
            }, 2000);
            return ;
        }else if(typeof e.target.files !== "undefined" && e.target.files.length === 0){            
            setMessage("Please upload an image.");
            setIsError(true);
            setTimeOutRef.current = setTimeout(() => {
                setMessage(false);
            }, 2000);
            return ;
        }else if(typeof e.target.files !== "undefined" && ( e.target.files[0].size === 0 || !validFileTypes.includes(e.target.files[0].type))){            
            setMessage("Please upload a valid image.");
            setIsError(true);
            setTimeOutRef.current = setTimeout(() => {
                setMessage(false);
            }, 2000);
            return ;
        }
        
        
        const formData = new FormData();
        formData.append('userImage', e.target.files[0]);
        const res = await axios.post(BASE_URL + "profile/picture", formData,
        {           
            withCredentials: true
        });
        
        setPreviewPicture(res.data.data.pictureUrl);
        dispatch(addPicture(res.data.data.pictureUrl));

    }
  
    return (
    <div className="flex flex-row justify-center align-items">
       { message && <div className="toast toast-top toast-center">            
            <div className={!isError ? "alert alert-success" : "alert alert-error"}>
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
                            <input type="text" max={'100'} value={age} onChange={(e) => setAge(e.target.value)} className="input input-md border-none"  ref={ageRef} />
                        </label> 
                        <label className="label flex flex-col items-start">
                            <span>Gender</span>                          
                            <select onChange={(e) => setGender(e.target.value)} value={gender} className="input select input-md border-none" >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Others</option>
                            </select>
                        </label> 
                        <label className="label flex flex-col items-start">
                            <span>Phone</span>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-md border-none" ref={phoneRef} />
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
            
            <div className="card">
                <FeedCard user={{firstName, lastName, age, skills, gender, phone, about, pictureUrl:previewPicture? previewPicture : userPictureUrl}} />
                <UploadPhoto handleUserPicture={handleUserPicture} uploadedfile={userPictureUrl}/>
            </div>
        </div>
  );
}
export default EditProfile;