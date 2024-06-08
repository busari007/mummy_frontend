import React, { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './firebaseConfig'; // Import the storage object

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const onChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file\nVeuillez sélectionner un fichier');
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    console.log('Uploaded image URL:', url);
    alert('Image successfully uploaded\nImage téléchargée avec succès');
    onUpload(); // Trigger the reload of images
    setFile(null); // Reset the file state
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input field
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            id="fileInput"
            name="image"
            onChange={onChange}
            ref={fileInputRef}
          />
        </div>
        <button type="submit" className="upload">Upload / Télécharger</button>
      </form>
    </div>
  );
};

export default ImageUpload;
