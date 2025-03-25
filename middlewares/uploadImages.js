const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "unsupported file format",
      },
      false
    );
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fieldSize: 1000000,
  },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  
  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = `public/images/products/${file.filename}`;
      
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .toFile(outputPath);

      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath); // Only delete if the file exists
      } else {
        console.warn("File not found for deletion:", outputPath);
      }
    })
  );
  
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  
  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = `public/images/blogs/${file.filename}`;
      
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .toFile(outputPath);

      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath); // Only delete if the file exists
      } else {
        console.warn("File not found for deletion:", outputPath);
      }
    })
  );
  
  next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
