// Revenue chart data — last 30 days
export const revenueData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 2, i + 15);
  return {
    date: `${date.getMonth() + 1}/${date.getDate()}`,
    revenue: Math.floor(Math.random() * 4000000) + 1500000,
  };
});

// Enrollments by category
export const enrollmentByCategory = [
  { category: 'Pentest', enrollments: 2840 },
  { category: 'Malware', enrollments: 1620 },
  { category: 'Network', enrollments: 1980 },
  { category: 'Crypto', enrollments: 1240 },
  { category: 'Blue Team', enrollments: 2190 },
];

// Top 5 courses by enrollment
export const topCourses = [
  { title: 'Web App Pentest', enrollments: 1240 },
  { title: 'SQL Injection Mastery', enrollments: 980 },
  { title: 'XSS Attacks', enrollments: 870 },
  { title: 'Network Scanning', enrollments: 760 },
  { title: 'Malware Analysis', enrollments: 640 },
];

// Stats
export const adminStats = {
  totalRevenue: 84500000,
  revenueChange: 12,
  activeUsers: 4230,
  usersChange: 8,
  totalEnrollments: 9870,
  enrollmentsChange: 15,
  newUsersToday: 47,
  newUsersTodayChange: 5,
};

// Activity feed
export const activityFeed = [
  { id: 1, icon: 'enroll', text: "Alisher S. enrolled in Web App Pentest", time: '2 min ago' },
  { id: 2, icon: 'review', text: "New review on SQL Injection course", time: '8 min ago' },
  { id: 3, icon: 'payment', text: "Payment received: 249,000 so'm", time: '15 min ago' },
  { id: 4, icon: 'enroll', text: "Nodira K. enrolled in XSS Attacks", time: '22 min ago' },
  { id: 5, icon: 'user', text: "New user registered: Jasur Toshmatov", time: '35 min ago' },
  { id: 6, icon: 'payment', text: "Payment received: 199,000 so'm", time: '41 min ago' },
  { id: 7, icon: 'review', text: "New review on Network Scanning course", time: '1h ago' },
  { id: 8, icon: 'enroll', text: "Bobur M. enrolled in Malware Analysis", time: '1h 12m ago' },
  { id: 9, icon: 'payment', text: "Payment received: 349,000 so'm", time: '1h 30m ago' },
  { id: 10, icon: 'user', text: "New user registered: Dilnoza Yusupova", time: '2h ago' },
];

// Mock users list
export const mockUsers = [
  { id: 'u1', name: 'Sardor Nazarov', email: 'sardor@example.com', role: 'student', joined: '2024-01-15', enrollments: 4, status: 'active', avatar: null },
  { id: 'u2', name: 'Alisher Sobirov', email: 'alisher@example.com', role: 'student', joined: '2024-02-03', enrollments: 2, status: 'active', avatar: null },
  { id: 'u3', name: 'Nodira Karimova', email: 'nodira@example.com', role: 'instructor', joined: '2023-11-20', enrollments: 0, status: 'active', avatar: null },
  { id: 'u4', name: 'Jasur Toshmatov', email: 'jasur@example.com', role: 'student', joined: '2024-04-10', enrollments: 1, status: 'active', avatar: null },
  { id: 'u5', name: 'Dilnoza Yusupova', email: 'dilnoza@example.com', role: 'student', joined: '2024-04-12', enrollments: 0, status: 'active', avatar: null },
  { id: 'u6', name: 'Bobur Mirzayev', email: 'bobur@example.com', role: 'student', joined: '2024-03-05', enrollments: 3, status: 'banned', avatar: null },
  { id: 'u7', name: 'Azizbek Karimov', email: 'azizbek@example.com', role: 'instructor', joined: '2023-09-01', enrollments: 0, status: 'active', avatar: null },
  { id: 'u8', name: 'Malika Tursunova', email: 'malika@example.com', role: 'student', joined: '2024-01-28', enrollments: 5, status: 'active', avatar: null },
  { id: 'u9', name: 'Sherzod Rakhimov', email: 'sherzod@example.com', role: 'admin', joined: '2023-06-01', enrollments: 0, status: 'active', avatar: null },
  { id: 'u10', name: 'Feruza Hasanova', email: 'feruza@example.com', role: 'student', joined: '2024-02-19', enrollments: 2, status: 'active', avatar: null },
  { id: 'u11', name: 'Otabek Yuldashev', email: 'otabek@example.com', role: 'student', joined: '2024-03-22', enrollments: 1, status: 'active', avatar: null },
  { id: 'u12', name: 'Zulfiya Normatova', email: 'zulfiya@example.com', role: 'instructor', joined: '2023-12-10', enrollments: 0, status: 'active', avatar: null },
];
