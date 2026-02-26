import { useEffect, useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";

type Sorting = "newest" | "oldest" | "high-priority" | "low-priority";

const priorityValue = { high: 4, medium: 2.8, low: 1.8 };
const initialTasks: Task[] = [
  {
    id: "1",
    tittle: "Complete REST assignment",
    description: "Build a Rest Country API",
    status: "done",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    tittle: "Complete React Assessment",
    description: "Build a Task Management",
    status: "in-progress",
    priority: "high",
    createdAt: new Date(Date.now()-86400000).toISOString(),
  },
  {
    id: "3",
    tittle: "Come to class",
    description: "Having disposition to learn",
    status: "done",
    priority: "low",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    tittle: "Complete JRA 2 requirements",
    description: "Elevator pitch, resume and Linkedin page",
    status: "todo",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    tittle: "lab 11",
    description: "Build a Task Management",
    status: "in-progress",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    tittle: "lab 12",
    description: "Build a project",
    status: "in-progress",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    tittle: "lab 14",
    description: "Build",
    status: "in-progress",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    tittle: "sba 19",
    description: "Build a Task",
    status: "in-progress",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    tittle: "Complete React Assessment",
    description: "Mange",
    status: "in-progress",
    priority: "low",
    createdAt: new Date().toISOString(),
  },
  { id: "34", 
    tittle: "Attend Group Project Meeting",
     description: "Discuss API integration plan and assign responsibilities for the next sprint.",
      status: "done", 
      priority: "medium", 
      createdAt: new Date().toISOString(),
    }, 
    { id: "45", 
        tittle: "Update Personal Portfolio", 
        description: "Add the latest class project and improve the layout of the projects section.",
     status: "done", 
         priority: "low", 
        createdAt: "2026-02-05T17:40:00Z" },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksSaved = localStorage.getItem('task-data');
    if (tasksSaved) {
        try {
            return JSON.parse(tasksSaved);
        } catch (error){
            console.error('tasks from localStorage failed', error);
        }
    }
    return initialTasks
  });

  useEffect(() => {
    localStorage.setItem('task-data', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };
  const handleStatusToggled = (id: string) => {
    setTasks(
      tasks.map((task) => {
        //loop through every element
        if (task.id === id) {
          // check if the particular id, match an element while looping
          const nStatus = task.status === "done" ? "todo" : "done"; //only if status is done, make it become todo, otherwise it is done
          return { ...task, status: nStatus }; // after looping through element, return the one element  with status follow  the tertary operator
        }
        return task; // if the return inside did not execute, there is no match for id in the if, return task without change
      }),
    );
  };

  const [filters, setFilters] = useState<{
    search: string;
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
  }>({ search: "", status: "all", priority: "all" });

  const tasksFiltered = tasks.filter((task) => {
    const searchMatched =
      task.tittle.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());
    const statusMatched =
      filters.status === "all" || task.status === filters.status;
    const priorityMatched =
      filters.priority === "all" || task.priority === filters.priority;
    return searchMatched && statusMatched && priorityMatched;
  });

  // const handleStatusToggled = (id: string) => {
  // setTasks(prev => prev.map(
  // task => task.id === id ? {
  //  ...task, status: task.status === 'done' ? 'todo' : 'done' } :
  // task ) ); };

  const toDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id)); // filter to create a new array
    // this array should have element where the id does not match to this specific id
  };

  const [sorting, setSorting] = useState<Sorting>("newest");

  const sorted_filtered = [...tasksFiltered].sort((t0, t1) => {
    switch (sorting) {
      case "newest":
        return (
          new Date(t1.createdAt).getTime() - new Date(t0.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(t0.createdAt).getTime() - new Date(t1.createdAt).getTime()
        );
      case "high-priority":
        return priorityValue[t0.priority] - priorityValue[t1.priority];
      default:
        return 0;
    }
  });

  const sumTasks = tasks.length;
  const sumTasksCompleted = tasks.filter(
    (task) => task.status === "done",
  ).length;
  const sumTasksPending = sumTasks - sumTasksCompleted;

  
  return (

      <div className="min-h-screen p-4 md:p-8 pt-20 md:pt-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">Task Dashboard</h1>
        </header>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Tasks</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{sumTasks}</p>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{sumTasksCompleted}</p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-800">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{sumTasksPending}</p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-100 dark:border-amber-800">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Filters</h2>
              <TaskFilter searchQuery={filters.search} onSearchChange={(search) => setFilters({ ...filters, search })} statusFilter={filters.status} onStatusFilterChange={(status) => setFilters({ ...filters, status })} priorityFilter={filters.priority} onPriorityFilterChange={(priority) => setFilters({ ...filters, priority })} />
            </section>

            <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Add Task</h2>
              <TaskForm onSubmit={handleTaskAdded} />
            </section>
          </div>

          <div className="lg:col-span-2">
            <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 min-h-[500px] transition-colors">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  Tasks ({sorted_filtered.length})
                </h2>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-medium text-slate-600 dark:text-slate-300">Sort by:</label>
                  <select id="sort" value={sorting} onChange={(e) => setSorting(e.target.value as Sorting)} className="rounded-md border border-slate-300 dark:border-slate-600 py-1.5 pl-3 pr-8 text-sm bg-white dark:bg-slate-700 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priority-high">Priority: High to Low</option>
                    <option value="priority-low">Priority: Low to High</option>
                  </select>
                </div>
              </div>
              <TaskList tasks={sorted_filtered} onToggleStatus={handleStatusToggled} onDelete={toDelete} />
            </section>
          </div>
        </div>
      </div>
    </div>

  );
}
