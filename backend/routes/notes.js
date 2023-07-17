const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');
// ROUTE 1: Get all the notes using GET "/api/auth/fetchallnote" (login required)
router.get('/fetchallnote', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ROUTE 2: Add a new note using POST "/api/auth/addnote" (login required)
router.post(
  '/addnote',
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters long').isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// router.post('/addnote', fetchuser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);

//     if (user===undefined) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const { title, description } = req.body;

//     if (title===undefined ) {
//       return res.status(400).json({ error: "Please provide both title and description for the note" });
//     }
//     if(description===undefined)
//     {
//         return res.status(400).json({ error: "Please provide both title and description for the note" });

//       }
//     // Add the note to user's notes array
//     user.notes.push({ title, description });
//     await user.save();

//     res.json({ message: "Note added successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal server error");
//   }
// });
// ROUTE 3: Update an existing Note using PUT "/api/notes/updatenote" (login required)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and validate the user
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not allowed' });
    }

    // Update the note
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ROUTE 4: Delete an existing Note using DELETE "/api/notes/deletenote/:id" (login required)
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and validate the user
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (!note.user || note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not allowed' });
    }

    // Delete the note
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: 'Note has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
