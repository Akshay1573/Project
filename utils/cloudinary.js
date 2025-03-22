const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY
});

const cloudinaryUploadImg = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: "auto"
        });
        return { url: result.secure_url };
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
};

module.exports = cloudinaryUploadImg;
