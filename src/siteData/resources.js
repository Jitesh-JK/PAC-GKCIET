// ── Resources (Resource Portal) ──────────────────────────────────────

// Meeting archive — left column
// img: optional — omit to show fallback dark canvas
// description: optional — omit to hide the center body entirely
// downloadLinks: each key is optional — only present keys render a pill + download action
export const SESSIONS = [
  {
    id: 1,
    title: 'Session 01 // Introduction to Astrophysics & PAC Charter',
    img: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=700',
    description:
      'Foundational overview of PAC mission scope, observational workflows, and the club charter for new members.',
    downloadLinks: {
      pptx: 'https://docs.google.com/presentation/d/17RGiFStG1jvqqjkjVxMPYqYzbEGJDHCK/edit?usp=drive_link&ouid=117801833434380744429&rtpof=true&sd=true',
    },
    date: '14 Jan 2026',
  },
  {
    id: 2,
    title: "Session 02 // Gravitational Wave Detection",
    img: 'public/archive/gravitational.jpeg',
    // description:
    //   'LIGO signal analysis, chirp templates, and multi-messenger follow-up strategies for compact binary mergers.',
    downloadLinks: {
      pdf: 'https://drive.google.com/file/d/1kgMxVNQ0OmlPbiLhD0YcGFanJjqSSgLX/view?usp=drive_link',
    },
    date: '12 Feb 2026',
  },
  {
    id: 3,
    title: 'Session 03 // Staring the Starlight',
    img: 'public/archive/stars.jpeg',
    downloadLinks: {
      pptx: 'https://docs.google.com/presentation/d/1NlD8gYiQtKN-IHrQyqjsmOnydh01ybP8/edit?usp=drive_link&ouid=117801833434380744429&rtpof=true&sd=true'
    },
    date: '13 June 2025',
  },
  // {
  //   id: 4,
  //   title: 'Session 04 // Telescope Optics & Focal Length Ratios',
  //   img: 'https://images.unsplash.com/photo-1532978379173-523e16f371f2?q=80&w=700',
  //   downloadLinks: {
  //     pdf: '/files/session-04.pdf',
  //   },
  //   date: 'OCT 2025',
  // },
  // {
  //   id: 5,
  //   title: 'Session 05 // Spectroscopy & Emission Line Analysis',
  //   img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=700',
  //   downloadLinks: {
  //     pptx: '/files/session-05.pptx',
  //     pdf: '/files/session-05.pdf',
  //   },
  //   date: 'NOV 2025',
  // },
  // {
  //   id: 6,
  //   title: 'Session 06 // Pulsar Timing & Dispersion Measures',
  //   img: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=700',
  //   downloadLinks: {
  //     pptx: '/files/session-06.pptx',
  //     pdf: '/files/session-06.pdf',
  //   },
  //   date: 'DEC 2025',
  // }
];

// Monthly research papers — right column
// img: optional — omit to show fallback dark canvas
// abstract: optional — omit to keep compact layout; present to show a summary line
// downloadLinks: each key is optional — only present keys render a pill + download action
export const MONTHLY_PAPERS = [
  {
    id: 1,
    month: 'JAN',
    year: '2026',
    img: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=400',
    abstract: 'Multi-messenger astronomy and the detection of gravitational wave counterparts in optical transient surveys.',
    downloadLinks: {
      pdf: '/files/session-06.pdf',
    }
  },
  {
    id: 2,
    month: 'FEB',
    year: '2026',
    img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=400',
    abstract: 'JWST early-universe morphological analysis of high-z galaxy clusters at redshift z > 10.',
  },
  {
    id: 3,
    month: 'MARCH',
    year: '2026',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400',
    abstract: 'Constraining dark matter halo profiles using stellar velocity dispersions in dwarf spheroidal galaxies.',
  },
  {
    id: 4,
    month: 'APRIL',
    year: '2026',
    img: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=400',
    abstract: 'Exoplanet atmospheric retrieval via TRAPPIST-1 transmission spectroscopy data pipeline processing.',
  },
  {
    id: 5,
    month: 'MAY',
    year: '2026',
    img: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=400',
    abstract: 'Simulating neutron star mergers: r-process nucleosynthesis in relativistic MHD computational frameworks.',
  },
  // {
  //   id: 6,
  //   month: 'JUL',
  //   year: '2025',
  //   img: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=400',
  // },
  // {
  //   id: 7,
  //   month: 'JUN',
  //   year: '2025',
  //   img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=400',
  // },
  // {
  //   id: 8,
  //   month: 'MAY',
  //   year: '2025',
  //   img: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=400',
  // },
  // {
  //   id: 9,
  //   month: 'APR',
  //   year: '2025',
  //   img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400',
  // },
  // {
  //   id: 10,
  //   month: 'MAR',
  //   year: '2025',
  //   img: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?q=80&w=400',
  // },
  // {
  //   id: 11,
  //   month: 'FEB',
  //   year: '2025',
  //   img: 'https://images.unsplash.com/photo-1532978379173-523e16f371f2?q=80&w=400',
  // },
  // {
  //   id: 12,
  //   month: 'JAN',
  //   year: '2025',
  //   img: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=400',
  // },
];

// Contact & systems interface (footer of Resource Portal)
// Each field is optional — remove or set to empty string to hide that contact button.
export const CONTACT = {
  name: 'Jitesh Kumar Gouda',
  title: 'Systems Handler',
  linkedin: 'https://www.linkedin.com/company/physics-astronomy-club-gkciet-pac/posts/?feedView=all&viewAsMember=true',
  email: 'jiteshkumargouda33@gmail.com',
  phone: '+91 9485170200',
};
