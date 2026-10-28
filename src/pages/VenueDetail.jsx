import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { venues } from '../data/venues'
import { VenueVisual } from '../components/VenueCard'
import {
  SLOT_START_HOURS,
  addBooking,
  dateKeyOf,
  dateLabelOf,
  formatHour,
  formatPKR,
  getBookings,
  nextDays,
  useFavorites,
} from '../lib/bookings'

const DURATIONS = [1, 2, 3]

export default function VenueDetail() {
  const { id } = useParams()
  const venue = venues.find((v) => v.id === id)
  const { has, toggle } = useFavorites()
  const days = useMemo(() => nextDays(7), [])

  const [courtId, setCourtId] = useState(venue ? venue.courts[0].id : '')
  const [dateKey, setDateKey] = useState(dateKeyOf(new Date()))
  const [startHour, setStartHour] = useState(null)
  const [duration, setDuration] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [players, setPlayers] = useState(2)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(null)

  if (!venue) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-forest">Venue not found</h1>
        <p className="mt-3 text-slate-500">That venue does not exist on PlayArena.</p>
        <Link
          to="/"
          className="inline-block mt-6 bg-forest text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-forest-light transition"
        >
          Browse venues
        </Link>
      </div>
    )
  }

  const court = venue.courts.find((c) => c.id === courtId) || venue.courts[0]
  const selectedDay = days.find((d) => dateKeyOf(d) === dateKey) || days[0]
  const price = duration * court.pricePerHour
  const endHour = startHour === null ? null : startHour + duration

  const existing = getBookings().filter(
    (b) => b.venueId === venue.id && b.courtId === court.id && b.dateKey === dateKey,
  )

  const slotDisabled = (h) => {
    if (h + duration > 23) return true
    return existing.some((b) => h < b.startHour + b.duration && b.startHour < h + duration)
  }

  const handleSlotClick = (h) => {
    setStartHour(h)
    const maxDuration = 23 - h
    setDuration((d) => Math.min(d, Math.max(1, maxDuration)))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.')
      return
    }
    if (startHour === null) {
      setError('Please choose a start time.')
      return
    }
    const booking = addBooking({
      venueId: venue.id,
      venueName: venue.name,
      area: venue.area,
      city: venue.city,
      courtId: court.id,
      courtName: court.name,
      sport: court.sport,
      dateKey,
      dateLabel: dateLabelOf(selectedDay),
      startHour,
      duration,
      endHour: startHour + duration,
      price,
      name: name.trim(),
      phone: phone.trim(),
      players,
    })
    setError('')
    setConfirmed(booking)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="text-sm text-slate-500 hover:text-forest transition">
        ← All venues
      </Link>

      <VenueVisual venue={venue} className="mt-4 rounded-3xl h-64 sm:h-72">
        <span className="absolute inset-0 flex items-center justify-center font-display text-[160px] leading-none text-white/15 font-bold select-none">
          {venue.sports[0].sport[0]}
        </span>
        <button
          type="button"
          onClick={() => toggle(venue.id)}
          aria-label={has(venue.id) ? 'Remove from favourites' : 'Save to favourites'}
          className="absolute top-4 right-4 bg-white/95 text-sm font-medium px-4 py-2 rounded-full shadow hover:scale-105 transition"
        >
          {has(venue.id) ? '♥ Saved' : '♡ Save'}
        </button>
        <div className="absolute bottom-5 left-5 sm:left-8">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">{venue.name}</h1>
          <p className="mt-1 text-white/85 text-sm sm:text-base">
            {venue.area}, {venue.city} · ★ {venue.rating} ({venue.reviews} reviews) · {venue.hours}
          </p>
        </div>
      </VenueVisual>

      <p className="mt-6 text-slate-600 leading-relaxed max-w-3xl">{venue.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {venue.amenities.map((a) => (
          <span key={a} className="bg-white border border-sand text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
            {a}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Courts */}
          <section>
            <h2 className="font-display text-2xl font-bold text-forest">Choose a court</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {venue.courts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setCourtId(c.id)
                    setStartHour(null)
                  }}
                  className={`text-left rounded-2xl border p-4 transition ${
                    court.id === c.id
                      ? 'border-forest bg-white shadow-soft ring-1 ring-forest'
                      : 'border-sand bg-white hover:border-gold'
                  }`}
                >
                  <p className="font-semibold text-forest">{c.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {c.sport} · {c.surface}
                  </p>
                  <p className="mt-2 font-bold text-forest">
                    {formatPKR(c.pricePerHour)} <span className="text-xs font-normal text-slate-400">/hour</span>
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Dates */}
          <section>
            <h2 className="font-display text-2xl font-bold text-forest">Choose a day</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {days.map((d) => {
                const key = dateKeyOf(d)
                const active = key === dateKey
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setDateKey(key)
                      setStartHour(null)
                    }}
                    className={`shrink-0 rounded-2xl border px-4 py-3 text-center transition ${
                      active ? 'bg-forest text-white border-forest' : 'bg-white border-sand text-slate-600 hover:border-gold'
                    }`}
                  >
                    <span className="block text-xs font-medium uppercase">
                      {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                    </span>
                    <span className="block mt-0.5 font-bold">
                      {d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Time slots */}
          <section>
            <h2 className="font-display text-2xl font-bold text-forest">Choose a start time</h2>
            <p className="mt-1 text-sm text-slate-500">
              Slots already booked for this court and day are greyed out. Venue closes at 11:00 PM.
            </p>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {SLOT_START_HOURS.map((h) => {
                const disabled = slotDisabled(h)
                const active = startHour === h
                return (
                  <button
                    key={h}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSlotClick(h)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition ${
                      active
                        ? 'bg-forest text-white'
                        : disabled
                          ? 'bg-cream text-slate-300 cursor-not-allowed line-through'
                          : 'bg-white border border-sand text-slate-700 hover:border-gold'
                    }`}
                  >
                    {formatHour(h)}
                  </button>
                )
              })}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="duration" className="text-sm text-slate-500">
                Duration
              </label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="bg-white border border-sand rounded-full px-4 py-2 text-sm font-medium text-slate-700 outline-none cursor-pointer"
              >
                {DURATIONS.filter((d) => startHour === null || startHour + d <= 23).map((d) => (
                  <option key={d} value={d}>
                    {d} {d === 1 ? 'hour' : 'hours'}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>

        {/* Booking form / confirmation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-sand shadow-soft p-6 lg:sticky lg:top-24">
            {confirmed ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-gold text-sm font-semibold tracking-widest uppercase">Booking confirmed</p>
                <p className="mt-3 font-display text-3xl font-bold text-forest">{confirmed.ref}</p>
                <p className="mt-1 text-sm text-slate-500">Show this reference at the venue.</p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-slate-500">Venue</dt><dd className="font-medium text-right">{confirmed.venueName}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Court</dt><dd className="font-medium text-right">{confirmed.courtName}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Day</dt><dd className="font-medium text-right">{confirmed.dateLabel}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Time</dt><dd className="font-medium text-right">{formatHour(confirmed.startHour)} – {formatHour(confirmed.endHour)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-500">Players</dt><dd className="font-medium text-right">{confirmed.players}</dd></div>
                  <div className="flex justify-between border-t border-cream pt-2"><dt className="text-slate-500">Total</dt><dd className="font-bold text-forest">{formatPKR(confirmed.price)}</dd></div>
                </dl>
                <Link
                  to="/bookings"
                  className="block mt-6 text-center bg-forest text-white font-medium py-3 rounded-xl hover:bg-forest-light transition"
                >
                  View my bookings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(null)
                    setStartHour(null)
                  }}
                  className="block w-full mt-2 text-center text-sm text-slate-500 hover:text-forest py-2 transition"
                >
                  Book another slot
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleConfirm}>
                <h2 className="font-display text-2xl font-bold text-forest">Your booking</h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Court</span><span className="font-medium">{court.name}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Day</span><span className="font-medium">{dateLabelOf(selectedDay)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Time</span><span className="font-medium">{startHour === null ? '—' : `${formatHour(startHour)} – ${formatHour(endHour)}`}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Rate</span><span className="font-medium">{formatPKR(court.pricePerHour)} /hour</span></div>
                  <div className="flex justify-between border-t border-cream pt-2"><span className="text-slate-500">Total</span><span className="font-bold text-forest">{formatPKR(price)}</span></div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="border border-sand rounded-xl px-4 py-3 outline-none focus:border-gold text-sm"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number, e.g. 03xx-xxxxxxx"
                    className="border border-sand rounded-xl px-4 py-3 outline-none focus:border-gold text-sm"
                  />
                  <div className="flex items-center gap-3">
                    <label htmlFor="players" className="text-sm text-slate-500">Players</label>
                    <input
                      id="players"
                      type="number"
                      min={1}
                      max={30}
                      value={players}
                      onChange={(e) => setPlayers(Number(e.target.value))}
                      className="border border-sand rounded-xl px-4 py-2.5 w-24 outline-none focus:border-gold text-sm"
                    />
                  </div>
                </div>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  className="mt-5 w-full bg-forest text-white font-medium py-3 rounded-xl hover:bg-forest-light transition"
                >
                  Confirm booking · {formatPKR(price)}
                </button>
                <p className="mt-3 text-xs text-slate-400 text-center">
                  Pay at the venue. Your booking is saved on this device.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
