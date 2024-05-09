import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/TextEditor.module.scss';

function App() {
  const [paras, setParas] = useState([{ id: uuidv4() }]);
  const [focusedParaIndex, setFocusedParaIndex] = useState(null);

  const elRefs = useRef([]);

  // Set cursor focus on newly created paragraph
  useEffect(() => {
    focusOnPara();
  }, [paras]);

  const focusOnPara = () => {
    const size = elRefs.current.length;
    elRefs.current[size - 1].focus();
  };

  const handleBoldClick = () => {
    document.execCommand('bold');
  };

  const handleItalicClick = () => {
    document.execCommand('italic');
  };

  const handleColorChange = () => {
    document.execCommand('foreColor', false, 'green');
  };

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    console.log(selectedText);
  };

  const createLink = () => {
    document.execCommand('createLink', false, 'www.google.com');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedParaIndex == paras.length - 1) {
        setParas((arr) => [...arr, { id: uuidv4() }]);
      } else {
        elRefs.current[focusedParaIndex + 1].focus();
      }
    }
  };

  const swapBoxes = (fromIndex, toIndex) => {
    const tempHtml = elRefs.current[fromIndex].innerHTML;
    elRefs.current[fromIndex].innerHTML = elRefs.current[toIndex].innerHTML;
    elRefs.current[toIndex].innerHTML = tempHtml;
  };

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('dragContent', index);
  };

  const handleDragOver = () => (event) => {
    event.preventDefault();
    return false;
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData('dragContent');
    swapBoxes(fromIndex, index);
    return false;
  };

  return (
    <div>
      <button onClick={handleBoldClick}>Bold</button>
      <button onClick={handleItalicClick}>Italic</button>
      <button onClick={createLink}>Create link</button>

      <button onClick={handleColorChange}>Change color</button>
      <button>{focusedParaIndex}</button>
      <div className={styles.paragraphWrapper}>
        {paras.map((val, index) => {
          return (
            <div
              key={val.id}
              onFocus={() => {
                setFocusedParaIndex(index);
              }}
              contentEditable
              ref={(el) => (elRefs.current[index] = el)}
              autoFocus
              className={styles.paragraph}
              onDoubleClick={handleTextSelect}
              // onSelect={handleTextSelect}
              // onInput={handleInput}
              onKeyDown={handleKeyDown}
              draggable={true}
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver()}
              onDrop={handleDrop(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
