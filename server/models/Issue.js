// models/Issue.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const IssueSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignee: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open','in_progress','resolved','closed'], default: 'open' },
  severity: { type: String, enum: ['critical','high','normal','low'], default: 'normal' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
  // optional: tags, attachments, comments via ref
});

module.exports = mongoose.model('Issue', IssueSchema);
