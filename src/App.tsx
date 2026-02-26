
import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

function App() {
const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  }
  return false;
});

useEffect(()=> {
  const root = window.document.documentElement;
if (darkMode) {root.classList.add('dark');
  localStorage.setItem('theme', 'dark');
} else {
  root.classList.remove('dark');
  localStorage.setItem('theme', 'light');
}
}, [darkMode]);

const changeTheme =() => setDarkMode(!darkMode);
  return (
    <>
    <button onClick={changeTheme}
    className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark: border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all z-10"
    aria-lable = "Reaction Dark Mode"> {darkMode ? <SunIcon className="w-6 h-6" /> :
    <MoonIcon className="w-6 h-6" /> }</button>
    
    <Dashboard />

    </>
  )
}

export default App
