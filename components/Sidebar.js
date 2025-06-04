// src/components/Sidebar.js
import React from 'react';
import { useDocumentContext } from '../context/DocumentContext';

const Sidebar = () => {
  const { state } = useDocumentContext();

  return (
    <div className="sidebar">
      <h3>Collaborators</h3>
      <ul>
        {state.collaborators.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      {state.typingUser && <p>{state.typingUser} is typing...</p>}
    </div>
  );
};

export default Sidebar;
