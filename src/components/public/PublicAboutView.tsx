import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AestheticHospitalBackground, ClinicInteriorVisual } from '../common/VisualAvatar';
import { ArrowRight, ShieldCheck, HeartHandshake, Microscope, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface PublicAboutViewProps {
  onBook: () => void;
}

export const PublicAboutView: React.FC<PublicAboutViewProps> = ({ onBook }) => {
  const { clinicInfo } = useClinic();

  const principles = [
    {
      icon: ShieldCheck,
      title: 'Precision Diagnostics',
      desc: 'High-definition 3T MRI, dynamic ultrasound, and weight-bearing dynamic radiographs prior to any surgical recommendation.',
    },
    {
      icon: Microscope,
      title: 'Minimally Invasive Mastery',
      desc: 'Sub-centimeter arthroscopic approaches that spare surrounding deltoid and rotator cuff fibers for accelerated post-op recovery.',
    },
    {
      icon: Award,
      title: 'Evidence-Based Arthroplasty',
      desc: 'Using patient-matched implants, reverse shoulder kinematics, and proven orthopedic clinical data for maximum prosthetic lifespan.',
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Rehabilitation',
      desc: 'Surgical recovery integrated with tailored physiotherapy regimens designed around patient mobility goals.',
    },
  ];

  return (
    <div className="relative py-6 sm:py-16 bg-[#FCFBF9]">
      <AestheticHospitalBackground overlayOpacity="bg-[#FCFBF9]/92" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 space-y-8 sm:space-y-16">
        {/* Intro Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-2.5 sm:space-y-4"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            Hospital Legacy & Surgical Excellence
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141213] leading-tight">
            Advanced orthopaedics grounded in surgical mastery and patient recovery.
          </h1>
          <p className="text-xs sm:text-base text-[#4D4548] leading-relaxed font-sans">
            {clinicInfo.name} represents a dedicated center of orthopaedic excellence in Mumbai,
            specializing in cutting-edge upper limb arthroscopy, complex shoulder replacement,
            and high-volume trauma surgery led by Dr. Kush Mukhi.
          </p>
        </motion.div>

        {/* Interior Architecture Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-center bg-[#F7F2EC] p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-[#EAE2D8]"
        >
          <div className="space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
              Infrastructure & Care Philosophy
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#141213]">
              A serene clinical environment designed for healing.
            </h2>
            <p className="text-xs sm:text-sm text-[#554D45] leading-relaxed">
              Dr. Mukhi's Raj Hospital was established with a singular vision: to combine
              compassionate patient hospitality with world-class surgical facilities. Our Bandra
              and Powai clinics are designed with natural light, sterile laminar flow surgical theatres,
              and calm consultation suites that respect patient dignity and time.
            </p>
          </div>
          <ClinicInteriorVisual className="h-52 sm:h-72 w-full" />
        </motion.div>

        {/* Core Principles */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
              Surgical Standards
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#141213] mt-1">
              The four pillars of our orthopaedic practice.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 border-t border-[#EAE2D8] pt-4 sm:pt-6">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="space-y-2 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 border border-[#E7DFD4] shadow-2xs"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#FDF4F6] text-[#7B1E34] flex items-center justify-center border border-[#F2D5DC]">
                  <p.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#141213]">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#554D45] leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Summary Row: Beside Information, Full Image */}
        <div className="bg-[#F5EFEB] p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-[#DDD3C5] grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center shadow-xs">
          {/* Desktop Left: Full Image */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-md border border-[#DDD3C5]">
              <img
                src="/dr-kush-mukhi.jpg"
                alt="Dr. Kush Mukhi"
                className="w-full h-[400px] object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {/* Mobile Header: Photo Beside Info */}
            <div className="flex items-start justify-between gap-3 lg:block">
              <div className="space-y-1 flex-1 min-w-0">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
                  Visiting Consultant & Shoulder Surgeon
                </span>
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#141213]">
                  Dr. Kush Mukhi
                </h3>
                <p className="text-xs text-[#7B1E34] font-mono font-medium">
                  MBBS, M.S. (Orthopaedic)
                </p>
              </div>

              {/* Mobile Photo: Directly Beside Info */}
              <div className="lg:hidden w-20 h-28 sm:w-28 sm:h-36 shrink-0 rounded-xl overflow-hidden shadow-sm border border-[#DDD3C5]">
                <img
                  src="/dr-kush-mukhi.jpg"
                  alt="Dr. Kush Mukhi"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4D4548] leading-relaxed font-sans">
              Dr. Kussh S. Mukhi is a highly specialized, internationally trained orthopaedic surgeon
              based in Mumbai, India, with a dedicated focus on advanced shoulder, elbow surgery, and
              hip surgery. Over his career, he has built a robust clinical practice that balances
              high-volume reconstructive trauma surgery with cutting-edge upper limb arthroscopy and
              complex shoulder arthroplasty.
            </p>
            <div className="pt-1">
              <button
                onClick={onBook}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 burgundy-glow"
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
