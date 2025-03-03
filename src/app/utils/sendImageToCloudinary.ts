import { v2 as cloudinary } from 'cloudinary';

export const sendImageToCloudinary = async() => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dath2zqyj',
    api_key: '226559869657854',
    api_secret: 'lmss8DLB7OSxGLMrSICaWozUMI0',
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .catch((error) => {
      console.log(error);
    });

    console.log(uploadResult);
};
