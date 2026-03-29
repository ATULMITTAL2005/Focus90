import React from 'react'
import { load } from '../utils/storage'

export default function Analytics(){
  const tasks = load('tasks', [])
  const timelog = load('timelog', [])
  const totalSec = timelog.reduce((s,e)=> s + (e.duration || 0), 0)
  const completed = tasks.filter(t=> t.done).length
  const completion = tasks.length ? Math.round((completed/tasks.length)*100) : 0
  const hours = Math.round((totalSec/3600)*10)/10
  const streak = load('streak', {count:0}).count

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <h3 className="font-semibold">Completion</h3>
        <div className="mt-2 text-3xl">{completion}%</div>
        <div className="w-full bg-gray-700 h-3 mt-2 rounded"><div className="bg-indigo-500 h-3 rounded" style={{width: `${completion}%`}} /></div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Study Time</h3>
        <div className="mt-2 text-2xl">{hours} hours</div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Streak</h3>
        <div className="mt-2 text-2xl">{streak} days</div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Quick Stats</h3>
        <div className="mt-2 text-sm">Tasks total: {tasks.length}</div>
        <div className="text-sm">Sessions logged: {timelog.length}</div>
      </div>
    </div>
  )
}
