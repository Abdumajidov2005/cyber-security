const providers = ['Click', 'Payme', 'Stripe'];
const statuses = ['success', 'pending', 'failed', 'refunded'];
const courses = [
  'SQL Injection Mastery', 'XSS Attacks', 'Web App Pentest',
  'Network Scanning', 'Malware Analysis', 'Cryptography Basics',
  'Blue Team Fundamentals', 'Reverse Engineering',
];
const users = [
  'Sardor Nazarov', 'Alisher Sobirov', 'Nodira Karimova',
  'Jasur Toshmatov', 'Dilnoza Yusupova', 'Bobur Mirzayev',
  'Malika Tursunova', 'Feruza Hasanova', 'Otabek Yuldashev',
];
const amounts = [199000, 249000, 299000, 349000, 399000, 449000, 499000];

export const mockPayments = Array.from({ length: 50 }, (_, i) => {
  const d = new Date(2026, 2, 1);
  d.setDate(d.getDate() - Math.floor(Math.random() * 90));
  return {
    id: `PAY-${String(i + 1).padStart(4, '0')}`,
    user: users[i % users.length],
    course: courses[i % courses.length],
    amount: amounts[i % amounts.length],
    provider: providers[i % providers.length],
    status: i % 10 === 3 ? 'failed' : i % 10 === 7 ? 'refunded' : i % 10 === 5 ? 'pending' : 'success',
    date: d.toISOString().split('T')[0],
  };
});
