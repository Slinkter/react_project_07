import { useState } from "react";
import Panel from "./components/panel";
import "./App.css";
import Mensaje from "./components/mensaje";
import Menu from "./components/menu";
import List from "./components/list";
import Item from "./components/item";
import Editor from "./components/editor";
import Preview from "./components/preview";

//
import uuid from "react-uuid";

function App() {
  const [items, setItems] = useState([]);
  const [copyItem, setCopyItem] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);

  //
  function handleNewClick() {
    const note = {
      id: uuid(),
      title: "mi  nota",
      text: "Hola a todos ",
      pinned: false,
      created: Date.now(),
    };

    let notes = [...items];
    notes.unshift(note);
    let res = getOrderedNotes(notes);

    setItems(res);
    setCopyItem(res);
  }

  function handlePinned(item, i) {
    setActualIndex(i);
    let id = item.id;
    let notes = [...items];
    notes[i].pinned = !notes[i].pinned;
    let res = getOrderedNotes(notes);

    setItems(res);
    setCopyItem(res);

    let index = res.findIndex((x) => x.id === id);
    setActualIndex(index);
  }

  function getOrderedNotes(array) {
    let items = [...array];
    let pinned = items.filter((x) => x.pinned === true);
    let rest = items.filter((x) => x.pinned === false);

    pinned = sortByDate(pinned, true);
    rest = sortByDate(rest, true);

    return [...pinned, ...rest];
  }

  function sortByDate(arr, asc = false) {
    if (asc) {
      return arr.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else {
      return arr.sort((a, b) => new Date(a.created) - new Date(b.created));
    }
  }

  function handleSelectNote(item, e) {
    if (!e.target.classList.contains("note")) return;
    const index = items.findIndex((note) => note === item);
    setActualIndex(index);
  }

  function onchangeTitle(e) {
    const title = e.target.value;
    let notes = [...items];
    notes[actualIndex].title = title;
    setItems(notes);
    setCopyItem(notes);
  }

  function onchangeText(e) {
    const text = e.target.value;
    let notes = [...items];
    notes[actualIndex].text = text;
    setItems(notes);
    setCopyItem(notes);
  }

  function renderEditorAndPreviewUI() {
    return (
      <div>
        <Editor
          item={items[actualIndex]}
          onchangeTitle={onchangeTitle}
          onchangeText={onchangeText}
        />
        <Preview text={items[actualIndex].text} />
      </div>
    );
  }

  function handleSearch(e) {
    const q = e.target.value;

    if (q === "") {
      setCopyItem([...items]);
    } else {
      let res = items.filter(
        (x) => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0
      );

      if ((res.length === 0)) {
        setActualIndex(-1);
      } else {
        setCopyItem([...res]);
        setActualIndex(0);
      }
    }
  }

  return (
    <div className="App container">
      <Panel>
        <Menu onNew={handleNewClick} onSearch={handleSearch} />

        <List>
          {copyItem.map((item, i) => {
            return (
              <Item
                key={item.id}
                actualIndex={actualIndex}
                item={item}
                index={i}
                onHandlePinned={handlePinned}
                onHandleSelectNote={handleSelectNote}
              />
            );
          })}
        </List>
      </Panel>

      <div className="">
        {actualIndex >= 0 ? renderEditorAndPreviewUI() : ""}
      </div>
    </div>
  );
}

export default App;
