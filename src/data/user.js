export const mockUser = {
  id: 'user-001',
  name: 'Sardor Nazarov',
  email: 'sardor@example.com',
  avatar: null,
  joinedAt: '2024-01-15',
  streak: 7,
  totalXP: 2450,
  enrolledCourses: ['sql-injection', 'xss-attacks', 'cryptography', 'web-app-pentest'],
  completedCourses: ['sql-injection'],
  certificates: [
    {
      id: 'cert-001',
      courseSlug: 'sql-injection',
      courseTitle: 'SQL Injection Mastery',
      issuedAt: '2024-03-10',
      credentialId: 'CL-2024-SQL-001',
    },
  ],
  progress: {
    'sql-injection': { completed: 18, total: 18, percentage: 100 },
    'xss-attacks': { completed: 4, total: 15, percentage: 27 },
    cryptography: { completed: 2, total: 24, percentage: 8 },
    'web-app-pentest': { completed: 7, total: 64, percentage: 11 },
  },
  recentActivity: [
    { type: 'lesson', courseSlug: 'xss-attacks', lessonTitle: 'DOM-Based XSS', date: '2024-04-09' },
    { type: 'lesson', courseSlug: 'web-app-pentest', lessonTitle: 'Active Scanning with Nmap', date: '2024-04-08' },
    { type: 'certificate', courseSlug: 'sql-injection', date: '2024-03-10' },
  ],
};
