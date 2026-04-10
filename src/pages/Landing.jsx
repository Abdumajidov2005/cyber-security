import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../components/sections/HeroSlider';
import { Marquee } from '../components/sections/Marquee';
import { CounterSection } from '../components/sections/CounterSection';
import { RevealGrid } from '../components/sections/RevealGrid';
import { CourseListItem } from '../components/course/CourseList';
import { Footer } from '../components/layout/Footer';
import { PageTransition } from '../components/layout/PageTransition';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { courses } from '../data/courses';
import { instructors } from '../data/instructors';
import { Shield, Award, Zap, Users } from 'lucide-react';

function FeaturesSection() {
  const ref = useScrollReveal({ stagger: true });
  const features = [
    {
      icon: <Shield size={20} className="text-accent" />,
      title: 'Real Laboratoriyalar',
      desc: 'Haqiqiy muhitda amaliy mashqlar. Virtual mashinalar va CTF platformalari bilan ishlang.',
    },
    {
      icon: <Award size={20} className="text-accent" />,
      title: 'Sertifikatlar',
      desc: 'Kursni tugatgandan so\'ng sanoat tomonidan tan olingan sertifikat oling.',
    },
    {
      icon: <Zap size={20} className="text-accent" />,
      title: 'Yangi Kontent',
      desc: 'Har hafta yangi darslar va zamonaviy hujum texnikalariga oid materiallar qo\'shiladi.',
    },
    {
      icon: <Users size={20} className="text-accent" />,
      title: 'Jamoa Hamjamiyati',
      desc: 'Discord serverimizda 4000+ talaba bilan muloqot qiling va savol bering.',
    },
  ];

  return (
    <section className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs uppercase tracking-[0.3em]">Nima uchun CyberLearn</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider">AFZALLIKLAR</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {features.map((f, i) => (
            <div
              key={i}
              data-reveal
              className="bg-bg p-8 hover:bg-surface transition-colors duration-300"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-display text-xl tracking-wider mb-3">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseListSection() {
  const ref = useScrollReveal({ stagger: true });

  return (
    <section className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-accent" />
              <span className="text-accent text-xs uppercase tracking-[0.3em]">To'liq ro'yxat</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider">BARCHA KURSLAR</h2>
          </div>
          <Link
            to="/courses"
            className="text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors flex items-center gap-2 self-start"
          >
            Filtrlash & qidirish <span>→</span>
          </Link>
        </div>

        <div ref={ref} className="border-t border-white/10">
          {courses.map((course) => (
            <div key={course.id} data-reveal>
              <CourseListItem course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstructorsSection() {
  const ref = useScrollReveal({ stagger: true });

  return (
    <section className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs uppercase tracking-[0.3em]">Ekspertlar</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wider">INSTRUKTORLAR</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              data-reveal
              className="bg-bg p-8 hover:bg-surface transition-colors duration-300 group"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 border border-accent/20 bg-accent/5 flex items-center justify-center mb-6">
                <span className="font-display text-2xl text-accent">
                  {inst.name.charAt(0)}
                </span>
              </div>

              <h3 className="font-display text-xl tracking-wider mb-1 group-hover:text-accent transition-colors">
                {inst.name}
              </h3>
              <p className="text-accent text-xs uppercase tracking-wider mb-4">{inst.title}</p>
              <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-6">{inst.bio}</p>

              <div className="flex items-center gap-6 text-xs text-muted border-t border-white/5 pt-4">
                <div>
                  <div className="text-text font-semibold">{inst.courses}</div>
                  <div>Kurs</div>
                </div>
                <div>
                  <div className="text-text font-semibold">{inst.students.toLocaleString()}</div>
                  <div>Talaba</div>
                </div>
                <div>
                  <div className="text-text font-semibold">{inst.rating}</div>
                  <div>Reyting</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useScrollReveal();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-accent" />
          <span className="text-accent text-xs uppercase tracking-[0.3em]">Bugun boshlang</span>
          <div className="w-8 h-px bg-accent" />
        </div>
        <h2 className="font-display text-6xl md:text-8xl tracking-wider mb-6 leading-none">
          KARYERANGIZNI<br />
          <span className="text-gradient">BOSHLANG</span>
        </h2>
        <p className="text-muted text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Kiberxavfsizlik sohasida professional bo'lish uchun hoziroq ro'yxatdan o'ting.
          Bepul kurslar bilan boshlang.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-accent text-bg px-10 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent/90 transition-colors"
          >
            Bepul ro'yxatdan o'tish
          </Link>
          <Link
            to="/courses"
            className="border border-white/20 text-text px-10 py-4 text-xs uppercase tracking-[0.2em] hover:border-accent/50 transition-colors"
          >
            Kurslarni ko'rish
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Landing() {
  return (
    <PageTransition>
      <HeroSlider />
      <Marquee />
      <CounterSection />
      <FeaturesSection />
      <RevealGrid />
      <CourseListSection />
      <InstructorsSection />
      <CTASection />
      <Footer />
    </PageTransition>
  );
}
