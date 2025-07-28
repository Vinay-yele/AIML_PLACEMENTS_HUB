// backend/routes/issueRoutes.js
import { Router } from 'express';
import {
  getAllIssues,
  createIssue,
  getIssueById,
  updateIssue,
  deleteIssue
} from '../controllers/issueController.js';

const router = Router();

router.route('/')
  .get(getAllIssues)
  .post(createIssue);

router.route('/:id')
  .get(getIssueById)
  .patch(updateIssue)
  .delete(deleteIssue);

// ✅ This line is absolutely required for ES Modules default import
export default router;
