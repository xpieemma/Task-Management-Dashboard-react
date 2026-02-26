




export default function Dashboard () {

    return (
        <>
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">

<div className="max-w-7xl mx-auto space-y-6">
<header>
    
    <h1 className="text-3xl font-bold text-slate-900">Task DashBoard </h1>

</header>

<div>


    <div>

<section>

    <h2>

        Filters
    </h2>
    <div>
        TaskFilter Component
    </div>
</section>

<section>
    <h2>
        Add Task
    </h2>
    <div>
        TaskForm Component
    </div>

</section>
    </div>
    <div>
        <section>
            <div>
                <h2>Tasks 

                </h2>
            </div>
            <div>
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