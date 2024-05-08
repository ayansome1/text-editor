import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/TextEditor.module.scss';

function App() {
  const [text, setText] = useState(
    'Select some text and toggle bold or italic formatting.'
  );

  const [paras, setParas] = useState([true]);
  const [focusedParaIndex, setFocusedParaIndex] = useState(null);

  const elRefs = useRef([]);

  // Set cursor focus on newly created paragraph
  useEffect(() => {
    focusOnPara();
    // const size = elRefs.current.length;
    // elRefs.current[size - 1].focus();
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
    // document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, 'green');
  };

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    console.log(selectedText);
    // setText(selectedText);
  };

  const createLink = () => {
    document.execCommand('createLink', false, 'www.google.com');
  };

  const handleInput = (e) => {
    console.log(e.target.innerText);
    // setText(e.target.innerText);
  };

  const handleKeyDown = (e) => {
    // event.key === 'Enter'
    if (e.keyCode === 13) {
      e.preventDefault();
      const size = elRefs.current.length;
      console.log(size + ' ' + focusedParaIndex);
      if (focusedParaIndex == paras.length - 1) {
        setParas((arr) => [...arr, true]);
      } else {
        elRefs.current[focusedParaIndex + 1].focus();
      }
      // setParas((arr) => [...arr, true]);
    }
  };

  return (
    <div>
      {paras.map((val, index) => {
        return (
          <div
            // key={index}
            onFocus={() => {
              console.log(index);
              setFocusedParaIndex(index);
            }}
            contentEditable
            ref={(el) => (elRefs.current[index] = el)}
            // ref={(el) => (elRefs.current = [...elRefs.current, el])}
            // tabIndex={1}
            autoFocus
            className={styles.paragraph}
            // style={{
            //   border: '1px solid #ccc',
            //   padding: '10px',
            //   minHeight: '100px',
            // }}
            onDoubleClick={handleTextSelect}
            // onSelect={handleTextSelect}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          >
            {/* <div>{text}</div> */}
          </div>
        );
      })}

      <button onClick={handleBoldClick}>Bold</button>
      <button onClick={handleItalicClick}>Italic</button>
      <button onClick={createLink}>Create link</button>

      <button onClick={handleColorChange}>Change color</button>
      <button>{focusedParaIndex}</button>
    </div>
  );
}

export default App;
