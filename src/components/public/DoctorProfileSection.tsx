import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorVisual } from '../common/VisualAvatar';
import { ArrowRight, ShieldCheck, Building2, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface DoctorProfileSectionProps {
  onViewFullProfile: () => void;
}

export const DoctorProfileSection: React.FC<DoctorProfileSectionProps> = ({
  onViewFullProfile,
}) => {
  const { clinicInfo } = useClinic();

  return (
    <section className="py-20 bg-[#FCFBF9] border-t border-[#EAE2D8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Large Professional Visual representing Dr. Kush Mukhi in Plaid Suit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-sm hover-lift">
              <DoctorVisual className="w-full h-[470px]" variant="profile" />
            </div>
          </motion.div>

          {/* Doctor Bio Preview with user's exact information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
                About the Surgeon
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141213]">
                Dr. Kush Mukhi
              </h2>
              <p className="text-xs sm:text-sm text-[#7B1E34] font-mono font-medium">
                MBBS, M.S. (Orthopaedic) · Visiting Consultant & Shoulder Surgeon
              </p>
            </div>

            {/* Department & Institution Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>Raj Hospital · Orthopaedic Surgery</span>
              </span>
              <span className="bg-white text-[#141213] border border-[#DDD3C5] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#7B1E34]" />
                <span>L H Hiranandani Hospital, Powai</span>
              </span>
            </div>

            {/* Biosketch directly from user's provided document */}
            <div className="text-xs sm:text-sm text-[#4D4548] leading-relaxed space-y-3 font-sans">
              <p>
                Dr. Kussh S. Mukhi is a highly specialized, internationally trained orthopaedic surgeon
                based in Mumbai, India, with a dedicated focus on advanced shoulder, elbow surgery, and
                hip surgery.
              </p>
              <p>
                Over his career, he has built a robust clinical practice that balances high-volume
                reconstructive trauma surgery with cutting-edge upper limb arthroscopy, complex shoulder
                arthroplasty, and advanced tendon transfers.
              </p>
              <p className="text-xs text-[#554D45] font-serif italic border-l-2 border-[#7B1E34] pl-3 py-0.5">
                Visiting Consultant & Shoulder Surgeon at Dr. Mukhi's Raj Hospital; Shoulder Specialist at L H Hiranandani Hospital, Powai.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onViewFullProfile}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#7B1E34] hover:text-[#541021] border-b-2 border-[#7B1E34] hover:border-[#541021] pb-1 transition-all cursor-pointer group"
              >
                <span className="tracking-wide">View Full Surgical Biosketch & Clinical Affiliations</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
