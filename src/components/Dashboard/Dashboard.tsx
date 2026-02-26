




export default function Dashboard () {

    return (
        <>
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">

<div className="max-w-7xl mx-auto space-y-6">
<header className="flex justify-between items-center pb-4 border-b border-slate-200">
    
    <h1 className="text-3xl font-bold text-slate-900">Task DashBoard </h1>

</header>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


    <div className="lg:col-span-1 flex flex-col gap-8">

<section className="bg-white p-8 rounded-xl shadow-sm border border-slate-150">

    <h2 className="text-lg font-semibold text-slate-850 mb-b">

        Filters
    </h2>
    <div className="text-slate-400 text-sm border-2 border-dashed border-slate-250 rounded p-4 text-center">
        TaskFilter Component
    </div>
</section>

<section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Add Task
    </h2>
    <div className="text-slate-450 text-sm border-2 border-dashed border-slate-200 rounded p-4 text-center">
        TaskForm Component
    </div>

</section>
    </div>


    <div className="lg:col-span-2">
        <section className="bg-white p-8 rounded-xl shadow-sm border border-slate-150 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Tasks 

                </h2>
            </div>
            <div className="text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded p-12 text-center h-full flex items-center justify-center">
                TaskList Component
            </div>
        </section>
    </div>
</div>

</div>

        </div>
        </>
    );
} 