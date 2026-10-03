import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorVisual, AestheticHospitalBackground, ClinicInteriorVisual } from '../common/VisualAvatar';
import { ArrowRight, ShieldCheck, HeartHandshake, Microscope, Award, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PublicAboutViewProps {
  onBook: () => void;
}

export const PublicAboutView: React.FC<PublicAboutViewProps> = ({ onBook }) => {
  const { clinicInfo } = useClinic();

  const principles = [
    {
      icon: Microscope,
      title: 'Arthroscopic Precision',
      desc: 'High-definition 4K arthroscopic imaging and minimally invasive tissue preservation for rapid, natural joint recovery.',
    },
    {
      icon: Award,
      title: 'International Surgical Rigor',
      desc: 'Advanced biomechanical reconstruction adhering to global orthopaedic society benchmarks for shoulder and hip replacement.',
    },
    {
      icon: ShieldCheck,
      title: 'Trauma & Reconstruction Mastery',
      desc: 'Extensive experience in high-volume complex polytrauma, periarticular fracture repair, and tendon transfers.',
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Rehabilitation',
      desc: 'Surgical recovery integrated with tailored physiotherapy regimens designed around patient mobility goals.',
    },
  ];

  return (
    <div className="relative py-12 md:py-20 bg-[#FCFBF9]">
      <AestheticHospitalBackground overlayOpacity="bg-[#FCFBF9]/92" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-20">
        {/* Intro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            Hospital Legacy & Surgical Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141213] leading-tight">
            Advanced orthopaedics grounded in surgical mastery and patient recovery.
          </h1>
          <p className="text-sm sm:text-base text-[#4D4548] leading-relaxed font-sans">
            {clinicInfo.name} represents a dedicated center of orthopaedic excellence in Mumbai,
            specializing in cutting-edge upper limb arthroscopy, complex shoulder replacement,
            and high-volume trauma surgery led by Dr. Kush Mukhi.
          </p>
        </motion.div>

        {/* Interior Architecture Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F7F2EC] p-6 sm:p-8 rounded-3xl border border-[#EAE2D8]"
        >
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
              Infrastructure & Care Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#141213]">
              A serene clinical environment designed for healing.
            </h2>
            <p className="text-xs sm:text-sm text-[#554D45] leading-relaxed">
              Dr. Mukhi's Raj Hospital was established with a singular vision: to combine
              compassionate patient hospitality with world-class surgical facilities. Our Bandra
              and Powai clinics are designed with natural light, sterile laminar flow surgical theatres,
              and calm consultation suites that respect patient dignity and time.
            </p>
          </div>
          <ClinicInteriorVisual className="h-72 w-full" />
        </motion.div>

        {/* Core Principles */}
        <div className="space-y-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
              Surgical Standards
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#141213] mt-1">
              The four pillars of our orthopaedic practice.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#EAE2D8] pt-8">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="space-y-3 p-6 rounded-2xl bg-white/80 border border-[#E7DFD4] hover:border-[#7B1E34]/35 hover-lift shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDF4F6] text-[#7B1E34] flex items-center justify-center border border-[#F2D5DC]">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#141213]">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#554D45] leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Summary Row with portrait visual */}
        <div className="bg-[#F5EFEB] p-8 sm:p-12 rounded-3xl border border-[#DDD3C5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
          <div className="lg:col-span-5 flex justify-center">
            <DoctorVisual className="w-full max-w-sm h-[420px] hover-lift" variant="profile" />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
              Visiting Consultant & Shoulder Surgeon
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#141213]">
              Dr. Kush Mukhi
            </h3>
            <p className="text-xs text-[#7B1E34] font-mono font-medium">
              MBBS, M.S. (Orthopaedic)
            </p>
            <p className="text-xs sm:text-sm text-[#4D4548] leading-relaxed font-sans">
              Dr. Kussh S. Mukhi is a highly specialized, internationally trained orthopaedic surgeon
              based in Mumbai, India, with a dedicated focus on advanced shoulder, elbow surgery, and
              hip surgery. Over his career, he has built a robust clinical practice that balances
              high-volume reconstructive trauma surgery with cutting-edge upper limb arthroscopy and
              complex shoulder arthroplasty.
            </p>
            <div className="pt-2">
              <button
                onClick={onBook}
                className="px-7 py-3.5 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2 burgundy-glow"
              >
                <span>Schedule Orthopaedic Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
