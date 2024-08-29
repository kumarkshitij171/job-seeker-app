import env from 'dotenv';
env.config();
import express, { Router } from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { LoginJobSeeker, LogoutJobSeeker, profileJobSeeker, RegisterJobSeeker } from './controller/job.controller.js';
import { auth } from './middlewares/auth.js';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 8000;
const app = express();
await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get('/api/resume/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Resume not found');
        }
        res.sendFile(filePath);
    });
});

// multer
const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        cb(null, './uploads/')
    },
    filename: function (_, file, cb) {
        const fileNewName = path.parse(file.originalname.replace(/\s/g, '_')).name + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileNewName)
    }
});
const fileFilter = (_, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};
const upload = multer({ storage, fileFilter });


app.get('/', (_, res) => {
    res.send('Hello World!');
});

// router 
const router = Router();
app.use('/', router);

router.post('/register', upload.single('resume'), RegisterJobSeeker);
router.post('/login', LoginJobSeeker);
router.post('/logout', auth, LogoutJobSeeker);
router.post('/profile', auth, profileJobSeeker);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  