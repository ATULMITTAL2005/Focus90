import React, {useState} from 'react'
import { load, save } from '../utils/storage'

export default function Tasks(){
  const [tasks, setTasks] = useState(()=> load('tasks', []))
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('DSA')

  const add = ()=>{
    if(!title) return
    const n = [{title, category, done:false}, ...tasks]
    setTasks(n); save('tasks', n); setTitle('')
  }

  const toggle = (idx)=>{
    const copy = [...tasks]; copy[idx].done = !copy[idx].done; setTasks(copy); save('tasks', copy)
  }

  const remove = (idx)=>{ const copy = tasks.filter((_,i)=> i!==idx); setTasks(copy); save('tasks', copy) }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="font-semibold">Add Task</h3>
        <div className="mt-2 flex gap-2">
          <input value={title} onChange={e=> setTitle(e.target.value)} className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded" placeholder="Task title" />
          <select value={category} onChange={e=> setCategory(e.target.value)} className="p-2 bg-gray-900 border border-gray-700 rounded">
            <option>DSA</option>
            <option>Aptitude</option>
            <option>Core</option>
            <option>Project</option>
          </select>
          <button onClick={add} className="px-3 py-1 bg-indigo-600 rounded">Add</button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Tasks</h3>
        <div className="mt-2 space-y-2">
          {tasks.length===0 && <div className="text-gray-400">No tasks yet.</div>}
          {tasks.map((t,i)=> (
            <div key={i} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              <div>
                <div className={t.done? 'line-through text-gray-400':'text-sm'}>{t.title}</div>
                <div className="text-xs text-gray-500">{t.category}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=> toggle(i)} className="px-2 py-1 bg-green-600 rounded">{t.done? 'Undo':'Done'}</button>
                <button onClick={()=> remove(i)} className="px-2 py-1 bg-red-600 rounded">Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
