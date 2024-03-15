import { v2 } from 'cloudinary'

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
})

export const uploadImage = async (filepath) => {
    return await v2.uploader.upload(filepath, {
         folder: 'educarse' 
        });
}

export const deleteImage = async (imageId) =>{
    return await v2.uploader.destroy(imageId);
}

