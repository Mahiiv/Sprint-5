import { useState, useEffect } from "react";
import Column from "./components/Column.jsx";
import "./App.css";

function App() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  useEffect(() => {
    const saved = localStorage.getItem("kanbanData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTodoTasks(parsed.todoTasks || []);
      setInProgressTasks(parsed.inProgressTasks || []);
      setDoneTasks(parsed.doneTasks || []);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      todoTasks: todoTasks,
      inProgressTasks: inProgressTasks,
      doneTasks: doneTasks,
    };
    localStorage.setItem("kanbanData", JSON.stringify(dataToSave));
  }, [todoTasks, inProgressTasks, doneTasks]);

  function handleAddTask() {

    if (newTaskText.trim() === "") {
      alert("bro type something first");
      return;
    }

    const newTask = {
      id: Date.now(), 
      text: newTaskText,
      priority: newTaskPriority,
      isEditing: false,
      editText: newTaskText,
    };

    setTodoTasks([...todoTasks, newTask]);

    // reset the input box
    setNewTaskText("");
    setNewTaskPriority("Medium");
  }
  function handleDeleteTask(column, id) {
    if (column === "todo") {
      setTodoTasks(todoTasks.filter((task) => task.id !== id));
    } else if (column === "inProgress") {
      setInProgressTasks(inProgressTasks.filter((task) => task.id !== id));
    } else if (column === "done") {
      setDoneTasks(doneTasks.filter((task) => task.id !== id));
    }
  }
  function handleMoveTask(column, id, direction) {


    if (column === "todo" && direction === "forward") {
      const taskToMove = todoTasks.find((task) => task.id === id);
      setTodoTasks(todoTasks.filter((task) => task.id !== id));
      setInProgressTasks([...inProgressTasks, taskToMove]);
    } else if (column === "inProgress" && direction === "forward") {
      const taskToMove = inProgressTasks.find((task) => task.id === id);
      setInProgressTasks(inProgressTasks.filter((task) => task.id !== id));
      setDoneTasks([...doneTasks, taskToMove]);
    } else if (column === "inProgress" && direction === "back") {
      const taskToMove = inProgressTasks.find((task) => task.id === id);
      setInProgressTasks(inProgressTasks.filter((task) => task.id !== id));
      setTodoTasks([...todoTasks, taskToMove]);
    } else if (column === "done" && direction === "back") {
      const taskToMove = doneTasks.find((task) => task.id === id);
      setDoneTasks(doneTasks.filter((task) => task.id !== id));
      setInProgressTasks([...inProgressTasks, taskToMove]);
    }
  }

  function handleToggleEdit(column, id) {
    if (column === "todo") {
      setTodoTasks(
        todoTasks.map((task) =>
          task.id === id ? { ...task, isEditing: !task.isEditing } : task
        )
      );
    } else if (column === "inProgress") {
      setInProgressTasks(
        inProgressTasks.map((task) =>
          task.id === id ? { ...task, isEditing: !task.isEditing } : task
        )
      );
    } else if (column === "done") {
      setDoneTasks(
        doneTasks.map((task) =>
          task.id === id ? { ...task, isEditing: !task.isEditing } : task
        )
      );
    }
  }

  function handleEditChange(column, id, newText) {
    if (column === "todo") {
      setTodoTasks(
        todoTasks.map((task) =>
          task.id === id ? { ...task, editText: newText } : task
        )
      );
    } else if (column === "inProgress") {
      setInProgressTasks(
        inProgressTasks.map((task) =>
          task.id === id ? { ...task, editText: newText } : task
        )
      );
    } else if (column === "done") {
      setDoneTasks(
        doneTasks.map((task) =>
          task.id === id ? { ...task, editText: newText } : task
        )
      );
    }
  }
  function handleSaveEdit(column, id) {
    if (column === "todo") {
      setTodoTasks(
        todoTasks.map((task) =>
          task.id === id
            ? { ...task, text: task.editText, isEditing: false }
            : task
        )
      );
    } else if (column === "inProgress") {
      setInProgressTasks(
        inProgressTasks.map((task) =>
          task.id === id
            ? { ...task, text: task.editText, isEditing: false }
            : task
        )
      );
    } else if (column === "done") {
      setDoneTasks(
        doneTasks.map((task) =>
          task.id === id
            ? { ...task, text: task.editText, isEditing: false }
            : task
        )
      );
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-title">My Kanban Board</h1>

      {/* add task form, always adds to the To Do column */}
      <div className="add-task-box">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />

        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* the 3 columns */}
      <div className="board">
        <Column
          title="To Do"
          columnName="todo"
          tasks={todoTasks}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
          onToggleEdit={handleToggleEdit}
          onEditChange={handleEditChange}
          onSaveEdit={handleSaveEdit}
        />

        <Column
          title="In Progress"
          columnName="inProgress"
          tasks={inProgressTasks}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
          onToggleEdit={handleToggleEdit}
          onEditChange={handleEditChange}
          onSaveEdit={handleSaveEdit}
        />

        <Column
          title="Done"
          columnName="done"
          tasks={doneTasks}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
          onToggleEdit={handleToggleEdit}
          onEditChange={handleEditChange}
          onSaveEdit={handleSaveEdit}
        />
      </div>
    </div>
  );
}

export default App;
