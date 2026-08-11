// ── Events ───────────────────────────────────
// status: 'LIVE' | 'UPCOMING' | 'CONCLUDED' (optional — omit for no indicator)
// registrationLink: URL string (optional — omit or set null to show "EVENT CONCLUDED" passive state)

export const EVENTS = [
  {
    id: 0,
    title: 'Sky Gazing Camp',
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900',
    date: '12 // FEB // 2025',
    coords: "RA 05h 34m // DEC +22° 01'",
    desc: 'An immersive overnight field session under pristine dark skies. Members track deep-sky objects, practice star-hopping, and log raw observational data.',
    status: 'CONCLUDED',
  },
  {
    id: 1,
    title: 'Telescope Lab Night',
    img: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?q=80&w=900',
    date: '05 // MAR // 2025',
    coords: "RA 12h 00m // DEC +35° 15'",
    desc: "Weekly hands-on calibration sessions covering collimation, polar alignment, and astrophotography with PAC's 8-inch Dobsonian reflectors.",
    status: 'CONCLUDED',
  },
  {
    id: 2,
    title: 'Astrophysics Seminar',
    img: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=900',
    date: '18 // APR // 2025',
    coords: "RA 17h 45m // DEC -29° 00'",
    desc: 'Guest faculty deep-dives on gravitational waves, exoplanet atmospheres, and dark matter — streamed live and open to all club members.',
    status: 'UPCOMING',
    registrationLink: 'https://forms.gle/YOUR_SEMINAR_FORM',
  },
  {
    id: 3,
    title: 'Cosmic Hackathon',
    img: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=900',
    date: '24 // MAY // 2025',
    coords: "RA 00h 42m // DEC +41° 16'",
    desc: 'A 24-hour open science sprint: analyze real NASA datasets, build sky-survey algorithms, and present findings to faculty judges.',
    status: 'LIVE',
    registrationLink: 'https://forms.gle/YOUR_HACKATHON_FORM',
  },
  {
    id: 4,
    title: 'new event ',
    img: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=900',
    date: '27 // JUNE // 2025',
    coords: "RA 00h 42m // DEC +41° 16'",
    desc: 'A 24-hour open science sprint: analyze real NASA datasets, build sky-survey algorithms, and present findings to faculty judges.',
    status: 'LIVE',
    registrationLink: 'https://forms.gle/YOUR_HACKATHON_FORM',
  },
];
