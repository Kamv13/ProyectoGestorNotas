
export default function SearchBar({ query, onChange }) {
  return (
    <div className="search-bar mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar notas..."
        value={query}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
