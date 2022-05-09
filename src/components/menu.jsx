export default function Menu(props) {
  const { onNew, onSearch } = props;

  function handleClick() {
    onNew();
  }

  function handleChange(e) {
    onSearch(e);
  }

  return (
    <div className="menu">
      <input
        className="search"
        placeholder="search..."
        onChange={handleChange}
      />
      <button className="btn" onClick={(e) => handleClick()}>
        + nueva nota{" "}
      </button>
    </div>
  );
}
