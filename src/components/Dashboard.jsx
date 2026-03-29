import React, {useEffect, useState} from 'react'
import { load, save } from '../utils/storage'
import quotes from '../data/quotes.json'

function useStreak(){
  const [streak, setStreak] = useState(()=> load('streak', {count:0,last:null}))
  useEffect(()=> save('streak', streak), [streak])
  return [streak, setStreak]
}

export default function Dashboard(){
  const [tasks] = useState(()=> load('tasks', []))
  const [streak, setStreak] = useStreak()
  const [timerSec, setTimerSec] = useState(0)
  const [running, setRunning] = useState(false)
  const [quote] = useState(()=> quotes[Math.floor(Math.random()*quotes.length)])

  useEffect(()=>{
    let t
    if(running){
      t = setInterval(()=> setTimerSec(s=> s+1), 1000)
    }
    return ()=> clearInterval(t)
  },[running])

  const start = (mins)=>{ setTimerSec(0); setRunning(true); save('lastTimer', {start:Date.now(),mins}) }
  const stop = ()=>{ setRunning(false); const entry = load('timelog', []); entry.push({duration: timerSec, at: Date.now()}); save('timelog', entry) }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <h2 className="text-lg font-semibold">Today's Tasks</h2>
        <div className="mt-2 space-y-2">
          {tasks.length===0 && <div className="text-gray-400">No tasks for today. Add some in Tasks tab.</div>}
          {tasks.map((t,i)=> (
            <div key={i} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              <div>
                <div className="text-sm">{t.title}</div>
                <div className="text-xs text-gray-400">{t.category}</div>
              </div>
              <div className="text-indigo-400">{t.done? '✓': ''}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold">Streak</h2>
        <div className="mt-2 text-3xl font-bold">{streak.count} days</div>
        <div className="mt-4 flex gap-2">
          <button onClick={()=> setStreak(s=> ({...s,count: s.count+1, last: Date.now()}))} className="px-3 py-1 bg-indigo-600 rounded">Add Day</button>
          <button onClick={()=> setStreak({count:0,last:null})} className="px-3 py-1 bg-gray-700 rounded">Reset</button>
        </div>
      </div>

      <div className="card md:col-span-2">
        <h2 className="text-lg font-semibold">Focus Timer</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-4xl font-mono">{Math.floor(timerSec/60).toString().padStart(2,'0')}:{(timerSec%60).toString().padStart(2,'0')}</div>
          <div className="space-x-2">
            <button onClick={()=> start(25)} className="px-3 py-1 bg-green-600 rounded">25</button>
            <button onClick={()=> start(50)} className="px-3 py-1 bg-green-600 rounded">50</button>
            <button onClick={stop} className="px-3 py-1 bg-red-600 rounded">Stop</button>
          </div>
        </div>
      </div>

      <div className="card md:col-span-2">
        <h2 className="text-lg font-semibold">Motivation</h2>
        <div className="mt-2 text-gray-300">"{quote}"</div>
      </div>
    </div>
  )
}
