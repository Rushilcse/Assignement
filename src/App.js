import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to manage the new task input field
  const [newTask, setNewTask] = useState('');

  // Function to add a new task to the list
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Function to toggle task completion status
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to edit a task
  const handleEditTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to filter tasks based on search input
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm)
    );
    setTasks(filteredTasks);
  };

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search tasks..."
      />
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''}`}
          >
            <span>{task.text}</span>
            <div className="buttons">
              <button onClick={() => handleToggleComplete(task.id)}>
                {task.completed ? 'Incomplete' : 'Complete'}
              </button>
              <button onClick={() => handleEditTask(task.id, prompt('Edit task:', task.text))}>
                Edit
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

