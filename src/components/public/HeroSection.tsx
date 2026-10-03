import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorVisual, AestheticHospitalBackground } from '../common/VisualAvatar';
import { Phone, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onBook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBook }) => {
  const { clinicInfo } = useClinic();

  // Enforce canonical doctor name and clinic phone, avoiding any stale cache
  const doctorName = 'Dr. Kush Mukhi';
  const phone = clinicInfo?.phone && clinicInfo.phone.startsWith('+91')
    ? clinicInfo.phone
    : '+91 (22) 2640 1888';

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:py-24 bg-[#FCFBF9]">
      {/* High Quality Modern Hospital Architectural Photo Background */}
      <AestheticHospitalBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Clean, confident typography with ZERO font clash */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Subtle Hospital Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF4F6] border border-[#F2D5DC] text-[11px] font-semibold text-[#7B1E34] uppercase tracking-wider font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B1E34]" />
              <span>Raj Hospital · Orthopaedic Surgery</span>
            </div>

            {/* Doctor Name & Specialization */}
            <div className="space-y-1.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#141213] font-bold leading-tight">
                {doctorName}
              </h1>
              <p className="text-base sm:text-lg font-medium text-[#7B1E34] font-sans">
                Consultant Orthopaedic & Shoulder Surgeon
              </p>
            </div>

            {/* Concise One-Line Value Proposition (Clean sans-serif, no cluttered text walls) */}
            <p className="text-base sm:text-lg text-[#4D4548] max-w-lg leading-relaxed font-sans">
              Specialized in advanced shoulder arthroscopy, complex joint reconstruction, and dedicated trauma surgery focused on your mobility.
            </p>

            {/* Clean CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onBook}
                className="relative group overflow-hidden px-8 py-3.5 text-sm font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer burgundy-glow"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <span className="relative z-10 font-sans tracking-wide">Book Consultation</span>
                <ArrowRight className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="px-6 py-3.5 text-sm font-semibold text-[#141213] hover:text-[#7B1E34] bg-white/95 hover:bg-[#FDF4F6] border border-[#DDD3C5] hover:border-[#7B1E34]/40 rounded-xl transition-all hover:-translate-y-0.5 shadow-2xs flex items-center gap-2.5 font-sans"
              >
                <Phone className="w-4 h-4 text-[#7B1E34]" />
                <span>Call Clinic: {phone}</span>
              </a>
            </div>

            {/* Hospital Affiliations Trust Bar */}
            <div className="pt-4 border-t border-[#EAE2D8] flex flex-wrap items-center gap-4 text-xs text-[#554D45] font-sans">
              <span className="flex items-center gap-1.5 font-semibold text-[#141213]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>Dr. Mukhi's Raj Hospital, Mumbai</span>
              </span>
              <span aria-hidden="true" className="text-[#DDD3C5]">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-[#141213]">
                <Building2 className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>L H Hiranandani Hospital, Powai</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Real Official Photograph of Dr. Kush Mukhi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm hover-lift">
              {/* Subtle Burgundy aura glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7B1E34]/15 via-[#93243E]/10 to-[#541021]/10 rounded-3xl blur-xl pointer-events-none" />
              <DoctorVisual className="w-full h-[470px]" variant="hero" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
