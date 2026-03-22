import { useState, useEffect } from 'react'


function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const res = await fetch('/api/notes')
    const data = await res.json()
    setNotes(data)
  }

  const addNote = async () => {
    if (!title || !body) return
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    })
    setTitle('')
    setBody('')
    fetchNotes()
  }

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' })
    fetchNotes()
  }

  const updateNote = async (id) => {
    await fetch(`/api/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: editTitle, body: editBody })
})
    setEditId(null)
    setEditTitle('')
    setEditBody('')
    fetchNotes()
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>My Notes</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <textarea
        placeholder="Write your note..."
        value={body}
        onChange={e => setBody(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button onClick={addNote} style={{ padding: '8px 16px' }}>
        Add Note
      </button>

      <hr />

      {notes.map(note => (
        <div key={note._id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px' }}>
  {editId === note._id ? (
    <>
      <input
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <textarea
        value={editBody}
        onChange={e => setEditBody(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button onClick={() => updateNote(note._id)}>Save</button>
      <button onClick={() => setEditId(null)} style={{ marginLeft: '8px' }}>Cancel</button>
    </>
  ) : (
    <>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => { setEditId(note._id); setEditTitle(note.title); setEditBody(note.body) }}>Edit</button>
      <button onClick={() => deleteNote(note._id)} style={{ marginLeft: '8px' }}>Delete</button>
    </>
  )}
</div>
      ))}
    </div>
  )
}

export default App