import React, { useState } from 'react';

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

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    console.log(selectedText);
    // setText(selectedText);
  };

  const handleInput = (e) => {
    console.log(e.target.innerText);
    setText(e.target.innerText);
  };

  return (
    <div>
      <div
        contentEditable
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '100px',
        }}
        onDoubleClick={handleTextSelect}
        // onSelect={handleTextSelect}
        onInput={handleInput}
      >
        {text}
      </div>
      <button onClick={handleBoldClick}>Bold</button>
      <button onClick={handleItalicClick}>Italic</button>
    </div>
  );
}

export default App;
