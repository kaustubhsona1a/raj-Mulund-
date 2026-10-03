import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorVisual, AestheticHospitalBackground } from '../common/VisualAvatar';
import { Phone, ArrowRight, ShieldCheck, Building2, MapPin } from 'lucide-react';
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
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 bg-[#FCFBF9] min-h-[620px] flex items-center">
      {/* High Quality Modern Glass Hospital Architectural Photo with Lush Grass Lawn Background */}
      <AestheticHospitalBackground variant="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clean frosted glass container ensuring 100% legibility while hospital grounds shine through */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FCFBF9]/90 backdrop-blur-md p-6 sm:p-9 lg:p-10 rounded-3xl border border-white/90 shadow-[0_16px_40px_rgba(20,18,19,0.07)] space-y-6">
              {/* Subtle Hospital Eyebrow with Campus Location */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF4F6] border border-[#F2D5DC] text-[11px] font-semibold text-[#7B1E34] uppercase tracking-wider font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B1E34]" />
                  <span>Raj Hospital · Orthopaedic Surgery Centre</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#6E6367] font-medium">
                  <MapPin className="w-3 h-3 text-[#7B1E34]" />
                  <span>Bandra West & Powai, Mumbai</span>
                </div>
              </div>

              {/* Doctor Name & Specialization */}
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#141213] font-bold leading-tight">
                  {doctorName}
                </h1>
                <p className="text-base sm:text-lg font-medium text-[#7B1E34] font-sans">
                  Consultant Orthopaedic & Shoulder Surgeon
                </p>
              </div>

              {/* Concise One-Line Value Proposition */}
              <p className="text-base sm:text-lg text-[#4D4548] max-w-xl leading-relaxed font-sans">
                Specialized in advanced shoulder arthroscopy, complex joint reconstruction, and dedicated trauma surgery focused on restoring pain-free mobility.
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={onBook}
                  className="relative group overflow-hidden px-7 py-3.5 text-sm font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer burgundy-glow"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  <span className="relative z-10 font-sans tracking-wide">Book Consultation</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="px-5 py-3.5 text-sm font-semibold text-[#141213] hover:text-[#7B1E34] bg-white hover:bg-[#FDF4F6] border border-[#DDD3C5] hover:border-[#7B1E34]/40 rounded-xl transition-all hover:-translate-y-0.5 shadow-2xs flex items-center gap-2.5 font-sans"
                >
                  <Phone className="w-4 h-4 text-[#7B1E34]" />
                  <span>Call Hospital: {phone}</span>
                </a>
              </div>

              {/* Hospital Affiliations Trust Bar */}
              <div className="pt-4 border-t border-[#EAE2D8] flex flex-wrap items-center gap-4 text-xs text-[#554D45] font-sans">
                <span className="flex items-center gap-1.5 font-semibold text-[#141213]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7B1E34]" />
                  <span>Raj Hospital, Bandra</span>
                </span>
                <span aria-hidden="true" className="text-[#DDD3C5]">·</span>
                <span className="flex items-center gap-1.5 font-semibold text-[#141213]">
                  <Building2 className="w-3.5 h-3.5 text-[#7B1E34]" />
                  <span>L H Hiranandani Hospital, Powai</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Real Official Photograph of Dr. Kush Mukhi & Campus Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end gap-3"
          >
            <div className="relative w-full max-w-sm hover-lift">
              {/* Subtle Burgundy aura glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7B1E34]/20 via-[#93243E]/15 to-[#541021]/15 rounded-3xl blur-xl pointer-events-none" />
              <DoctorVisual className="w-full h-[470px]" variant="hero" />
            </div>

            {/* Subtle campus architectural caption badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#EAE2D8] text-[10px] text-[#6E6367] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Raj Hospital Surgical Campus · Modern Glass Pavilion & Grounds</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
