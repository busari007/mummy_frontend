import { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './firebaseConfig'; // Import the storage object
import './App.css';

const ImageUpload = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    const selectedFile = fileInputRef.current.files[0];
    if (!selectedFile) {
      alert('Please select a file\nVeuillez sélectionner un fichier');
      return;
    }

    const storageRef = ref(storage, `images/${selectedFile.name}`);
    await uploadBytes(storageRef, selectedFile);
    const url = await getDownloadURL(storageRef);

    console.log('Uploaded image URL:', url);
    alert('Image successfully uploaded\nImage téléchargée avec succès');
    onUpload(); // Trigger the reload of images
    fileInputRef.current.value = ''; // Clear the file input field
  };

  return (
    <div className="container">
      <label className="upload" htmlFor="fileInput">
        Upload / Télécharger
      </label>
      <input
        type="file"
        id="fileInput"
        name="image"
        onChange={handleUpload}
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the input field
      />
    </div>
  );
};

export default ImageUpload;
