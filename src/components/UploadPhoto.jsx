import { BASE_URL } from "../utils/constants";

const UploadPhoto = (props) => {    

    const handleUploadImage = (e) => {
        e.preventDefault();
        props.handleUserPicture(e);
        
    }

    return(
        <>
            <div className="card ml-10">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Pick a image</legend>
                    <input type="file" name="file" className="file-input" onChange={handleUploadImage} />
                    <label className="label">Max size 1MB</label>
                    {props.uploadedfile && <div className="avatar">
                        <div className="w-14 rounded">
                            <img src={BASE_URL + props.uploadedfile} />
                        </div>
                    </div>}                   
                </fieldset>
            </div>
        </>
    )
}

export default UploadPhoto;