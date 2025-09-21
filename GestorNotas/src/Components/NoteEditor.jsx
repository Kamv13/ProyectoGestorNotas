export default function NoteEditor({ note, onChange, onDelete }) {
  if (!note) {
    return (
      <div className="pane p-4 d-flex align-items-center justify-content-center text-muted">
        Haga Clic en nueva nota para comenzar
      </div>
    )
  }

  return (
    <div className="pane p-3 d-flex flex-column" style={{ height: '100%' }}>

      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-outline-danger btn-sm"
          title="Eliminar nota"
          onClick={onDelete}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>


      <input
        className="note-title w-100"
        value={note.title}
        placeholder="Title..."
        onChange={e => onChange({ title: e.target.value })}
      />


      <textarea
        className="lined-paper w-100 flex-grow-1"
        value={note.content}
        placeholder="Escribe aqui..."
        onChange={e => onChange({ content: e.target.value })}
        style={{ resize: 'none' }}
      />
    </div>
  )
}
