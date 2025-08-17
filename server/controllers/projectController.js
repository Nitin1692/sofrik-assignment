import Project from '../models/project.js';
import Task from '../models/task.js';
import { getPagination, makePageResponse } from '../utils/paginate.js';

export async function createProject(req, res, next) {
  try {
    const doc = await Project.create({ ...req.body, user: req.user.id });
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await Project.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Project.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    // cascade delete tasks
    await Task.deleteMany({ project: id });
    res.json({ message: 'Project deleted' });
  } catch (err) { next(err); }
}

export async function getProject(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Project.findOne({ _id: id, user: req.user.id });
    if (!doc) return res.status(404).json({ message: 'Project not found' });
    res.json(doc);
  } catch (err) { next(err); }
}

export async function listProjects(req, res, next) {
  try {
    const { status, q } = req.query;
    const { page, limit, skip } = getPagination(req.query);
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const [items, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(filter)
    ]);

    res.json(makePageResponse({ items, total, page, limit }));
  } catch (err) { next(err); }
}
