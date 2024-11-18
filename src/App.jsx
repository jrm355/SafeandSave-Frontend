import React from 'react';
import LoginForm from './components/LoginForm'; 
import './App.css';

const App = () => {
  return (
    <div>
      <header className="header">
        <h1>Safe and Save</h1>
        <p>Eliminate Food Waste Tool</p>
      </header>
      <main className="main-content">
        <LoginForm />
      </main>
    </div>
  );
};

export default App;
