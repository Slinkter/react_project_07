import { useEffect, useState } from "react";
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
//
import useDocumentTitle from "./components/documenttitle";
import ItemsContext from "./components/items-context";
import StatusContext from "./components/status-context";
import { get, post, put } from "./lib/http";


function App() {
  const URL = "http://localhost:3010/";
  //
  const [items, setItems] = useState([]);
  const [copyItem, setCopyItem] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);
  const [lock, setLock] = useState(false);
  const [status, setStatus] = useState(0);

  // efecto segundario
  /*   useEffect(() => {
    document.title = copyItem[actualIndex]?.title ?? "notes";
  }); */

  useDocumentTitle(copyItem[actualIndex]?.title, "notes");

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    let data = await get(`${URL}`);
    let res = getOrderedNotes(data);

    setItems(res);
    setCopyItem(res);
    if (items.length > 0) {
      setActualIndex(0);
    }
  }

  //
  async function handleNewClick() {
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
    const data = await post(`${URL}new`, note);
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

  function autosave() {

    if (!lock) {
      setLock(true);
      setStatus(1);
      setTimeout(() => {
        save()
        setLock(false)
      }, 3000);
    }  
  }

  async function save(){
    const item = items[actualIndex]
    const response = await put(`${URL}update`,item)
    setStatus(2)
    setTimeout(() => {
      setStatus(0)
    }, 1000);

  }

  function renderEditorAndPreviewUI() {
    return (
      <div>
        <StatusContext.Provider value={{ status: status, autosave: autosave }}>
          <Editor
            item={items[actualIndex]}
            onchangeTitle={onchangeTitle}
            onchangeText={onchangeText}
          />
          <Preview text={items[actualIndex].text} />
        </StatusContext.Provider>
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

      if (res.length === 0) {
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
        <ItemsContext.Provider
          value={{ onSearch: handleSearch, onNew: handleNewClick }}
        >
          <Menu />
        </ItemsContext.Provider>

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
