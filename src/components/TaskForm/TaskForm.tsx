import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types";
import { generatedUniqueId, isValidText } from "../../utils/taskUtils";

interface TaskFormProps {
    onSubmit: (task: Task) => void;
  }
  

const TaskForm = ({onSubmit} : TaskFormProps) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidText(title)) {
        setError('Task title is mandatory'); 
        return;
    }
    setError(null); // clear any error before this point

    const newTask : Task ={
        id: generatedUniqueId(),
        tittle: title.trim(),
        description: description.trim(),
        status,
        priority,
        createdAt: new Date().toISOString()
    }
   
    //used to pass new task to the dashboard 
onSubmit(newTask);

//reset form for other newTask
setTitle('');
setDescription('')
    setStatus('todo');
    setPriority('medium')

    // console.log('Form submitted with:', { title, description, status, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
     
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-slate-700">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {setTitle(e.target.value)
        if (error) setError(null); }}
        placeholder="Par example: Complete React Assessment"
          className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 
            $ {error ? 'border-red-500 focus:bordr-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>

     
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-slate-700">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      
      <div className="flex gap-4">
        
        
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="status" className="text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

       
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="priority" className="text-sm font-medium text-slate-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
      </div>

     
      <button
        type="submit"
        className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        Add Task
      </button>
      
    </form>
  );
};

export default TaskForm;