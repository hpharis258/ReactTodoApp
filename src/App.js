import React from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { useState } from 'react';
import {nanoid} from "nanoid";

// FIlter Map object
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);
console.log(FILTER_NAMES);

function App(props) {
  // Filter Hook
  const [filter, setFilter] = useState('All');
  // edit Task
  function editTask(id, newName)
  {
    const editedTaskList = tasks.map((task) => {
      if(id === task.id){
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  // Delete Task
  function deleteTask(id)
  {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    // Checking that I have got the right task id before deliting it
    //console.log(id);
  }
  // Sync CheckBox 
  function toggleTaskCompleted(id)
  {
    const updatedTasks = tasks.map((task) => {
      // If this task has the same id as the edited task 
      if(id === task.id)
      {
        // Use Object spread to make a new object
        // Whose completed property has been inverted (toggled)
        return {...task, completed: !task.completed}
      }else{
        return task;
      }
    });
    setTasks(updatedTasks);
  }
  // Set Initial state Hook 
  const [tasks, setTasks] = useState(props.tasks); 
  // Add task
  function addTask(name)
  {
    if(name != "")
    {
      const newTask ={id: `todo-${nanoid()}`, name, completed: false};
      setTasks([...tasks, newTask]);
    }
    //alert(name);
  }
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
    id={task.id} 
    name={task.name} 
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
  ));
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ))
  // Task Noun
  const taskNoun = taskList.length !== 1 ? 'tasks' : 'task'; 
  // Task Counter 
  const headingText = `${taskList.length} Remaining tasks`;
  return (
    <div className="todoapp stack-large">
      <h1>Task Manager</h1>
     <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
       {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
     {taskList}
      </ul>
    </div>
  );
}
export default App;
