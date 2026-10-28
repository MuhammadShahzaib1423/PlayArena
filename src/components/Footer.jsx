import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-ivory/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold text-ivory">
            Play<span className="text-gold-light">Arena</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Indoor sports booking for Rawalpindi and Islamabad — padel, cricket, badminton, futsal, squash and table
            tennis, all in one calm, easy place.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ivory tracking-wide">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-gold-light transition">Home</Link>
            </li>
            <li>
              <Link to="/bookings" className="hover:text-gold-light transition">My Bookings</Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-gold-light transition">Favourites</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ivory tracking-wide">About this site</p>
          <p className="mt-3 text-sm leading-relaxed">
            All venues listed on PlayArena are fictional demo venues created to showcase the booking experience.
          </p>
          <p className="mt-4 text-sm">
            Built by{' '}
            <a
              href="https://shahzaib-portfolio-muhammad-shahzaibs-projects-16858ef3.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-gold-light font-medium hover:underline"
            >
              Muhammad Shahzaib
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-ivory/50">
          © {new Date().getFullYear()} PlayArena. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
