import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";

type Sorting = 'newest' | 'oldest' | 'high-priority' | 'low-priority';

const priorityValue = {high: 4, medium:2.8, low: 1.8};
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
    createdAt: new Date().toISOString(),
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
          {id: '5',
              tittle: 'lab 11',
              description: 'Build a Task Management',
              status: 'in-progress',
              priority: 'high',
              createdAt: new Date().toISOString(),
  }
  ,
          {id: '5',
              tittle: 'lab 12',
              description: 'Build a project',
              status: 'in-progress',
              priority: 'high',
              createdAt: new Date().toISOString(),
  }
  ,
          {id: '5',
              tittle: 'lab 14',
              description: 'Build',
              status: 'in-progress',
              priority: 'high',
              createdAt: new Date().toISOString(),
  }
  ,
          {id: '8',
              tittle: 'sba 19',
              description: 'Build a Task',
              status: 'in-progress',
              priority: 'high',
              createdAt: new Date().toISOString(),
  }
  ,
          {id: '9',
              tittle: 'Complete React Assessment',
              description: 'Mange',
              status: 'in-progress',
              priority: 'low',
              createdAt: new Date().toISOString(),
  }
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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
    const searchMached =
      task.tittle.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());

    return searchMached;
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

  const[sorting, setSorting] =useState<Sorting>('newest');

  const sorted_filtered = [...tasksFiltered].sort((t0, t1) => {
    switch(sorting) {
        case 'newest':
            return new Date(t1.createdAt).getTime() - new Date(t0.createdAt).getTime();
        case 'oldest': 
        return new Date(t0.createdAt).getTime() -new Date(t1.createdAt).getTime();
        case 'high-priority':
            return priorityValue [t0.priority] - priorityValue[t1.priority];
        default: 
        return 0;
    }

  });

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex justify-between items-center pb-4 border-b border-slate-200">
            <h1 className="text-3xl font-bold text-slate-900">
              Task DashBoard
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-8">
              <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-150">
                <h2 className="text-lg font-semibold text-slate-850 mb-b">
                  
                  Filters
                </h2>
                <TaskFilter
                  searchQuery={filters.search}
                  onSearchChange={(search) =>
                    setFilters({ ...filters, search })
                  }
                  statusFilter={filters.status}
                  onStatusFilterChange={(status) =>
                    setFilters({ ...filters, status })
                  }
                  priorityFilter={filters.priority}
                  onPriorityFilterChange={(priority) =>
                    setFilters({ ...filters, priority })
                  }
                />
              </section>

              {/* <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
<h2 className="text-lg font-semibold text-slate-800 mb-4"> Add Task</h2>
    <TaskForm onSubmit={handleTaskAdded}
    />
        </section> */}
              {/* </div> */}

              {/* <div className="text-slate-400 text-sm border-2 border-dashed border-slate-250 rounded p-4 text-center">
            TaskFilter Component
    </div> */}
              {/* <div className="lg:col-span-2"> */}

              <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Add Task
                </h2>
                <div className="text-slate-450 text-sm border-2 border-dashed border-slate-200 rounded p-4 text-center">
                  <TaskForm onSubmit={handleTaskAdded} />
                </div>
              </section>
            </div>

            <TaskList tasks={tasks} />
            <div className="lg:col-span-2">
              <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-150 min-h-[500px]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">
                    Tasks ({sorted_filtered.length})
                  </h2>
                  <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-medium text-slate-600">Sort by:</label>
            <select
                    id="sort"
                    value={sorting}
                    onChange={(e) => setSorting(e.target.value as Sorting)}
                    className="rounded-md border border-slate-300 py-1.5 pl-3 pr-8 text-sm bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priority-high">Priority: High to Low</option>
                    <option value="priority-low">Priority: Low to High</option>
                  </select>
                </div>
              </div>

                <div className="text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded p-12 text-center h-full flex items-center justify-center">
                <TaskList 
                tasks={sorted_filtered} 
                onToggleStatus={handleStatusToggled}
                onDelete={toDelete} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
