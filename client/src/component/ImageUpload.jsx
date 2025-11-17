import { useState } from 'react';
import { Upload } from 'lucide-react';

const ImageUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
          setProgress(100);
          setTimeout(() => {
            setUploading(false);
            setProgress(0);
            onUploadSuccess();
            e.target.value = '';
          }, 500);
        } else {
          const response = JSON.parse(xhr.responseText);
          setError(response.error || 'Upload failed');
          setUploading(false);
          setProgress(0);
        }
      });

      xhr.addEventListener('error', () => {
        setError('Network error occurred');
        setUploading(false);
        setProgress(0);
      });

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-image`;
      xhr.open('POST', apiUrl);
      xhr.setRequestHeader('Authorization', `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`);
      xhr.send(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          uploading
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-2 ${uploading ? 'text-gray-400' : 'text-blue-500'}`} />
          <p className="mb-2 text-sm text-gray-700">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500">JPEG or PNG (MAX. 3MB)</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Uploading...</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
