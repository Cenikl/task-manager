import { useTaskManager } from '@/store/useTaskManager';
import React, { ChangeEvent, useRef, useState } from 'react';

interface Task {
  id: number,
  title: string,
  completed: boolean,
}

interface updateTask {
  title:string
}

const TaskManager = () => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const [title,setTitle] = useState("");
  const {
     tasks,
     searchTask,
     addTask,
     updateTask,
     deleteTask,
     setSearchTask,
   } = useTaskManager();

  const handleAddTask = () => {
    setTitle("")
    if(createTaskRef.current?.value){
      setTitle(createTaskRef.current?.value)
    }
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    addTask(newTask);
  };

  const handleUpdateTask = (taskId: number, updatedTask: updateTask) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  // See! I already give you everything!
  const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  return (
    <div>
      <h1>Task Manager</h1>
      <input type="text" ref={createTaskRef} placeholder="ref"/>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>   
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="text"
                value={task.title}
                onChange={(e) =>
                  handleUpdateTask(task.id, { title: e.target.value })
                }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
