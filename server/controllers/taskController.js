import Project from '../models/project.js';
import Task from '../models/task.js';
import { getPagination, makePageResponse } from '../utils/paginate.js';

async function ensureProjectOwnership(projectId, userId) {
  const proj = await Project.findOne({ _id: projectId, user: userId });
  return !!proj;
}

export async function createTask(req, res, next) {
  try {
    const { projectId } = req.params;
    const owns = await ensureProjectOwnership(projectId, req.user.id);
    if (!owns) return res.status(404).json({ message: 'Project not found' });
    const doc = await Task.create({ ...req.body, project: projectId });
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function updateTask(req, res, next) {
  try {
    const { projectId, taskId } = req.params;
    const owns = await ensureProjectOwnership(projectId, req.user.id);
    if (!owns) return res.status(404).json({ message: 'Project not found' });
    const updated = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteTask(req, res, next) {
  try {
    const { projectId, taskId } = req.params;
    const owns = await ensureProjectOwnership(projectId, req.user.id);
    if (!owns) return res.status(404).json({ message: 'Project not found' });
    const deleted = await Task.findOneAndDelete({ _id: taskId, project: projectId });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) { next(err); }
}

export async function listTasks(req, res, next) {
  try {
    const { projectId } = req.params;
    const { status } = req.query;
    const owns = await ensureProjectOwnership(projectId, req.user.id);
    if (!owns) return res.status(404).json({ message: 'Project not found' });

    const { page, limit, skip } = getPagination(req.query);
    const filter = { project: projectId };
    if (status) filter.status = status;

    const [items, total] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(filter)
    ]);

    res.json(makePageResponse({ items, total, page, limit }));
  } catch (err) { next(err); }
}

export async function getTask(req, res, next) {
  try {
    const { projectId, taskId } = req.params;
    const owns = await ensureProjectOwnership(projectId, req.user.id);
    if (!owns) return res.status(404).json({ message: 'Project not found' });
    const doc = await Task.findOne({ _id: taskId, project: projectId });
    if (!doc) return res.status(404).json({ message: 'Task not found' });
    res.json(doc);
  } catch (err) { next(err); }
}
