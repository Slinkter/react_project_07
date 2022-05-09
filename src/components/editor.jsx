export default function Editor({ item, onchangeTitle, onchangeText }) {


  function handletitleChange(e) {
    onchangeTitle(e);
  }

  function handletextChange(e) {
    onchangeText(e);
  }

  return (
    <div className="editor">
      <div>
        <input
          className="title"
          value={item.title}
          onChange={handletitleChange}
        />
      </div>
      <div className="editor-textarea">
        <textarea
          className="content"
          value={item.text}
          onChange={handletextChange}
        ></textarea>
      </div>
    </div>
  );
}
