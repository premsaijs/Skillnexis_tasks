const mongoose = require('mongoose');
const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Note title is required' });
    }

    const note = await Note.create({ title, content, user: req.user.id });
    return res.status(201).json({ success: true, data: note });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID' });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    // make sure this note actually belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this note' });
    }

    return res.status(200).json({ success: true, data: note });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID' });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this note' });
    }

    const { title, content } = req.body;
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ success: false, message: 'Note title cannot be empty' });
      }
      note.title = title;
    }
    if (content !== undefined) note.content = content;

    await note.save();
    return res.status(200).json({ success: true, data: note });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID' });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this note' });
    }

    await note.deleteOne();
    return res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
