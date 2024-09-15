import axios from "axios";

export const setSelectedImage = (e, setFile) => {
    setFile(e.target.files[0]);
}

export const handleImageUpload = async () => {
    console.log("hello"); 
    var file = null;
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = async (e) => { 
        file = e.target.files[0]; 
        console.log("ddd");
        console.log("File ", file); 
        //identifyImage(file); 
        //sendMultiModalPromptWithImage(URL.createObjectURL(file));
        var reader = new FileReader(); 
        reader.addEventListener("load", async () => {
          const data_url = reader.result;
          console.log(data_url);
          try {
            const response = await axios.post("http://localhost:5001/test", {'image_url': data_url});
            console.log('File uploaded successfully');
            console.log('Response data:', response.data);
            //identifyImage(file, imageUrl); 
          } catch (error) {
            console.error('Error uploading file:', error);
        }
        })
        reader.readAsDataURL(file); 
        //console.log(data_url);
    }

    input.click();
};

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