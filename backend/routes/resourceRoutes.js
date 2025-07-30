import { Router } from 'express';
import  { upload }  from '../middleware/multer.middleware.js';
import { getAllResources, uploadResource, downloadResource } from '../controllers/resourceController.js';

const router = Router();

router.get('/', getAllResources);
router.post('/upload',  upload.single('pdf'), uploadResource);
router.get('/download/:filename', downloadResource);

export default router;
