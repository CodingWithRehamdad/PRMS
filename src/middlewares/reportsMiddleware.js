const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads')
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')
        cb(null, `${Date.now()}-${fileName}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)){
           return cb(new Error('please upload png, jpeg, jpg or pdf'))
        }
        cb(undefined, true)
    }
});

module.exports = {
    storage,
    upload
}