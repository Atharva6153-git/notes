const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find()
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST create a note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    body: req.body.body
  })
  try {
    const newNote = await note.save()
    res.status(201).json(newNote)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.json({ message: 'Note deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT update a note
router.put('/:id', async (req,res)=> {
  try{
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {title: req.body.title, body: req.body.body},
      {new: true}
    )
    res.json(updatedNote)
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})

module.exports = router