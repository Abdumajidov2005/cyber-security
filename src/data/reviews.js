const names = [
  'Sardor N.', 'Alisher S.', 'Nodira K.', 'Jasur T.', 'Dilnoza Y.',
  'Bobur M.', 'Malika T.', 'Feruza H.', 'Otabek Y.', 'Zulfiya N.',
];
const courses = [
  { slug: 'sql-injection', title: 'SQL Injection Mastery' },
  { slug: 'xss-attacks', title: 'XSS Attacks' },
  { slug: 'web-app-pentest', title: 'Web App Pentest' },
  { slug: 'network-scanning', title: 'Network Scanning' },
  { slug: 'malware-analysis', title: 'Malware Analysis' },
];
const comments = [
  "Juda yaxshi kurs, ko'p narsani o'rgandim!",
  "Instructor tushuntirishi aniq va tushunarli.",
  "Amaliy mashqlar juda foydali bo'ldi.",
  "Kurs materiallari yangilangan va dolzarb.",
  "Bir oz murakkab, lekin juda qiziqarli.",
  "Har bir dars puxta tayyorlangan.",
  "Sertifikat olish uchun zo'r kurs.",
  "Haqiqiy loyihalarda qo'llash mumkin bo'lgan bilimlar.",
  "Video sifati va audio juda yaxshi.",
  "Kursni tugatgach o'zimni professional his qildim.",
];

export const mockReviews = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 2, 1);
  d.setDate(d.getDate() - Math.floor(Math.random() * 60));
  return {
    id: `REV-${String(i + 1).padStart(3, '0')}`,
    user: names[i % names.length],
    course: courses[i % courses.length],
    rating: Math.floor(Math.random() * 2) + 4,
    comment: comments[i % comments.length],
    date: d.toISOString().split('T')[0],
    status: i % 5 === 0 ? 'pending' : i % 7 === 0 ? 'hidden' : 'approved',
  };
});

// Rating distribution per course (1-5 stars)
export const ratingDistribution = {
  'sql-injection': [5, 12, 28, 89, 178],
  'xss-attacks': [3, 8, 19, 67, 134],
  'web-app-pentest': [2, 6, 15, 54, 112],
  'network-scanning': [4, 9, 22, 71, 143],
  'malware-analysis': [1, 5, 11, 43, 98],
};
