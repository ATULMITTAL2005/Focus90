import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Roadmap from './components/Roadmap'
import Tracker from './components/Tracker'
import Tasks from './components/Tasks'
import FocusMode from './components/FocusMode'
import Analytics from './components/Analytics'
import Motivational from './components/Motivational'
import Header from './components/Header'
import Footer from './components/Footer'

export default function AppRouter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/focus" element={<FocusMode />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/motivation" element={<Motivational />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
