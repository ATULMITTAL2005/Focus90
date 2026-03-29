import React from 'react'
import { load, save } from '../utils/storage'

function Day({day, checked, onToggle}){
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={()=> onToggle(day)} />
      <div>Day {day}</div>
    </div>
  )
}

export default function Roadmap(){
  const total = 90
  const [checked, setChecked] = React.useState(()=> load('roadmap', {}))

  const toggle = (d)=>{
    const copy = {...checked, [d]: !checked[d]}
    setChecked(copy); save('roadmap', copy)
  }

  const renderPhase = (start, end, title)=> (
    <div className="card">
      <h3 className="font-semibold">{title} ({start}–{end})</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
        {Array.from({length: end-start+1}).map((_,i)=>{
          const day = start + i
          return <Day key={day} day={day} checked={!!checked[day]} onToggle={toggle} />
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">90-Day Roadmap</h2>
      {renderPhase(1,30,'Phase 1 — Basics')}
      {renderPhase(31,60,'Phase 2')}
      {renderPhase(61,90,'Phase 3')}
    </div>
  )
}
