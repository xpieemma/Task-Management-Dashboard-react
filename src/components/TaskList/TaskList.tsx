import type { Task } from "../../types";
import TaskItem from "./TaskItem";


interface TaskListProps {
  tasks: Task[];
  onToggleStatus?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskList = ({ tasks, onToggleStatus, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
        <p className="text-lg font-medium text-slate-700">No tasks found</p>
        <p className="text-sm mt-1">Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;