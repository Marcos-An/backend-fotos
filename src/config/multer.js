const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
      destination: (req, file, message) => {
        message(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), )
      },
      filename: (req, file,cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if(err){
              return cb(err)
            }
            
            const fileName = `${hash.toString('hex')}-${file.originalname}`;

            cb(null, fileName);
        })
      }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, message) => {
      const allowedMines = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
      ]
      
      console.log(file.mimetype)
      if(allowedMines.includes(file.mimetype)){
        message(null, true);
      } else {
        message(new Error("Invalid file type"))
      }
  },
}