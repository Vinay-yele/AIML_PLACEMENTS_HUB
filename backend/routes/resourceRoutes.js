import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getAllResources, uploadResource, downloadResource, deleteResource } from '../controllers/resourceController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/', getAllResources);
router.post('/upload', upload.single('file'), uploadResource);
router.get('/download/:filename', downloadResource);
router.delete('/:id', deleteResource);

export default router;
