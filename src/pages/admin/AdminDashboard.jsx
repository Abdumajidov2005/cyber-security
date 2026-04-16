import React from 'react';
import { DollarSign, Users, BookOpen, UserPlus } from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { RevenueChart } from '../../components/admin/RevenueChart';
import { EnrollmentChart, TopCoursesChart } from '../../components/admin/EnrollmentChart';
import { ActivityFeed } from '../../components/admin/ActivityFeed';
import { adminStats, revenueData, enrollmentByCategory, topCourses, activityFeed } from '../../data/admin';

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`${(adminStats.totalRevenue / 1000000).toFixed(1)}M`}
          prefix=""
          suffix=" so'm"
          change={adminStats.revenueChange}
          icon={DollarSign}
        />
        <StatCard
          title="Active Users"
          value={adminStats.activeUsers}
          change={adminStats.usersChange}
          icon={Users}
        />
        <StatCard
          title="Total Enrollments"
          value={adminStats.totalEnrollments}
          change={adminStats.enrollmentsChange}
          icon={BookOpen}
        />
        <StatCard
          title="New Users Today"
          value={adminStats.newUsersToday}
          change={adminStats.newUsersTodayChange}
          icon={UserPlus}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RevenueChart data={revenueData} />
        <EnrollmentChart data={enrollmentByCategory} />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TopCoursesChart data={topCourses} />
        <ActivityFeed items={activityFeed} />
      </div>
    </div>
  );
}
