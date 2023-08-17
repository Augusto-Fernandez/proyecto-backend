import { resolve } from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationFolder = 'documents'; 

    if (file.fieldname === 'profileImage') {
      destinationFolder = 'profile'; 
    } else if (file.fieldname === 'productImage') {
      destinationFolder = 'products'; 
    }

    cb(null, resolve(`src/public/${destinationFolder}`));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

export const uploader = multer({ storage });
