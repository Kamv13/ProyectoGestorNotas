export default function NoteEditor({ note, onChange }) {
  if (!note) {
    return (
      <div className="pane p-4 d-flex align-items-center justify-content-center text-muted">
        Haga Clic en nueva nota para comenzar
      </div>
    )
  }

  return (
    <div className="pane p-3 d-flex flex-column" style={{ height: '100%' }}>
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