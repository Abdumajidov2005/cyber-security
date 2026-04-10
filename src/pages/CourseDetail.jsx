import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Clock, BookOpen, Users, Award, CheckCircle,
  Play, Shield, ChevronRight
} from 'lucide-react';
import { getCourseBySlug } from '../data/courses';
import { getInstructorById } from '../data/instructors';
import { CurriculumAccordion } from '../components/course/CurriculumAccordion';
import { Footer } from '../components/layout/Footer';
import { PageTransition } from '../components/layout/PageTransition';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatDuration';
import { useScrollReveal } from '../hooks/useScrollReveal';

const levelColors = { Beginner: 'success', Intermediate: 'accent', Advanced: 'danger' };

export function CourseDetail() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);
  const navigate = useNavigate();
  const { user, isEnrolled, enroll } = useAuth();
  const { toast } = useToast();
  const [enrollModal, setEnrollModal] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const ref = useScrollReveal({ stagger: true });

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl tracking-wider text-muted mb-4">KURS TOPILMADI</p>
          <Link to="/courses" className="text-accent text-xs uppercase tracking-wider hover:underline">
            Kurslarga qaytish
          </Link>
        </div>
      </div>
    );
  }

  const instructor = getInstructorById(course.instructor);
  const enrolled = isEnrolled(course.slug);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setEnrolling(true);
    await new Promise((r) => setTimeout(r, 1000));
    enroll(course.slug);
    setEnrolling(false);
    setEnrollModal(false);
    toast({
      message: `"${course.title}" kursiga muvaffaqiyatli yozildingiz!`,
      type: 'success',
    });
  };

  const firstLesson = course.curriculum[0]?.lessons[0];

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        {/* Hero */}
        <div className="border-b border-white/10 bg-surface/30">
          <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted mb-8 uppercase tracking-wider">
              <Link to="/" className="hover:text-accent transition-colors">Bosh sahifa</Link>
              <ChevronRight size={10} />
              <Link to="/courses" className="hover:text-accent transition-colors">Kurslar</Link>
              <ChevronRight size={10} />
              <span className="text-text">{course.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant={levelColors[course.level] || 'default'}>{course.level}</Badge>
                  <Badge variant={course.isFree ? 'free' : 'default'}>{course.category}</Badge>
                </div>

                <h1 className="font-display text-5xl md:text-6xl tracking-wider leading-tight mb-4">
                  {course.title}
                </h1>
                <p className="text-muted text-lg mb-6">{course.subtitle}</p>
                <p className="text-text/80 text-sm leading-relaxed mb-8 max-w-2xl">
                  {course.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="text-accent fill-accent" />
                    <span className="text-text font-semibold">{course.rating}</span>
                    <span className="text-muted">({course.reviews} sharh)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <Users size={13} />
                    <span>{course.students.toLocaleString()} talaba</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <Clock size={13} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <BookOpen size={13} />
                    <span>{course.lessons} dars</span>
                  </div>
                </div>
              </div>

              {/* Enroll card */}
              <div className="lg:col-span-1">
                <div className="border border-white/10 bg-surface p-6 sticky top-24">
                  {/* Preview thumbnail */}
                  <div className="w-full h-40 bg-bg border border-white/5 flex items-center justify-center mb-6 relative overflow-hidden group cursor-pointer">
                    <span className="font-display text-7xl text-white/5">{course.title.charAt(0)}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border border-accent/30 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <Play size={16} className="text-accent ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="font-display text-4xl tracking-wider text-text mb-1">
                      {formatPrice(course.price)}
                    </div>
                    {!course.isFree && (
                      <p className="text-muted text-xs">Bir martalik to'lov · Umrbod kirish</p>
                    )}
                  </div>

                  {enrolled ? (
                    <Link
                      to={`/learn/${course.slug}/${firstLesson?.id}`}
                      className="w-full flex items-center justify-center gap-2 bg-accent text-bg py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent/90 transition-colors mb-3"
                    >
                      <Play size={13} /> O'qishni davom ettirish
                    </Link>
                  ) : (
                    <button
                      onClick={() => setEnrollModal(true)}
                      className="w-full flex items-center justify-center gap-2 bg-accent text-bg py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent/90 transition-colors mb-3"
                    >
                      {course.isFree ? 'Bepul boshlash' : 'Sotib olish'}
                    </button>
                  )}

                  <div className="space-y-2 mt-6 pt-6 border-t border-white/10">
                    {[
                      { icon: <Clock size={12} />, text: `${course.duration} video kontent` },
                      { icon: <BookOpen size={12} />, text: `${course.lessons} ta dars` },
                      { icon: <Award size={12} />, text: 'Sertifikat' },
                      { icon: <Shield size={12} />, text: 'Umrbod kirish' },
                      { icon: <CheckCircle size={12} />, text: 'Mobil qurilmada ham' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted">
                        <span className="text-accent">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16" ref={ref}>
              {/* What you'll learn */}
              <div data-reveal>
                <h2 className="font-display text-3xl tracking-wider mb-6">NIMA O'RGANASIZ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Real hujum texnikalarini amalda qo\'llash',
                    'Zaifliklarni topish va hisobot yozish',
                    'Professional pentest metodologiyasi',
                    'Sanoat standartidagi asboblardan foydalanish',
                    'CTF musobaqalariga tayyorlanish',
                    'Kiberxavfsizlik sertifikatlariga tayyorlanish',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle size={13} className="text-accent mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div data-reveal>
                <CurriculumAccordion curriculum={course.curriculum} />
              </div>

              {/* Instructor */}
              {instructor && (
                <div data-reveal>
                  <h2 className="font-display text-3xl tracking-wider mb-6">INSTRUKTOR</h2>
                  <div className="flex items-start gap-6 p-6 border border-white/10 bg-surface">
                    <div className="w-16 h-16 border border-accent/20 bg-accent/5 flex items-center justify-center shrink-0">
                      <span className="font-display text-2xl text-accent">
                        {instructor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl tracking-wider mb-1">{instructor.name}</h3>
                      <p className="text-accent text-xs uppercase tracking-wider mb-3">{instructor.title}</p>
                      <p className="text-muted text-sm leading-relaxed">{instructor.bio}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div data-reveal>
                <h2 className="font-display text-3xl tracking-wider mb-6">SHARHLAR</h2>
                <div className="flex items-center gap-8 p-6 border border-white/10 bg-surface mb-6">
                  <div className="text-center">
                    <div className="font-display text-6xl text-accent">{course.rating}</div>
                    <div className="flex items-center gap-0.5 justify-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < Math.floor(course.rating) ? 'text-accent fill-accent' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <div className="text-muted text-xs mt-1">{course.reviews} sharh</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-muted w-2">{star}</span>
                        <div className="flex-1 h-1 bg-white/10">
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : 2}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample reviews */}
                {[
                  { name: 'Bobur T.', rating: 5, text: 'Juda yaxshi kurs! Amaliy mashqlar va real misollar bilan tushuntirilgan. Instruktor juda tajribali.' },
                  { name: 'Malika R.', rating: 5, text: 'Bu kursdan keyin birinchi bug bounty topshiriqimni muvaffaqiyatli bajardim. Tavsiya qilaman!' },
                  { name: 'Sherzod K.', rating: 4, text: 'Kontent sifatli, lekin ba\'zi mavzular yanada chuqurroq yoritilishi mumkin edi.' },
                ].map((review, i) => (
                  <div key={i} className="border-b border-white/5 py-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <span className="text-accent text-xs">{review.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium">{review.name}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} size={10} className="text-accent fill-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar — tags */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="border border-white/10 p-5">
                  <h4 className="font-display text-sm tracking-widest mb-4">TEGLAR</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="border border-white/10 p-5">
                  <h4 className="font-display text-sm tracking-widest mb-4">TALABLAR</h4>
                  <ul className="space-y-2 text-xs text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">—</span>
                      Kompyuter va internet aloqasi
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">—</span>
                      {course.level === 'Beginner' ? 'Hech qanday oldingi bilim talab qilinmaydi' : 'Asosiy tarmoq bilimlari'}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">—</span>
                      O'rganishga ishtiyoq
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      <Modal
        isOpen={enrollModal}
        onClose={() => setEnrollModal(false)}
        title={course.isFree ? 'Bepul kursga yozilish' : 'Kursni sotib olish'}
      >
        <div className="space-y-4">
          <div className="border border-white/10 p-4 bg-bg">
            <h3 className="font-display text-xl tracking-wider mb-1">{course.title}</h3>
            <p className="text-muted text-xs">{course.subtitle}</p>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <span className="text-sm text-muted">Narx</span>
            <span className="font-display text-2xl text-accent">{formatPrice(course.price)}</span>
          </div>

          {!course.isFree && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Karta raqami"
                className="w-full bg-bg border border-white/10 text-text text-sm px-4 py-3 focus:outline-none focus:border-accent/50 placeholder:text-muted"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="bg-bg border border-white/10 text-text text-sm px-4 py-3 focus:outline-none focus:border-accent/50 placeholder:text-muted"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="bg-bg border border-white/10 text-text text-sm px-4 py-3 focus:outline-none focus:border-accent/50 placeholder:text-muted"
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleEnroll}
            loading={enrolling}
            className="w-full"
            size="lg"
          >
            {course.isFree ? 'Bepul boshlash' : `${formatPrice(course.price)} to'lash`}
          </Button>

          <p className="text-muted text-xs text-center">
            30 kunlik qaytarish kafolati
          </p>
        </div>
      </Modal>

      <Footer />
    </PageTransition>
  );
}
