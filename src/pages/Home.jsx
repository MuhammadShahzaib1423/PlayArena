import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SPORTS, venues } from '../data/venues'
import { priceFrom } from '../data/venues'
import { useFavorites } from '../lib/bookings'
import VenueCard from '../components/VenueCard'

const SORTS = [
  { value: 'rating', label: 'Highest rated' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('All')
  const [sort, setSort] = useState('rating')
  const [contactSent, setContactSent] = useState(false)
  const { has, toggle } = useFavorites()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = venues.filter((v) => {
      const matchesQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.area.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.sports.some((s) => s.sport.toLowerCase().includes(q))
      const matchesSport = sport === 'All' || v.sports.some((s) => s.sport === sport)
      return matchesQuery && matchesSport
    })
    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'price-low') return [...list].sort((a, b) => priceFrom(a) - priceFrom(b))
    return [...list].sort((a, b) => priceFrom(b) - priceFrom(a))
  }, [query, sport, sort])

  return (
    <div>
      {/* Hero */}
      <section className="bg-forest relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
          <defs>
            <pattern id="hero-pattern" width="56" height="56" patternUnits="userSpaceOnUse">
              <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-gold-light text-sm font-semibold tracking-widest uppercase">
              Indoor sports · Rawalpindi &amp; Islamabad
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory leading-tight max-w-3xl">
              Book your game. Own the court.
            </h1>
            <p className="mt-4 text-ivory/80 text-base sm:text-lg max-w-2xl leading-relaxed">
              Padel, indoor cricket, badminton, futsal, squash and table tennis — find a venue, pick a slot and confirm
              your booking in minutes.
            </p>
            <div className="mt-8 bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl shadow-soft">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search venues or sports — try “padel” or “F-7”…"
                className="flex-1 px-4 py-3 rounded-xl outline-none text-slate-800 placeholder:text-slate-400"
              />
              <a
                href="#venues"
                className="bg-forest text-white text-center font-medium px-6 py-3 rounded-xl hover:bg-forest-light transition"
              >
                Search
              </a>
            </div>
            <p className="mt-4 text-ivory/60 text-sm">
              {venues.length} venues · {SPORTS.length} sports · Prices from PKR 900 per hour
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + venue grid */}
      <section id="venues" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24">
        <div className="flex flex-wrap items-center gap-2">
          {['All', ...SPORTS].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSport(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                sport === s ? 'bg-forest text-white' : 'bg-white border border-sand text-slate-600 hover:border-gold'
              }`}
            >
              {s}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-slate-500">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-sand rounded-full px-4 py-2 text-sm font-medium text-slate-700 outline-none cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          {filtered.length} {filtered.length === 1 ? 'venue' : 'venues'}
          {sport !== 'All' && ` for ${sport}`}
          {query.trim() && ` matching “${query.trim()}”`}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-8 bg-white rounded-2xl border border-sand p-10 text-center">
            <p className="font-display text-2xl font-bold text-forest">No venues match that search</p>
            <p className="mt-2 text-slate-500 text-sm">Try a different sport, area or venue name.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setSport('All')
              }}
              className="mt-5 bg-forest text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-forest-light transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((venue, i) => (
              <VenueCard key={venue.id} venue={venue} index={i} isFavorite={has(venue.id)} onToggleFavorite={toggle} />
            ))}
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-sand shadow-soft p-8 sm:p-12 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase">About PlayArena</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-forest leading-tight">
              Indoor sport, without the phone calls.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              PlayArena brings the city’s indoor venues together in one calm place. Compare courts and prices, check
              what a venue offers, and lock in your slot with a booking reference you can show at the door. No
              back-and-forth, no waiting for a reply.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 content-center">
            {[
              { value: `${venues.length}`, label: 'Venues' },
              { value: `${SPORTS.length}`, label: 'Sports' },
              { value: '2', label: 'Cities' },
            ].map((s) => (
              <div key={s.label} className="bg-cream rounded-2xl p-5 text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-forest">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-24">
        <div className="bg-forest rounded-3xl p-8 sm:p-12 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-gold-light text-sm font-semibold tracking-widest uppercase">Contact</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-ivory leading-tight">
              Questions about a booking?
            </h2>
            <p className="mt-4 text-ivory/75 leading-relaxed">
              Send us a message and we will get back to you. For venue partnerships and group bookings, tell us the
              sport, the city and your preferred days.
            </p>
            <p className="mt-6 text-sm text-ivory/60">We reply on working days, 9:00 AM – 6:00 PM PKT.</p>
          </div>
          {contactSent ? (
            <div className="bg-white rounded-2xl p-8 flex flex-col justify-center">
              <p className="font-display text-2xl font-bold text-forest">Message received.</p>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Thank you — we will reply to your email soon.
              </p>
            </div>
          ) : (
            <form
              className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()
                setContactSent(true)
              }}
            >
              <input
                type="text"
                required
                placeholder="Your name"
                className="border border-sand rounded-xl px-4 py-3 outline-none focus:border-gold text-sm"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                className="border border-sand rounded-xl px-4 py-3 outline-none focus:border-gold text-sm"
              />
              <textarea
                required
                rows={4}
                placeholder="Your message"
                className="border border-sand rounded-xl px-4 py-3 outline-none focus:border-gold text-sm resize-none"
              />
              <button
                type="submit"
                className="bg-forest text-white font-medium py-3 rounded-xl hover:bg-forest-light transition"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
