import { useState } from 'react'
import Sidebar from './Components/Sidebar.jsx'
import NoteEditor from './Components/NoteEditor.jsx'
import { useLocalStorage } from './Hooks/useLocalStorage.js'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

function App() {
  const [notes, setNotes] = useLocalStorage('gn-notes-v1', [])
  const [selectedId, setSelectedId] = useState(null)

  const selectedNote = notes.find(n => n.id === selectedId) || null

  function createNote() {
    const newNote = {
      id: String(Date.now()),
      title: '',
      content: '',
      createdAt: new Date().toISOString()
    }
    setNotes(prev => [...prev, newNote])
    setSelectedId(newNote.id)
  }

  function updateNote(patch) {
    setNotes(prev =>
      prev.map(n =>
        n.id === selectedId ? { ...n, ...patch } : n
      )
    )
  }

  async function clearAllNotes() {
    const result = await Swal.fire({
      title: 'Desea eliminar todas las notas?',
      text: 'Esto eliminara todas las notas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar todas',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      setNotes([])
      setSelectedId(null)
      Swal.fire({
        title: 'Deleted!',
        text: 'Todas las notas han sido eliminadas.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }


  return (
    <div className="app-shell container-fluid">
      <div className="row g-3">
        <div className="col-auto">
          <Sidebar
            onNew={createNote}
            notes={notes}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div className="col">
          <NoteEditor note={selectedNote} onChange={updateNote} />
        </div>
      </div>
      <footer className="mt-3 text-center">
        <button className="btn btn-danger btn-sm" onClick={clearAllNotes}>
          <i className="bi bi-trash"></i> Clear All Notes
        </button>
      </footer>

    </div>
  )

}

export default App
