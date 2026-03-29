import React, {useState} from 'react'
import { load, save } from '../utils/storage'

export default function Motivational(){
  const [why, setWhy] = useState(()=> load('why', ''))

  const saveWhy = ()=> { save('why', why) }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold">Why You Started</h2>
      <textarea value={why} onChange={e=> setWhy(e.target.value)} rows={6} className="w-full mt-2 p-2 bg-gray-900 border border-gray-700 rounded" placeholder="Write your purpose..." />
      <div className="mt-2"><button onClick={saveWhy} className="px-3 py-1 bg-indigo-600 rounded">Save</button></div>
    </div>
  )
}
