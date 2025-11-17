import { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
import ImageUpload from './component/ImageUpload';
import ImageGallery from './component/ImageGallery';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchImages = async (id) => {
    setLoading(true);
    try {
      const apiUrl = 'http://localhost:8080/image/all';

      const response = await axios.get(apiUrl);
      if (response?.status === 200 || response?.status === 304) {
        setImages(response?.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const apiUrl = `http://localhost:8080/image/delete/${id}`;

      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ImageIcon className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Mini Image Gallery</h1>
          </div>
          <p className="text-gray-600">Upload and manage your images</p>
        </div>

        <div className="flex justify-center mb-12">
          <ImageUpload onUploadSuccess={fetchImages} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading images...</p>
            </div>
          ) : (
            <ImageGallery images={images} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
