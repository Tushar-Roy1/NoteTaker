// src/routes/note.ts
import express, { Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import Note from '../models/Note';
import { AuthRequest } from '../types/AuthRequest';

const router = express.Router();

// Create a new note
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const { content } = req.body;
  const userId = req.user?.userId;

  try {
    const newNote = await Note.create({ userId, content });
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Failed to create note' });
  }
});

// Get all notes for logged-in user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});

// Delete a note by ID
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const noteId = req.params.id;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Failed to delete note' });
  }
});

// ✅ Export router as default
export default router;
