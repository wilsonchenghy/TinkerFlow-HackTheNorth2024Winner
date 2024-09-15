import axios from "axios";

export const setSelectedImage = (e, setFile) => {
    setFile(e.target.files[0]);
}

export const fileData = (photo, file) => {
    if (photo) {
        return (
            <div>
                <h2>Uploaded Photo:</h2>
                <img src={photo} alt="Error loading original image" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
        );
    }  
    if (file) {
        return (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {file.name}</p>
                <p>File Type: {file.type}</p>
                <p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
            </div>
        );
    } 
    //else {
        return (
            <div>
                <br />
                <h4>Choose before pressing the Upload button</h4>
            </div>
        );
    //}
};