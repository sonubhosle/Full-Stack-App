import React, { useState } from 'react';
import { X } from 'lucide-react';

const FileUpload = ({ label, name, onFileChange }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      onFileChange && onFileChange(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    onFileChange && onFileChange(null);
  };

  return (
    <div className="flex items-center gap-4 mt-2 ">
      <div className="flex-1">
        {label && <p className="text-gray-800 mb-1">{label}</p>}
      <div className="flex border-2 border-dashed border-blue-500 px-4 py-2 rounded-lg hover:border-emerald-600  transition duration-300 ">
          <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleFileChange}
          className="w-full   outline-none  px-4 py-4 "
        />
              {preview && (
        <div className="relative w-15 h-15 overflow-hidden rounded-lg bg-white border-2 border-purple-700">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-700 rounded-full p-1 text-white hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}
      </div>
      </div>


    </div>
  );
};

export default FileUpload;
