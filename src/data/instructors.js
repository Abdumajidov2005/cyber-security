export const instructors = [
  {
    id: 'azizbek-karimov',
    name: 'Azizbek Karimov',
    title: 'Senior Penetration Tester',
    bio: 'OSCP, CEH, and CISSP certified security professional with 8+ years of experience in offensive security. Former red team lead at a Fortune 500 company. Has discovered 200+ CVEs and participated in bug bounty programs for Google, Microsoft, and Meta.',
    courses: 4,
    students: 3090,
    rating: 4.85,
    avatar: null,
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: 'dilnoza-yusupova',
    name: 'Dilnoza Yusupova',
    title: 'SOC Lead & Threat Intelligence Analyst',
    bio: 'Blue team specialist with expertise in SIEM, threat hunting, and incident response. GCIH and GCIA certified. Previously worked as a SOC analyst at a major financial institution, handling 500+ security incidents per month.',
    courses: 3,
    students: 2425,
    rating: 4.77,
    avatar: null,
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: 'jasur-toshmatov',
    name: 'Jasur Toshmatov',
    title: 'Malware Analyst & Reverse Engineer',
    bio: 'Specializes in malware analysis, reverse engineering, and exploit development. GREM and GXPN certified. Has analyzed thousands of malware samples for government agencies and published research on APT groups. CTF champion with multiple international wins.',
    courses: 5,
    students: 1320,
    rating: 4.92,
    avatar: null,
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
];

export const getInstructorById = (id) => instructors.find((i) => i.id === id);
