import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cancelBooking, formatHour, formatPKR, getBookings } from '../lib/bookings'

export default function Bookings() {
  const [bookings, setBookings] = useState(() => getBookings())
  const [confirmRef, setConfirmRef] = useState(null)

  const handleCancel = (ref) => {
    cancelBooking(ref)
    setBookings(getBookings())
    setConfirmRef(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest">My Bookings</h1>
      <p className="mt-2 text-slate-500">
        Bookings saved on this device. Show your booking reference at the venue.
      </p>

      {bookings.length === 0 ? (
        <div className="mt-8 bg-white rounded-2xl border border-sand p-10 text-center">
          <p className="font-display text-2xl font-bold text-forest">No bookings yet</p>
          <p className="mt-2 text-slate-500 text-sm">Find a court and confirm your first game.</p>
          <Link
            to="/"
            className="inline-block mt-5 bg-forest text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-forest-light transition"
          >
            Browse venues
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {bookings.map((b) => (
            <article key={b.ref} className="bg-white rounded-2xl border border-sand shadow-soft p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-forest">{b.venueName}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {b.area}, {b.city}
                  </p>
                </div>
                <span className="shrink-0 bg-cream text-forest text-sm font-bold px-3 py-1.5 rounded-full">{b.ref}</span>
              </div>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-slate-500">Court</dt><dd className="font-medium">{b.courtName} · {b.sport}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Day</dt><dd className="font-medium">{b.dateLabel}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Time</dt><dd className="font-medium">{formatHour(b.startHour)} – {formatHour(b.endHour)}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Booked for</dt><dd className="font-medium">{b.name} · {b.players} {b.players === 1 ? 'player' : 'players'}</dd></div>
                <div className="flex justify-between border-t border-cream pt-2"><dt className="text-slate-500">Total</dt><dd className="font-bold text-forest">{formatPKR(b.price)}</dd></div>
              </dl>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  to={`/venues/${b.venueId}`}
                  className="text-sm font-medium text-forest border border-sand px-4 py-2 rounded-full hover:border-gold transition"
                >
                  View venue
                </Link>
                {confirmRef === b.ref ? (
                  <span className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCancel(b.ref)}
                      className="text-sm font-medium text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition"
                    >
                      Yes, cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmRef(null)}
                      className="text-sm text-slate-500 hover:text-forest transition"
                    >
                      Keep it
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmRef(b.ref)}
                    className="text-sm font-medium text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition"
                  >
                    Cancel booking
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
