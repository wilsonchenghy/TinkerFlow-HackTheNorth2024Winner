export const setSelectedImage = (e, setFile) => {
    setFile(e.target.files[0]);
}

export const handleImageUpload = async (setFile, setPhoto) => {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
   var file = e.target.files[0]; 
    }

    input.click();
if (file) {
  const imageUrl = URL.createObjectURL(file);
  setFile(file);
  //setImageUrl(imageUrl);
  setPhoto(imageUrl); 
  try {
    const response = await axios.post("http://localhost:5001/photo", imageUrl);
    console.log('File uploaded successfully');
    console.log('Response data:', response.data);
    setPhoto(imageUrl); // Update photo state with URL or path received from the server
} catch (error) {
    console.error('Error uploading file:', error);
}
}
};

const onFileUpload = async () => {
  
    // const formData = new FormData();
    // formData.append('myFile', file);

    try {
        const response = await axios.post("http://localhost:5001/photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('File uploaded successfully');
        console.log('Response data:', response.data);
        setPhoto(response.data.fileUrl); // Update photo state with URL or path received from the server
    } catch (error) {
        console.error('Error uploading file:', error);
    }
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