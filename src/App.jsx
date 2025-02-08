import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function App() {
  const [mode, setMode] = useState(true);
  const [action, setAction] = useState(true);
  const [index, setIndex] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const delTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const updateTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTaskName(taskToEdit.task);
      setDateTime(taskToEdit.datetime);
      setMode(false);
      setIndex(tasks.findIndex(task => task.id === id));
      nav('/c');
    }
  };

  const handleTask = () => {
    if (!taskName || !dateTime) {
      setError("Please enter task name and date/time!");
      return;
    }

    if (mode) {
      // Create a new task with a unique ID
      const newTask = { id: Date.now(), task: taskName, datetime: dateTime };
      setTasks([...tasks, newTask]);
    } else {
      // Update existing task
      const updatedTasks = tasks.map((task, idx) =>
        idx === index ? { ...task, task: taskName, datetime: dateTime } : task
      );
      setTasks(updatedTasks);
      setMode(true);
    }

    setTaskName('');
    setDateTime('');
    setIndex(null);
    nav('/');
  };

  const handleBtn = () => {
    if (action) {
      nav('/c');
      setAction(false);
    } else {
      nav('/');
      setAction(true);
    }
  };

  const CreateTaskForm = () => {
    return (
      <>
        <div className="inputs">
          <h1>{mode ? 'Create Task' : 'Update Task'}</h1>
          {error && (<p style={{ color: 'red' }}>{error}</p>)}
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Manage Name" />
          <input type="datetime-local" value={dateTime} onChange={(e) => { setDateTime(e.target.value) }} placeholder="mm/dd/yyyy --:-- --" />
          <button onClick={handleTask}>{mode ? 'Create Task' : 'Update Task'}</button>
        </div>
      </>
    );
  }

  const ShowTask = () => (
    <div className="outputs">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Date Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task.id}>
              <td>{idx + 1}</td>
              <td>{task.task}</td>
              <td>{task.datetime}</td>
              <td>
                <div className="action">
                  <button className="btn-update" onClick={() => updateTask(task.id)}>Edit</button>
                  <button className="btn-delete" onClick={() => delTask(task.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="content">
          <header>
            <p>Task Manager System</p>
            <button onClick={handleBtn}>{action ? 'Create Task': 'Home'}</button>
          </header>
          <Routes>
            <Route path="/" element={<ShowTask />} />
            <Route path="/c" element={<CreateTaskForm />} />
            <Route path="*" element={<ShowTask />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
