// routes/issues.js
const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// GET all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single issue
router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new issue
router.post('/', async (req, res) => {
  const issueData = {
    projectId: req.body.projectId,
    title: req.body.title,
    description: req.body.description,
    reporter: req.body.reporterId,
    assignee: req.body.assigneeId,
    status: req.body.status,
    severity: req.body.severity,
  };
  try {
    const issue = new Issue(issueData);
    const saved = await issue.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update issue
router.put('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Not found' });

    // update allowed fields
    ['title','description','assignee','status','severity','resolvedAt'].forEach(field => {
      if (req.body[field] !== undefined) {
        issue[field] = req.body[field];
      }
    });
    issue.updatedAt = Date.now();

    const updated = await issue.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE issue
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Issue.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
