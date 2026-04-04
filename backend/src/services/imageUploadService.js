const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "campuseye_reports" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = {
  uploadImageToCloudinary
};