import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import type { TaskPriority, TaskStatus } from "../../types";

interface TaskFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: TaskStatus | "all";
  onStatusFilterChange: (status: TaskStatus | "all") => void;
  priorityFilter: TaskPriority | "all";
  onPriorityFilterChange: (priority: TaskPriority | "all") => void;
}

export default function TaskFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: TaskFilterProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-1">
        <label htmlFor="search" className="text-sm font-medium text-slate-700">Search Tasks</label>
        <div className="relative">
          <div className="pointer-event-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassCircleIcon
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(el) => onSearchChange(el.target.value)}
            placeholder="Search by title or description..."
            className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:right-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="statusFilter" className="text-sm font-medium text-slate-700">
            Status</label>
          <select
            name=""
            id="StatusFilter"
            value={statusFilter}
            onChange={(el) =>
              onStatusFilterChange(el.target.value as TaskStatus | "all")
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all"></option>
            <option value="todo"></option>
            <option value="in-progress"></option>
            <option value="done"></option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="priorityFilter" className="text-sm font-medium text-slate-700">Priority</label>
          <select
            name=""
            id="priorityFilter"
            value={priorityFilter}
            onChange={(el) =>
              onPriorityFilterChange(el.target.value as TaskPriority | "all")
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
