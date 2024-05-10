import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { markdownToLinkConverter } from '../utils/utils';
import styles from '../styles/TextEditor.module.scss';

function App() {
  const [paras, setParas] = useState([{ id: uuidv4() }]);
  const [focusedParaIndex, setFocusedParaIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [allLinks, setAllLinks] = useState([]);

  const elRefs = useRef([]);
  const linkRef = useRef();

  const handleColorChange = (e) => {
    document.execCommand('foreColor', false, e.target.value);
  };

  // Set cursor focus on newly created paragraph
  useEffect(() => {
    focusOnPara();
  }, [paras]);

  useEffect(() => {
    console.log(allLinks);
    linkRef.current.innerHTML = allLinks.join('<br />');
  }, [allLinks]);

  const focusOnPara = () => {
    const size = elRefs.current.length;
    elRefs.current[size - 1].focus();
  };

  const handleBoldClick = () => {
    document.execCommand('bold');
  };

  const handleUnderlineClick = () => {
    document.execCommand('underline');
  };

  const handleTextSelect = () => {
    const selectedText = window.getSelection().toString();
    console.log(selectedText);
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

  const handleEditOrDoneClick = () => {
    if (isEditing) {
      const allLinks = [];
      setIsEditing(false);
      for (const refItem of elRefs.current) {
        const obj = markdownToLinkConverter(refItem.innerHTML);
        refItem.innerHTML = obj.text;
        allLinks.push(...obj.allLinkElements);
      }
      setAllLinks(allLinks);
    } else {
      setIsEditing(true);
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
      <div className={styles.btnContainer}>
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleUnderlineClick}>Underline</button>
        <input type='color' onChange={handleColorChange} />
      </div>

      <div
        className={`${styles.paragraphWrapper} ${
          isEditing ? styles['paragraphWrapper--active'] : ''
        }`}
      >
        {paras.map((val, index) => {
          return (
            <div
              key={val.id}
              onFocus={() => {
                setFocusedParaIndex(index);
              }}
              contentEditable={isEditing}
              ref={(el) => (elRefs.current[index] = el)}
              autoFocus
              className={styles.paragraph}
              onDoubleClick={handleTextSelect}
              onKeyDown={handleKeyDown}
              draggable={isEditing}
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver()}
              onDrop={handleDrop(index)}
            ></div>
          );
        })}
      </div>
      <div className={styles.btnContainer}>
        <button onClick={handleEditOrDoneClick} className={styles.btnMain}>
          {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div></div>
      <div
        ref={linkRef}
        className={`${allLinks.length ? styles.linkContainer : ''}`}
      ></div>
    </div>
  );
}

export default App;
