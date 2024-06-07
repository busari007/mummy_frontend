import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choose File');
  const fileInputRef = useRef(null);

  const onChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file\nVeuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res.data);
      alert('Image successfully uploaded\nImage téléchargée avec succès');
      onUpload(); // Trigger the reload of images
      setFile(null); // Reset the file state
      setFileName('Choose File'); // Reset the file name
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input field
      }
    } catch (err) {
      console.error(err);
      if(err.message === 'Network Error'){
        alert('Server is down\nLe serveur est indisponible')
      }
    }
  };

  return (
    <div className="container">
    <h1>Òmose</h1>
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
          <label htmlFor="fileInput">{fileName}</label>
        </div>
        <button type="submit" className="upload">Upload / Télécharger</button>
      </form>
    </div>
  );
};

export default ImageUpload;
