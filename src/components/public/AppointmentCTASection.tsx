import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { AestheticHospitalBackground } from '../common/VisualAvatar';
import { motion } from 'motion/react';

interface AppointmentCTASectionProps {
  onBook: () => void;
}

export const AppointmentCTASection: React.FC<AppointmentCTASectionProps> = ({
  onBook,
}) => {
  const { clinicInfo } = useClinic();

  return (
    <section className="relative overflow-hidden py-10 sm:py-20 bg-[#F5EFEB] border-t border-[#EAE2D8]">
      <AestheticHospitalBackground variant="subtle" overlayOpacity="bg-[#F5EFEB]/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 sm:space-y-3"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            Surgical Consultation & Expert Second Opinion
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#141213] leading-tight">
            Ready to discuss your mobility and joint health?
          </h2>

          <p className="text-xs sm:text-sm text-[#554D45] max-w-lg mx-auto leading-relaxed font-sans">
            Schedule an in-person surgical evaluation at Dr. Mukhi's Raj Hospital or arrange
            a comprehensive imaging and MRI review with Dr. Kush Mukhi.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4"
        >
          <button
            onClick={onBook}
            className="w-full sm:w-auto relative group overflow-hidden px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer burgundy-glow"
          >
            <Calendar className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Book an Appointment</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="w-full sm:w-auto px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#141213] hover:text-[#7B1E34] bg-white hover:bg-[#FDF4F6] border border-[#DDD3C5] hover:border-[#7B1E34]/40 rounded-xl transition-all hover:-translate-y-0.5 shadow-2xs flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#7B1E34]" />
            <span>Call Clinic: {clinicInfo.phone}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
