// src/App.js
import React from 'react';
import { DocumentProvider } from './context/DocumentContext';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';


const App = () => {
  return (
    <DocumentProvider>
      <div className="app">
        <Sidebar />
        <div className="main">
          <Editor />
          
        </div>
      </div>
    </DocumentProvider>
  );
};

export default App;

