import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import Authentication from './pages/Authentication'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
    </>
  )
}

export default App
