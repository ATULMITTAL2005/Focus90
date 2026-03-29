import React, {useEffect, useState} from 'react'
import { save, load } from '../utils/storage'

export default function FocusMode(){
  const [secs, setSecs] = useState(0)
  const [running, setRunning] = useState(false)
  const [mins, setMins] = useState(25)

  useEffect(()=>{
    let t
    if(running) t = setInterval(()=> setSecs(s=> s+1), 1000)
    return ()=> clearInterval(t)
  },[running])

  useEffect(()=>{
    if(secs && secs % 60 === 0) save('lastFocus', {secs, at: Date.now()})
  },[secs])

  const start = ()=> { setSecs(0); setRunning(true); document.documentElement.requestFullscreen?.() }
  const stop = ()=> { setRunning(false); document.exitFullscreen?.(); const log = load('timelog', []); log.push({duration: secs, at: Date.now()}); save('timelog', log) }

  return (
    <div className="card text-center">
      <h2 className="text-lg font-semibold">Focus Mode</h2>
      <div className="mt-4 text-6xl font-mono">{Math.floor(secs/60).toString().padStart(2,'0')}:{(secs%60).toString().padStart(2,'0')}</div>
      <div className="mt-4 flex justify-center gap-2">
        <select value={mins} onChange={e=> setMins(Number(e.target.value))} className="p-2 bg-gray-900 border border-gray-700 rounded">
          <option value={25}>25 min</option>
          <option value={50}>50 min</option>
        </select>
        <button onClick={start} className="px-4 py-2 bg-green-600 rounded">Start</button>
        <button onClick={stop} className="px-4 py-2 bg-red-600 rounded">Stop</button>
      </div>
      <div className="mt-3 text-sm text-gray-400">Minimal UI, distraction free. Press Stop to log time.</div>
    </div>
  )
}
