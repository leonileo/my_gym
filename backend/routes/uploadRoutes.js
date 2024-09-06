// PROJECT POWERD BY LABA CREATIVES
// API ROUTE and FUNCTION
// uploadRoutes.js
// Import necessary modules
const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!')
    };
}

const upload = multer({
    storage, checkFileType
})

router.post('/', upload.single('picture'), (req, res) => {
    res.send({
        message: 'Picture uploaded',
        picture: `/uploads/${req.file.filename}`
    })
})

module.exports = router;
// PROJECT POWERD BY LABA CREATIVES