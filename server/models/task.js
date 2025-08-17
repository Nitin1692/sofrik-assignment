import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  dueDate: { type: Date }
}, { timestamps: true });

// Index for faster filtering by project + status
taskSchema.index({ project: 1, status: 1, createdAt: -1 });

export default mongoose.model('Task', taskSchema);
