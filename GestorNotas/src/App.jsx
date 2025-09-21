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

async function deleteNote(id) {
  const result = await Swal.fire({
    title: '¿Eliminar esta nota?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    setNotes(prev => prev.filter(n => n.id !== id))
    setSelectedId(null)
    Swal.fire({
      title: 'Eliminada',
      text: 'La nota ha sido eliminada.',
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
          <NoteEditor
           note={selectedNote}
           onChange={updateNote}
           onDelete={() => deleteNote(selectedId)}
           />
        </div>
      </div>
      
      <footer className="mt-3 text-center">
      
      </footer>

    </div>
  )

}

export default App
