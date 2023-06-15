import create from "zustand";

interface Task {
  id: number,
  title: string,
  completed: boolean,
}
interface updateTask {
  title:string
}

interface TaskStore {
  tasks: Task[],
  addTask: (task:Task) => void;
  updateTask: (taskId:number, updatedTask: updateTask) => void;
  deleteTask: (taskId:number) => void;
  searchTask: string;
  setSearchTask: (title:string) => void;
}

const useTaskManager = create<TaskStore>((set) => ({
  tasks:[],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks,task] })),
  updateTask: (taskId,updatedTask) => set((state) => ({tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, title: updatedTask.title } : task))})),
  deleteTask: (taskId) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
  searchTask:"",
  setSearchTask:(title) => set((state) => ({ searchTask: title })),
}))

export {
  useTaskManager
}