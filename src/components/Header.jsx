import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  ['Home','/'],['Roadmap','/roadmap'],['Tracker','/tracker'],['Tasks','/tasks'],['Focus','/focus'],['Analytics','/analytics']
]

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Focus90</h1>

        <nav className="hidden sm:flex space-x-3 text-sm">
          {links.map(([label, to])=> (
            <NavLink key={to} to={to} className={({isActive})=> isActive? 'text-indigo-400':'text-gray-400'}>{label}</NavLink>
          ))}
        </nav>

        <div className="sm:hidden">
          <button onClick={()=> setOpen(o=> !o)} className="text-gray-300 p-2 bg-gray-800 rounded">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden border-t border-gray-800 ${open? 'block':'hidden'}`}>
        <div className="max-w-5xl mx-auto p-3 space-y-2 flex flex-col">
          {links.map(([label, to])=> (
            <NavLink key={to} to={to} onClick={()=> setOpen(false)} className={({isActive})=> `text-sm ${isActive? 'text-indigo-400':'text-gray-300'}`} >{label}</NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}
