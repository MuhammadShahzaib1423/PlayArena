import { useState } from 'react'

const BOOKINGS_KEY = 'playarena_bookings'
const FAVORITES_KEY = 'playarena_favorites'

const REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || []
  } catch {
    return []
  }
}

export function addBooking(booking) {
  const ref =
    'PA-' +
    Array.from({ length: 6 }, () => REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)]).join('')
  const record = { ...booking, ref, status: 'confirmed', createdAt: new Date().toISOString() }
  const all = getBookings()
  all.unshift(record)
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(all))
  return record
}

export function cancelBooking(ref) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(getBookings().filter((b) => b.ref !== ref)))
}

export function getFavoriteIds() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []
  } catch {
    return []
  }
}

export function toggleFavorite(id) {
  const ids = getFavoriteIds()
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
  return next
}

export function useFavorites() {
  const [ids, setIds] = useState(() => getFavoriteIds())
  const toggle = (id) => {
    setIds(toggleFavorite(id))
  }
  const has = (id) => ids.includes(id)
  return { ids, toggle, has }
}

export function formatHour(hour24) {
  const hour = hour24 % 24
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:00 ${suffix}`
}

export const SLOT_START_HOURS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

export function nextDays(count = 7) {
  const days = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    days.push(d)
  }
  return days
}

export function dateKeyOf(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function dateLabelOf(date) {
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatPKR(amount) {
  return `PKR ${amount.toLocaleString('en-US')}`
}
