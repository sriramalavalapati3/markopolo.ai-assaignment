import multer from 'multer';

const upload = multer({
    limits: { fileSize:3 * 1024 * 1024 }, // 3 MB
    fileFilter: (req, res, cb) =>{
        if(res.mimetype === 'image/jpeg' || res.mimetype === 'image/png'){
            cb(null, true);
        } else {
            cb(new Error('Only .jpeg and .png files are allowed!'));
        }
    }
});

export default upload.single('image');