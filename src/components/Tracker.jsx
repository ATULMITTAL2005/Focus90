import React, {useState, useEffect} from 'react'
import { load, save } from '../utils/storage'

export default function Tracker(){
  const [logs, setLogs] = useState(()=> load('screenlogs', []))
  const [minutes, setMinutes] = useState(0)

  useEffect(()=> save('screenlogs', logs), [logs])

  const add = ()=>{
    const entry = {minutes: Number(minutes), at: Date.now(), social: false}
    const n = [entry, ...logs]
    setLogs(n); setMinutes(0)
  }

  const total = logs.reduce((s,l)=> s + l.minutes, 0)
  const noSocialDays = logs.filter(l=> !l.social).length

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="font-semibold">Log Screen Time (manual)</h3>
        <div className="mt-2 flex gap-2">
          <input type="number" value={minutes} onChange={e=> setMinutes(e.target.value)} className="w-32 p-2 bg-gray-900 border border-gray-700 rounded" />
          <button onClick={add} className="px-3 py-1 bg-indigo-600 rounded">Add</button>
        </div>
        <div className="mt-3 text-sm text-gray-400">Total minutes logged: {total}</div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Stats</h3>
        <div className="mt-2">Total minutes: {total}</div>
        <div>No Social Media days logged: {noSocialDays}</div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Recent Logs</h3>
        <div className="mt-2 space-y-2">
          {logs.slice(0,10).map((l,i)=>(
            <div key={i} className="flex justify-between text-sm text-gray-300"><div>{new Date(l.at).toLocaleString()}</div><div>{l.minutes} min</div></div>
          ))}
        </div>
      </div>
    </div>
  )
}
