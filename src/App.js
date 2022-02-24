import React from 'react';
import './App.css';
import ContextProvider from './context/ContextProvider';
import Table from './components/Table';

function App() {
  return (
    <div>
      <ContextProvider>
        <Table />
      </ContextProvider>
      <span>Hello, App!</span>
    </div>
  );
}

export default App;
