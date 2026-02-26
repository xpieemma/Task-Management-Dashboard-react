
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
    low: 'bg-blue-50 text-blue-700 border-blue-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-red-50 text-red-700 border-red-200',
  };
  const statusStyles = {
    todo: 'bg-slate-100 text-slate-700 border-slate-200',
    'in-progress': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  const TaskItem = ({ task, onToggleStatus, onDelete }: TaskItemProps) => {
    const isDone = task.status === 'done';
  return (
    <div className={`p-4 mb-4 rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md bg-white ${isDone ? 'opacity-75' : 'opacity-100'}`}>
      <div className="flex items-start justify-between gap-4">
        
        {/* Left Side: Status Toggle & Text */}
        <div className="flex items-start gap-3 flex-1">
          <button 
            onClick={() => onToggleStatus && onToggleStatus(task.id)}
            className={`mt-0.5 flex-shrink-0 transition-colors ${isDone ? 'text-emerald-500 hover:text-emerald-600' : 'text-slate-400 hover:text-indigo-500'}`}
            title="Toggle Status"
          >
            {isDone ? (
              <CheckCircleSolid className="w-6 h-6" />
            ) : (
              <CheckCircleIcon className="w-6 h-6" />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`text-base font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-800'}`}>
              {task.tittle}
            </h3>
            {task.description && (
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                {task.description}
              </p>
            )}
            
            {/* Badges & Date Footer */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className={`px-2 py-1 rounded-full border font-medium capitalize ${statusStyles[task.status]}`}>
                {task.status.replace('-', ' ')}
              </span>
              <span className={`px-2 py-1 rounded-full border font-medium capitalize ${priorityStyles[task.priority]}`}>
                {task.priority} Priority
              </span>
              <span className="text-slate-400 ml-auto">
                {frmtDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Delete Action */}
        <button
          onClick={() => onDelete && onDelete(task.id)}
          className="text-slate-400 hover:text-red-500 transition-colors p-1"
          title="Delete Task"
        >
          <TrashIcon className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default TaskItem;