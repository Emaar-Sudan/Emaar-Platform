import { Router } from 'express';
import { projectService } from '../services/project.service';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await projectService.getProjects(req.query);
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get project statistics
router.get('/:id/stats', authenticateUser, async (req, res) => {
  try {
    const stats = await projectService.getProjectStats(req.params.id);
    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;