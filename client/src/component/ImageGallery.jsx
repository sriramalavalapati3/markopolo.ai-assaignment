import { Trash2 } from 'lucide-react';

const ImageGallery = ({ images, onDelete }) => {
  if (images?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No images uploaded yet</p>
        <p className="text-gray-400 text-sm mt-2">Upload your first image to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images && images?.length > 0 && images?.map((image) => (
        <div
          key={image.id}
          className="relative group bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        >
          <div className="aspect-square">
            <img
              src={`http://localhost:8080${image.fileUrl}`}
              alt={image.fileName}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => onDelete(image.id)}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
            aria-label="Delete image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
