import { useContext } from "react";
import Status from "./status";
import StatusContext from "./status-context";

export default function Editor({ item, onchangeTitle, onchangeText }) {
  const statusContext = useContext(StatusContext);

  function handletitleChange(e) {
    onchangeTitle(e);
    statusContext.autosave();
  }

  function handletextChange(e) {
    onchangeText(e);
    statusContext.autosave();
  }

  return (
    <div className="editor">
      <Status statusCode={statusContext.status} />
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
