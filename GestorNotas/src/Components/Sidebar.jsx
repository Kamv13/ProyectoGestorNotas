export default function Sidebar({ onNew, notes, selectedId, onSelect }) {
  return (
    <div className="sidebar pane d-flex flex-column p-2 gap-2" style={{ minHeight: '100%' }}>
      
      <button
        className="btn btn-primary toolbar-btn align-self-center"
        title="New note"
        onClick={onNew}
      >
        <i className="bi bi-plus-lg"></i>
      </button>

      <div className="w-100 mt-2">
        <button className="btn btn-primary w-100" onClick={onNew}>
          Nueva Nota
        </button>
      </div>

      <div className="mt-3 flex-grow-1 overflow-auto" style={{ maxHeight: '70vh' }}>
        {notes.length === 0 && (
          <div className="text-muted small text-center mt-3">No hay notas guardadas</div>
        )}
        {notes.map(note => (
          <button
            key={note.id}
            className={`btn btn-light w-100 note-list-btn mb-1 ${selectedId === note.id ? 'border-primary' : ''}`}
            onClick={() => onSelect(note.id)}
          >
            {note.title || 'Untitled'}
          </button>
        ))}
      </div>
    </div>
  )
}