import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Tasks Data
const Data = [
  {id: "todo-0", name: "Eat", completed: true},
  {id: "todo-1", name: "Sleep", completed: true},
  {id: "todo-2", name: "Repeat", completed: true}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={Data} />
  </React.StrictMode>
);

