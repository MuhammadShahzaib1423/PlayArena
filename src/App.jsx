import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import VenueDetail from './pages/VenueDetail'
import Bookings from './pages/Bookings'
import Favorites from './pages/Favorites'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-forest">Page not found</h1>
      <p className="mt-3 text-slate-500">That court does not exist. Head back to the home court.</p>
      <Link
        to="/"
        className="inline-block mt-6 bg-forest text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-forest-light transition"
      >
        Back to home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-ivory font-sans text-slate-800 flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
