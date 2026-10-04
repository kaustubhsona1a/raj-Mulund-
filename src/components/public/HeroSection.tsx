import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Phone, ArrowRight, ShieldCheck, Building2, MapPin, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onBook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBook }) => {
  const { clinicInfo } = useClinic();

  const doctorName = 'Dr. Kush Mukhi';
  const phone = clinicInfo?.phone && clinicInfo.phone.startsWith('+91')
    ? clinicInfo.phone
    : '+91 (22) 2640 1888';

  return (
    <section className="relative overflow-hidden py-8 sm:py-14 lg:py-20 bg-gradient-to-b from-[#FCFBF9] via-[#FAF8F5] to-[#FCFBF9]">
      {/* Soft Ambient Clinical Lighting (No distracting hospital photo on laptop/mobile) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#7B1E34]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#EAE2D8]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content: Completely Seamless, Full-Bleed (NO nested card layout) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Information Column (Left on Desktop, Main flow on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            {/* Eyebrow Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF4F6] border border-[#F2D5DC] text-[11px] font-semibold text-[#7B1E34] uppercase tracking-wider font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B1E34]" />
                <span>Raj Hospital · Orthopaedic Surgery</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] text-[#6E6367] font-medium">
                <MapPin className="w-3 h-3 text-[#7B1E34]" />
                <span>Bandra West & Powai, Mumbai</span>
              </div>
            </div>

            {/* Doctor Name & Specialization */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#141213] font-bold leading-tight">
                {doctorName}
              </h1>
              <p className="text-base sm:text-xl font-semibold text-[#7B1E34] font-sans">
                Consultant Orthopaedic & Shoulder Surgeon
              </p>
              <p className="text-xs sm:text-sm text-[#6E6367] font-mono">
                MBBS, M.S. (Orthopaedics) · Fellow Upper Limb & Arthroscopy
              </p>
            </div>

            {/* MOBILE ONLY: Large, High-Visibility Doctor Photo (NOT a tiny thumbnail, NOT in a card) */}
            <div className="lg:hidden py-2">
              <div className="w-full max-w-[300px] sm:max-w-sm h-[380px] sm:h-[440px] mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#F7F2EC] relative group">
                <img
                  src="/dr-kush-mukhi.jpg"
                  alt="Dr. Kush Mukhi - Consultant Orthopaedic & Shoulder Surgeon"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] saturate-[1.05]"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 py-2 px-3 bg-gradient-to-t from-[#141213]/80 via-[#141213]/40 to-transparent text-white text-center">
                  <span className="text-xs font-serif font-bold tracking-wide block">
                    Dr. Kush Mukhi
                  </span>
                  <span className="text-[10px] text-[#F2D5DC] block">
                    Raj Hospital · Bandra West, Mumbai
                  </span>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-lg text-[#4D4548] leading-relaxed max-w-xl font-sans">
              Specialized in advanced shoulder arthroscopy, complex joint reconstruction, and dedicated trauma surgery focused on restoring active, pain-free mobility.
            </p>

            {/* Action Buttons (Stacked on Mobile, Inline on Desktop) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onBook}
                className="px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer burgundy-glow"
              >
                <span className="tracking-wide">Book Consultation</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#141213] hover:text-[#7B1E34] bg-white hover:bg-[#FDF4F6] border border-[#DDD3C5] hover:border-[#7B1E34]/40 rounded-xl transition-all hover:-translate-y-0.5 shadow-2xs flex items-center justify-center gap-2.5 font-sans"
              >
                <Phone className="w-4 h-4 text-[#7B1E34]" />
                <span>Call Hospital: {phone}</span>
              </a>
            </div>

            {/* Hospital Affiliations Trust Bar */}
            <div className="pt-4 border-t border-[#EAE2D8] flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-[#554D45]">
              <span className="flex items-center gap-1.5 font-semibold text-[#141213]">
                <ShieldCheck className="w-4 h-4 text-[#7B1E34] shrink-0" />
                <span>Raj Hospital, Bandra West</span>
              </span>
              <span aria-hidden="true" className="text-[#DDD3C5] hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-[#141213]">
                <Building2 className="w-4 h-4 text-[#7B1E34] shrink-0" />
                <span>L H Hiranandani Hospital, Powai</span>
              </span>
            </div>
          </motion.div>

          {/* DESKTOP / LAPTOP ONLY: Large, Crystal-Clear Full Portrait of Dr. Kush Mukhi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-center justify-center lg:col-span-5"
          >
            <div className="relative w-full max-w-md">
              {/* Subtle Warm Burgundy Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7B1E34]/15 via-[#93243E]/10 to-[#541021]/10 rounded-3xl blur-xl pointer-events-none" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-[#F7F2EC]">
                <img
                  src="/dr-kush-mukhi.jpg"
                  alt="Dr. Kush Mukhi - Consultant Orthopaedic & Shoulder Surgeon"
                  className="w-full h-[520px] object-cover object-top filter contrast-[1.03] saturate-[1.05] hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Refined bottom caption plaque */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#141213]/85 via-[#141213]/40 to-transparent text-white flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#F2D5DC] font-semibold">
                      Orthopaedic & Shoulder Surgeon
                    </div>
                    <div className="font-serif font-bold text-base">
                      Dr. Kush Mukhi
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#DDD3C5]">
                    Raj Hospital · Mumbai
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
