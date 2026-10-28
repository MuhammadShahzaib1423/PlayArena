import { useId } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatPKR } from '../lib/bookings'
import { priceFrom } from '../data/venues'

function PatternDefs({ id, pattern }) {
  if (pattern === 'dots') {
    return (
      <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="2" fill="rgba(255,255,255,0.20)" />
      </pattern>
    )
  }
  if (pattern === 'lines') {
    return (
      <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M0 28 L28 0" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      </pattern>
    )
  }
  if (pattern === 'rings') {
    return (
      <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
        <circle cx="28" cy="28" r="20" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      </pattern>
    )
  }
  return (
    <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M16 3 L29 16 L16 29 L3 16 Z" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
    </pattern>
  )
}

export function VenueVisual({ venue, className = '', children }) {
  const patternId = useId()
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${venue.gradient[0]}, ${venue.gradient[1]})` }}
    >
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <PatternDefs id={patternId} pattern={venue.pattern} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      {children}
    </div>
  )
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#C6A15B" aria-hidden="true">
      <path d="M12 2l2.9 6.26L21.5 9.3l-4.9 4.5 1.3 6.7L12 17.8 6.1 20.5l1.3-6.7L2.5 9.3l6.6-1.04L12 2z" />
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? '#D64545' : 'none'}
      stroke={filled ? '#D64545' : '#94A3B8'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export default function VenueCard({ venue, index = 0, isFavorite, onToggleFavorite }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.05 }}
      className="bg-white rounded-2xl shadow-soft overflow-hidden border border-sand/70 hover:shadow-xl transition-shadow flex flex-col"
    >
      <VenueVisual venue={venue} className="h-44">
        <span className="absolute inset-0 flex items-center justify-center font-display text-[96px] leading-none text-white/15 font-bold select-none">
          {venue.sports[0].sport[0]}
        </span>
        <span className="absolute top-3 left-3 bg-white/95 text-forest text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <StarIcon /> {venue.rating} <span className="text-slate-400 font-normal">({venue.reviews})</span>
        </span>
        <button
          type="button"
          onClick={() => onToggleFavorite && onToggleFavorite(venue.id)}
          aria-label={isFavorite ? 'Remove from favourites' : 'Save to favourites'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow hover:scale-105 transition"
        >
          <HeartIcon filled={!!isFavorite} />
        </button>
        <span className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {venue.sports.map((s) => (
            <span key={s.sport} className="bg-black/25 backdrop-blur text-white text-[11px] px-2 py-0.5 rounded-full">
              {s.sport}
            </span>
          ))}
        </span>
      </VenueVisual>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-xl font-bold text-forest">{venue.name}</h3>
        <p className="text-sm text-slate-500">
          {venue.area}, {venue.city}
        </p>
        <p className="text-sm text-slate-600 line-clamp-2">{venue.description}</p>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-cream">
          <div>
            <span className="text-xs text-slate-400">From</span>
            <p className="font-bold text-forest">
              {formatPKR(priceFrom(venue))}
              <span className="text-xs font-normal text-slate-400"> /hour</span>
            </p>
          </div>
          <Link
            to={`/venues/${venue.id}`}
            className="bg-forest text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-forest-light transition"
          >
            View courts
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
