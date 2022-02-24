import React from 'react';
import './App.css';
import ContextProvider from './context/ContextProvider';
import Table from './components/Table';
import Forms from './components/Forms';

function App() {
  return (
    <div>
      <ContextProvider>
        <Forms />
        <Table />
      </ContextProvider>
    </div>
  );
}

export default App;
