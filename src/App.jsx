import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import ImageUpload from './ImageUpload';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [reload, setReload] = useState(false); // State to trigger re-fetching

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await Axios.get('http://localhost:3000/images');
        setImages(res.data);
      } catch (err) {
        console.error(err);
        if(err.message === 'Network Error'){
          alert('Server is down\nCannot fetch images\nLe serveur est indisponible\nImpossible de récupérer les images')
        }
      }
    };

    fetchImages();
  }, [reload]); // Re-fetch images when reload changes

  const handleReload = () => {
    setReload(!reload); // Toggle reload state to trigger useEffect
  };

  const handleCheckboxChange = (filename) => {
    setSelectedImages(prevSelected => {
      if (prevSelected.includes(filename)) {
        return prevSelected.filter(item => item !== filename);
      } else {
        return [...prevSelected, filename];
      }
    });
  };

  const handleDelete = async () => {
    try {
      await Axios.post('http://localhost:3000/delete', { filenames: selectedImages });
      alert('Images successfully deleted\nImages supprimées avec succès en français');
      handleReload(); // Trigger reload after deletion
      setSelectedImages([]); // Clear selected images
    } catch (err) {
      console.error(err);
      if(err.message === 'Network Error'){
        alert('Server is down\nCannot delete images\nLe serveur est indisponible\nImpossible de supprimer des images')
      }else if(err.response.data.error === 'Nothing was passed in'){
        alert('Pick something to delete\nChoisissez quelque chose à supprimer');
      }
    }
  };

  return (
    <div id='webpage'> 
     <div className="overlay"></div>
      <div id='landing'>
        <ImageUpload onUpload={handleReload} />
      </div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-item-wrapper">
            <div className="image-container">
              <img
                src={`http://localhost:3000/images/${image}`}
                alt={image}
                className="image-item"
              />
              <input
                className='checkbox'
                type="checkbox"
                onChange={() => handleCheckboxChange(image)}
                checked={selectedImages.includes(image)}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="delete-button" onClick={handleDelete}>Shānchú</button>
    </div>
  );
}

export default App;
