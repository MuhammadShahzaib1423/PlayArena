import { Link } from 'react-router-dom'
import { venues } from '../data/venues'
import { useFavorites } from '../lib/bookings'
import VenueCard from '../components/VenueCard'

export default function Favorites() {
  const { ids, toggle, has } = useFavorites()
  const favorites = venues.filter((v) => ids.includes(v.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest">Favourites</h1>
      <p className="mt-2 text-slate-500">Venues you saved with the heart. Saved on this device.</p>

      {favorites.length === 0 ? (
        <div className="mt-8 bg-white rounded-2xl border border-sand p-10 text-center">
          <p className="font-display text-2xl font-bold text-forest">No favourites yet</p>
          <p className="mt-2 text-slate-500 text-sm">Tap the heart on any venue card to save it here.</p>
          <Link
            to="/"
            className="inline-block mt-5 bg-forest text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-forest-light transition"
          >
            Browse venues
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((venue, i) => (
            <VenueCard key={venue.id} venue={venue} index={i} isFavorite={has(venue.id)} onToggleFavorite={toggle} />
          ))}
        </div>
      )}
    </div>
  )
}
