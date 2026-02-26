
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

import type { Task } from "../../types";
import { frmtDate } from "../../utils/taskUtils";

interface TaskItemProps {
    task: Task;
    onToggleStatus?: (id: string) => void; 
    onDelete?: (id: string) => void;
  }
  const priorityStyles = {
    low: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    medium: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    high: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  };
  
  const statusStyles = {
    todo: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
    'in-progress': 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    done: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  };
  
  const TaskItem = ({ task, onToggleStatus, onDelete }: TaskItemProps) => {
    const isDone = task.status === 'done';
  
    return (
      <div className={`p-4 mb-4 rounded-lg border dark:border-slate-700 transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-slate-800 ${isDone ? 'opacity-75' : 'opacity-100'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <button onClick={() => onToggleStatus && onToggleStatus(task.id)} className={`mt-0.5 flex-shrink-0 transition-colors ${isDone ? 'text-emerald-500 hover:text-emerald-600' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400'}`} title="Toggle Status">
              {isDone ? <CheckCircleSolid className="w-6 h-6" /> : <CheckCircleIcon className="w-6 h-6" />}
            </button>
            <div className="flex-1">
              <h3 className={`text-base font-semibold ${isDone ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                {task.tittle}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded-full border font-medium capitalize transition-colors ${statusStyles[task.status]}`}>
                  {task.status.replace('-', ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full border font-medium capitalize transition-colors ${priorityStyles[task.priority]}`}>
                  {task.priority} Priority
                </span>
                <span className="text-slate-400 dark:text-slate-500 ml-auto">
                  {frmtDate(task.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <button onClick={() => onDelete && onDelete(task.id)} className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1" title="Delete Task">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };
  
  export default TaskItem;