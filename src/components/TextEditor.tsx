import React, { useState } from 'react';
import styles from '../styles/TextEditor.module.scss';

function App() {
  const [text, setText] = useState(
    'Select some text and toggle bold or italic formatting.'
  );

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

  const handleInput = (e) => {
    console.log(e.target.innerText);
    // setText(e.target.innerText);
  };

  const handleKeyDown = (e) => {
    // event.key === 'Enter'
    // if (e.keyCode === 13) {
    //   e.preventDefault();
    // }
  };

  return (
    <div>
      <div
        contentEditable
        className={styles.paragraph}
        // style={{
        //   border: '1px solid #ccc',
        //   padding: '10px',
        //   minHeight: '100px',
        // }}
        onDoubleClick={handleTextSelect}
        // onSelect={handleTextSelect}
        onInput={handleInput}
        // onKeyDown={handleKeyDown}
      >
        <div>{text}</div>
      </div>
      <button onClick={handleBoldClick}>Bold</button>
      <button onClick={handleItalicClick}>Italic</button>
      <button onClick={handleColorChange}>Change color</button>
    </div>
  );
}

export default App;
