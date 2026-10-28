export const SPORTS = ['Padel', 'Indoor Cricket', 'Badminton', 'Futsal', 'Squash', 'Table Tennis']

export const venues = [
  {
    id: 'emerald-padel-club',
    name: 'Emerald Padel Club',
    area: 'F-7 Markaz',
    city: 'Islamabad',
    rating: 4.9,
    reviews: 312,
    hours: '6:00 AM – 11:00 PM',
    gradient: ['#0F3D2E', '#1B6B4F'],
    pattern: 'rings',
    description:
      'A premium padel destination with panoramic glass courts, professional coaching and a relaxed lounge for players between games.',
    amenities: ['Pro shop', 'Changing rooms', 'Café', 'Free parking', 'Coaching'],
    sports: [
      { sport: 'Padel', pricePerHour: 4200 },
      { sport: 'Squash', pricePerHour: 2200 },
    ],
    courts: [
      { id: 'epc-p1', name: 'Padel Court 1', sport: 'Padel', pricePerHour: 4200, surface: 'Panoramic glass' },
      { id: 'epc-p2', name: 'Padel Court 2', sport: 'Padel', pricePerHour: 4200, surface: 'Panoramic glass' },
      { id: 'epc-s1', name: 'Squash Court A', sport: 'Squash', pricePerHour: 2200, surface: 'Maple wood' },
    ],
  },
  {
    id: 'the-pavilion-arena',
    name: 'The Pavilion Arena',
    area: 'I-8 Markaz',
    city: 'Islamabad',
    rating: 4.8,
    reviews: 428,
    hours: '6:00 AM – 11:00 PM',
    gradient: ['#14532D', '#2E7D4F'],
    pattern: 'lines',
    description:
      'A large indoor arena built for serious games — full-size cricket halls under floodlights and a fast futsal court with a live scoreboard.',
    amenities: ['Floodlights', 'Scoreboard', 'Team dugouts', 'Café', 'Free parking'],
    sports: [
      { sport: 'Indoor Cricket', pricePerHour: 7500 },
      { sport: 'Futsal', pricePerHour: 5500 },
    ],
    courts: [
      { id: 'tpa-c1', name: 'Cricket Hall 1', sport: 'Indoor Cricket', pricePerHour: 7500, surface: 'Indoor turf' },
      { id: 'tpa-c2', name: 'Cricket Hall 2', sport: 'Indoor Cricket', pricePerHour: 7500, surface: 'Indoor turf' },
      { id: 'tpa-f1', name: 'Futsal Court', sport: 'Futsal', pricePerHour: 5500, surface: 'Synthetic turf' },
    ],
  },
  {
    id: 'shuttle-house',
    name: 'Shuttle House',
    area: 'G-9 Markaz',
    city: 'Islamabad',
    rating: 4.7,
    reviews: 265,
    hours: '7:00 AM – 11:00 PM',
    gradient: ['#0C4A3E', '#17805F'],
    pattern: 'dots',
    description:
      'A friendly neighbourhood club for racket lovers, with well-kept badminton courts and table tennis tables for casual and competitive play.',
    amenities: ['Racket rental', 'Changing rooms', 'Drinking water', 'Free parking'],
    sports: [
      { sport: 'Badminton', pricePerHour: 1600 },
      { sport: 'Table Tennis', pricePerHour: 1000 },
    ],
    courts: [
      { id: 'sh-b1', name: 'Badminton Court 1', sport: 'Badminton', pricePerHour: 1600, surface: 'Wooden sprung floor' },
      { id: 'sh-b2', name: 'Badminton Court 2', sport: 'Badminton', pricePerHour: 1600, surface: 'Wooden sprung floor' },
      { id: 'sh-b3', name: 'Badminton Court 3', sport: 'Badminton', pricePerHour: 1600, surface: 'Wooden sprung floor' },
      { id: 'sh-t1', name: 'Table Tennis Table 1', sport: 'Table Tennis', pricePerHour: 1000, surface: 'Tournament table' },
      { id: 'sh-t2', name: 'Table Tennis Table 2', sport: 'Table Tennis', pricePerHour: 1000, surface: 'Tournament table' },
    ],
  },
  {
    id: 'futsal-factory',
    name: 'Futsal Factory',
    area: 'Bahria Town Phase 7',
    city: 'Rawalpindi',
    rating: 4.6,
    reviews: 198,
    hours: '6:00 AM – 11:00 PM',
    gradient: ['#1A3C34', '#3A7D5D'],
    pattern: 'diamonds',
    description:
      'A high-energy indoor complex where futsal leagues meet weekend padel sessions, with a viewing gallery for friends and family.',
    amenities: ['Viewing gallery', 'Team kits on hire', 'Café', 'Free parking', 'League nights'],
    sports: [
      { sport: 'Futsal', pricePerHour: 4800 },
      { sport: 'Padel', pricePerHour: 3800 },
    ],
    courts: [
      { id: 'ff-f1', name: 'Futsal Arena', sport: 'Futsal', pricePerHour: 4800, surface: 'Synthetic turf' },
      { id: 'ff-p1', name: 'Padel Court 1', sport: 'Padel', pricePerHour: 3800, surface: 'Panoramic glass' },
    ],
  },
  {
    id: 'creek-cricket-dome',
    name: 'Creek Cricket Dome',
    area: 'DHA Phase 2',
    city: 'Islamabad',
    rating: 4.8,
    reviews: 354,
    hours: '6:00 AM – 11:00 PM',
    gradient: ['#123B2A', '#1E6B4A'],
    pattern: 'rings',
    description:
      'A modern dome for indoor cricket with netted halls and practice lanes, plus badminton courts for a lighter evening game.',
    amenities: ['Nets and bowling machine', 'Scoreboard', 'Changing rooms', 'Café', 'Free parking'],
    sports: [
      { sport: 'Indoor Cricket', pricePerHour: 6800 },
      { sport: 'Badminton', pricePerHour: 1800 },
    ],
    courts: [
      { id: 'ccd-c1', name: 'Cricket Dome Hall', sport: 'Indoor Cricket', pricePerHour: 6800, surface: 'Indoor turf' },
      { id: 'ccd-b1', name: 'Badminton Court 1', sport: 'Badminton', pricePerHour: 1800, surface: 'Wooden sprung floor' },
      { id: 'ccd-b2', name: 'Badminton Court 2', sport: 'Badminton', pricePerHour: 1800, surface: 'Wooden sprung floor' },
    ],
  },
  {
    id: 'smash-court-centre',
    name: 'Smash Court Centre',
    area: 'Saddar',
    city: 'Rawalpindi',
    rating: 4.5,
    reviews: 176,
    hours: '7:00 AM – 10:00 PM',
    gradient: ['#0E3B33', '#2F7D62'],
    pattern: 'lines',
    description:
      'A classic city-centre club offering squash, table tennis and badminton at honest prices, popular with students and office teams.',
    amenities: ['Racket rental', 'Drinking water', 'Lockers', 'Coaching'],
    sports: [
      { sport: 'Squash', pricePerHour: 1800 },
      { sport: 'Table Tennis', pricePerHour: 900 },
      { sport: 'Badminton', pricePerHour: 1400 },
    ],
    courts: [
      { id: 'scc-s1', name: 'Squash Court 1', sport: 'Squash', pricePerHour: 1800, surface: 'Plaster wall' },
      { id: 'scc-s2', name: 'Squash Court 2', sport: 'Squash', pricePerHour: 1800, surface: 'Plaster wall' },
      { id: 'scc-t1', name: 'Table Tennis Table 1', sport: 'Table Tennis', pricePerHour: 900, surface: 'Tournament table' },
      { id: 'scc-b1', name: 'Badminton Court 1', sport: 'Badminton', pricePerHour: 1400, surface: 'Wooden sprung floor' },
    ],
  },
  {
    id: 'padel-point',
    name: 'Padel Point',
    area: 'E-11',
    city: 'Islamabad',
    rating: 4.9,
    reviews: 289,
    hours: '6:00 AM – 11:00 PM',
    gradient: ['#123F2C', '#8A6D2B'],
    pattern: 'dots',
    description:
      'Islamabad’s padel-first club with championship-standard courts, evening social games and a rooftop café overlooking the Margalla Hills.',
    amenities: ['Rooftop café', 'Coaching', 'Pro shop', 'Changing rooms', 'Free parking'],
    sports: [
      { sport: 'Padel', pricePerHour: 4500 },
      { sport: 'Futsal', pricePerHour: 5200 },
    ],
    courts: [
      { id: 'pp-p1', name: 'Padel Court 1', sport: 'Padel', pricePerHour: 4500, surface: 'Panoramic glass' },
      { id: 'pp-p2', name: 'Padel Court 2', sport: 'Padel', pricePerHour: 4500, surface: 'Panoramic glass' },
      { id: 'pp-f1', name: 'Futsal Court', sport: 'Futsal', pricePerHour: 5200, surface: 'Synthetic turf' },
    ],
  },
  {
    id: 'rally-zone',
    name: 'Rally Zone',
    area: 'Satellite Town',
    city: 'Rawalpindi',
    rating: 4.6,
    reviews: 221,
    hours: '7:00 AM – 11:00 PM',
    gradient: ['#173F31', '#2E6B52'],
    pattern: 'diamonds',
    description:
      'A welcoming multi-sport hall for families and friends — table tennis tables, badminton courts and squash courts under one roof.',
    amenities: ['Family lounge', 'Racket rental', 'Drinking water', 'Free parking'],
    sports: [
      { sport: 'Table Tennis', pricePerHour: 1100 },
      { sport: 'Badminton', pricePerHour: 1500 },
      { sport: 'Squash', pricePerHour: 2000 },
    ],
    courts: [
      { id: 'rz-t1', name: 'Table Tennis Table 1', sport: 'Table Tennis', pricePerHour: 1100, surface: 'Tournament table' },
      { id: 'rz-t2', name: 'Table Tennis Table 2', sport: 'Table Tennis', pricePerHour: 1100, surface: 'Tournament table' },
      { id: 'rz-b1', name: 'Badminton Court 1', sport: 'Badminton', pricePerHour: 1500, surface: 'Wooden sprung floor' },
      { id: 'rz-s1', name: 'Squash Court 1', sport: 'Squash', pricePerHour: 2000, surface: 'Plaster wall' },
    ],
  },
]

export function priceFrom(venue) {
  return Math.min(...venue.sports.map((s) => s.pricePerHour))
}
