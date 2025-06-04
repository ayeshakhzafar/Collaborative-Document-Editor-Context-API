// src/context/DocumentContext.js
import React, { createContext, useReducer, useContext, useMemo } from 'react';

const DocumentContext = createContext();

const initialState = {
  content: '',
  collaborators: [],
  typingUser: null,
  history: [],
  historyIndex: -1,
  currentUser: 'User 1', // Default to User 1
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTENT':
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      return {
        ...state,
        content: action.payload,
        history: [...newHistory, action.payload],
        historyIndex: newHistory.length,
      };
    case 'SET_TYPING_USER':
      const updatedCollaborators = state.collaborators.includes(action.payload)
        ? state.collaborators
        : [...state.collaborators, action.payload];
      return { ...state, typingUser: action.payload, collaborators: updatedCollaborators };
    case 'UPDATE_COLLABORATORS':
      return { ...state, collaborators: action.payload };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'UNDO':
      if (state.historyIndex > 0) {
        return {
          ...state,
          content: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
        };
      }
      return state;
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          content: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;
    default:
      return state;
  }
};


export const DocumentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => useContext(DocumentContext);
