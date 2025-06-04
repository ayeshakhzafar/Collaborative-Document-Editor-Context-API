import React from 'react';
import { useDocumentContext } from '../context/DocumentContext';

const Editor = React.memo(() => {  // Wrap component with React.memo
  const { state, dispatch } = useDocumentContext();

  const handleTyping = (event) => {
    const content = event.target.value;
    dispatch({ type: 'SET_CONTENT', payload: content });
    dispatch({ type: 'SET_TYPING_USER', payload: state.currentUser });
  };

  const handleUserSwitch = (user) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  return (
    <div>
      <textarea
        value={state.content}
        onChange={handleTyping}
        placeholder="Start typing..."
      />

      <div>
        <h3>Collaborators:</h3>
        <ul>
          {state.collaborators.length > 0 ? (
            state.collaborators.map((collaborator, index) => (
              <li key={index}>{collaborator}</li>
            ))
          ) : (
            <li>No collaborators active</li>
          )}
        </ul>
      </div>

      <div>
        <h4>Switch User:</h4>
        <button onClick={() => handleUserSwitch('User 1')}>User 1</button>
        <button onClick={() => handleUserSwitch('User 2')}>User 2</button>
        <button onClick={() => handleUserSwitch('User 3')}>User 3</button>
      </div>

      {/* Undo and Redo buttons */}
      <div>
        <button onClick={handleUndo} disabled={state.historyIndex === 0}>Undo</button>
        <button onClick={handleRedo} disabled={state.historyIndex === state.history.length - 1}>Redo</button>
      </div>
    </div>
  );
});

export default Editor;

