import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import './App.css';
import ImageUpload from './ImageUpload';
import { storage } from './firebaseConfig'; // Import the storage object

function App() {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [reload, setReload] = useState(false); // State to trigger re-fetching

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, 'images');
      const imageList = await listAll(storageRef);
      const imageUrls = await Promise.all(imageList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, src: url };
      }));
      setImages(imageUrls);
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
      const deletionPromises = selectedImages.map(async (imageName) => {
        const imageRef = ref(storage, `images/${imageName}`);
        await deleteObject(imageRef);
      });

      await Promise.all(deletionPromises);
      alert('Images successfully deleted\nImages supprimées avec succès');
      handleReload(); // Trigger reload after deletion
      setSelectedImages([]); // Clear selected images
    } catch (err) {
      console.error(err);
      alert('Failed to delete images\nÉchec de la suppression des images');
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
                src={image.src}
                alt={image.name}
                className="image-item"
              />
              <input
                className='checkbox'
                type="checkbox"
                onChange={() => handleCheckboxChange(image.name)}
                checked={selectedImages.includes(image.name)}
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
