const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dccfai5ci',
  api_key: '841286866772369',
  api_secret: 'CCFRpzuFXMm35BrVLAZzewyzXKk',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // change folder name if needed
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage });

const uploadProductImages = upload.any(); 

module.exports = { cloudinary, uploadProductImages,upload };
