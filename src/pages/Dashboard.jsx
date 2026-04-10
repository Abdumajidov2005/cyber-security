import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Award, Flame, BookOpen, TrendingUp, Play,
  CheckCircle, Clock, Star
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getCourseBySlug } from '../data/courses';
import { Footer } from '../components/layout/Footer';
import { PageTransition } from '../components/layout/PageTransition';
import { useScrollReveal } from '../hooks/useScrollReveal';

function ProgressBar({ percentage }) {
  return (
    <div className="h-1 bg-white/10 w-full">
      <div
        className="h-full bg-accent transition-all duration-700"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  const ref = useScrollReveal({ stagger: true });

  if (!user) return <Navigate to="/login" replace />;

  const enrolledCourses = user.enrolledCourses
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean);

  const completedCount = user.completedCourses?.length || 0;
  const inProgressCount = enrolledCourses.length - completedCount;

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        {/* Header */}
        <div className="border-b border-white/10 py-12 px-6 bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-px bg-accent" />
                  <span className="text-accent text-xs uppercase tracking-[0.3em]">Shaxsiy kabinet</span>
                </div>
                <h1 className="font-display text-5xl tracking-wider">
                  SALOM, {user.name.split(' ')[0].toUpperCase()}
                </h1>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2 border border-accent/30 bg-accent/5 px-4 py-3">
                <Flame size={16} className="text-accent" />
                <div>
                  <div className="font-display text-xl text-accent">{user.streak}</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider">Kun ketma-ket</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Stats */}
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-16">
            {[
              { icon: <BookOpen size={16} />, value: enrolledCourses.length, label: 'Yozilgan kurslar' },
              { icon: <CheckCircle size={16} />, value: completedCount, label: 'Tugatilgan' },
              { icon: <TrendingUp size={16} />, value: inProgressCount, label: 'Jarayonda' },
              { icon: <Award size={16} />, value: user.certificates?.length || 0, label: 'Sertifikatlar' },
            ].map((stat, i) => (
              <div key={i} data-reveal className="bg-bg p-6 hover:bg-surface transition-colors">
                <div className="text-accent mb-3">{stat.icon}</div>
                <div className="font-display text-4xl text-text mb-1">{stat.value}</div>
                <div className="text-muted text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enrolled courses */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl tracking-wider mb-8">KURSLARIM</h2>

              <div className="space-y-4">
                {enrolledCourses.map((course) => {
                  const prog = user.progress?.[course.slug];
                  const isCompleted = user.completedCourses?.includes(course.slug);
                  const firstLesson = course.curriculum[0]?.lessons[0];

                  return (
                    <div
                      key={course.id}
                      className="border border-white/10 bg-surface p-5 hover:border-accent/20 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-display text-lg tracking-wider group-hover:text-accent transition-colors">
                              {course.title}
                            </h3>
                            {isCompleted && (
                              <CheckCircle size={14} className="text-accent shrink-0" />
                            )}
                          </div>
                          <p className="text-muted text-xs">{course.subtitle}</p>
                        </div>

                        <Link
                          to={`/learn/${course.slug}/${firstLesson?.id}`}
                          className="flex items-center gap-1.5 border border-accent/30 text-accent px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-accent/10 transition-colors shrink-0"
                        >
                          <Play size={10} />
                          {isCompleted ? 'Qayta ko\'rish' : 'Davom etish'}
                        </Link>
                      </div>

                      {prog && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-muted mb-2">
                            <span>{prog.completed}/{prog.total || course.lessons} dars</span>
                            <span className="text-accent">{prog.percentage}%</span>
                          </div>
                          <ProgressBar percentage={prog.percentage} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Certificates */}
              <div>
                <h2 className="font-display text-2xl tracking-wider mb-6">SERTIFIKATLAR</h2>
                {user.certificates?.length > 0 ? (
                  <div className="space-y-3">
                    {user.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="border border-accent/20 bg-accent/5 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <Award size={16} className="text-accent mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-text mb-1">{cert.courseTitle}</p>
                            <p className="text-[10px] text-muted uppercase tracking-wider">
                              {cert.credentialId}
                            </p>
                            <p className="text-[10px] text-muted mt-1">
                              {new Date(cert.issuedAt).toLocaleDateString('uz-UZ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-white/10 p-6 text-center">
                    <Award size={24} className="text-muted mx-auto mb-3" />
                    <p className="text-muted text-xs">Hali sertifikat yo'q</p>
                  </div>
                )}
              </div>

              {/* Recent activity */}
              <div>
                <h2 className="font-display text-2xl tracking-wider mb-6">SO'NGGI FAOLLIK</h2>
                <div className="space-y-3">
                  {user.recentActivity?.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-white/5">
                      <div className="w-6 h-6 bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        {activity.type === 'lesson' ? (
                          <Play size={10} className="text-accent" />
                        ) : (
                          <Award size={10} className="text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-text">{activity.lessonTitle || 'Sertifikat olindi'}</p>
                        <p className="text-[10px] text-muted mt-0.5">
                          {new Date(activity.date).toLocaleDateString('uz-UZ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
