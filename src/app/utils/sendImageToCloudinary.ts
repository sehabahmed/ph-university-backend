import { v2 as cloudinary } from 'cloudinary';
import config from '../index';
import multer from 'multer';
import fs from 'fs/promises';

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  try {
    // Configuration
    cloudinary.config({
      cloud_name: config.cloudinary_name,
      api_key: config.cloudinary_api_key,
      api_secret: config.cloudinary_api_secret,
    });
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // Delete file from uploads
    await fs.unlink(path);

    return uploadResult;
  } catch (err) {
    console.log('cloudinary upload failed', err);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
