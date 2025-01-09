import React from 'react';
import './App.css';

import { Outlet } from 'react-router-dom';
import DevelopHeader from '@/components/layout/DevelopHeader/DevelopHeader';

function App() {
  return (
    <div className="App">
      <DevelopHeader/>
      <Outlet/>
    </div>
  );
}

export default App;

