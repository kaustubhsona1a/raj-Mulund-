import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

interface DoctorProfileSectionProps {
  onViewFullProfile: () => void;
}

export const DoctorProfileSection: React.FC<DoctorProfileSectionProps> = ({
  onViewFullProfile,
}) => {
  const { clinicInfo } = useClinic();

  return (
    <section className="py-8 sm:py-16 bg-[#FCFBF9] border-t border-[#EAE2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Desktop Left Column: Clean Full Photograph (NOT a card) beside Information */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:col-span-5 justify-center lg:justify-start"
          >
            <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg border border-[#EAE2D8]">
              <img
                src="/dr-kush-mukhi.jpg"
                alt="Dr. Kush Mukhi - Orthopaedic Surgeon"
                className="w-full h-[450px] object-cover object-top hover:scale-102 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Doctor Bio Container */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            {/* Mobile View: Doctor Title & High-Visibility Photo */}
            <div className="space-y-3 lg:block">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#7B1E34] font-bold font-display">
                  About the Surgeon
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#141213]">
                  Dr. Kush Mukhi
                </h2>
                <p className="text-xs sm:text-sm text-[#7B1E34] font-medium font-sans">
                  MBBS, M.S. (Orthopaedic) · Consultant & Shoulder Surgeon
                </p>
              </div>

              {/* Mobile Doctor Photo: Prominent, high-visibility portrait */}
              <div className="lg:hidden w-full max-w-[280px] sm:max-w-xs h-[340px] sm:h-[400px] mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-white bg-[#F7F2EC]">
                <img
                  src="/dr-kush-mukhi.jpg"
                  alt="Dr. Kush Mukhi"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] saturate-[1.05]"
                />
              </div>
            </div>

            {/* Department & Hospital Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] px-3 py-1 rounded-lg flex items-center gap-1.5 text-[11px] sm:text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7B1E34] shrink-0" />
                <span>Raj Hospital · Orthopaedic Surgery</span>
              </span>
              <span className="bg-white text-[#141213] border border-[#DDD3C5] px-3 py-1 rounded-lg flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Building2 className="w-3.5 h-3.5 text-[#7B1E34] shrink-0" />
                <span>L H Hiranandani Hospital, Powai</span>
              </span>
            </div>

            {/* Biosketch Summary */}
            <div className="text-xs sm:text-sm text-[#4D4548] leading-relaxed space-y-2.5 font-sans">
              <p>
                Dr. Kussh S. Mukhi is an internationally trained orthopaedic surgeon based in Mumbai, India,
                with dedicated surgical mastery in advanced shoulder, elbow, and hip joint reconstruction.
              </p>
              <p>
                His clinical practice balances high-volume reconstructive trauma surgery with cutting-edge
                upper limb arthroscopy, complex shoulder replacements (anatomic & reverse), and joint preservation.
              </p>
              <p className="text-[11px] sm:text-xs text-[#554D45] font-serif italic border-l-2 border-[#7B1E34] pl-3 py-0.5">
                Visiting Consultant & Shoulder Surgeon at Dr. Mukhi's Raj Hospital; Shoulder Specialist at L H Hiranandani Hospital, Powai.
              </p>
            </div>

            <div className="pt-1">
              <button
                onClick={onViewFullProfile}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B1E34] hover:text-[#541021] border-b border-[#7B1E34] hover:border-[#541021] pb-1 transition-all cursor-pointer group"
              >
                <span>View Full Surgical Biosketch & Clinical Affiliations</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
