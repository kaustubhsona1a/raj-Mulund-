import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { MapPin, Clock, Phone, Mail, Navigation, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const LocationContactSection: React.FC = () => {
  const { clinicInfo } = useClinic();

  return (
    <section className="py-8 sm:py-16 bg-[#FCFBF9] border-t border-[#EAE2D8]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-5 sm:space-y-6"
          >
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
                Hospital Locations & Consultation Suites
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#141213] mt-1">
                Where to consult Dr. Kush Mukhi.
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              {/* Primary: Dr. Mukhi's Raj Hospital */}
              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#EAE2D8] hover:border-[#7B1E34]/40 transition-all shadow-2xs">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#141213] font-serif text-sm sm:text-base">
                    Dr. Mukhi's Raj Hospital (Primary Centre)
                  </div>
                  <div className="text-[#554D45] mt-0.5 text-[11px] sm:text-xs">{clinicInfo.address}</div>
                  <div className="text-[10px] sm:text-[11px] text-[#7B1E34] font-medium mt-1">
                    Bandra West, Mumbai · Advanced Orthopaedics & Trauma Wing
                  </div>
                </div>
              </div>

              {/* Affiliated: L H Hiranandani Hospital */}
              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#EAE2D8] hover:border-[#7B1E34]/40 transition-all shadow-2xs">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#141213] font-serif text-sm sm:text-base">
                    L H Hiranandani Hospital (Visiting Consultant)
                  </div>
                  <div className="text-[#554D45] mt-0.5 text-[11px] sm:text-xs">
                    Hillside Avenue, Hiranandani Gardens, Powai, Mumbai
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#7B1E34] font-medium mt-1">
                    Shoulder Specialty & Joint Arthroplasty OPD
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8]">
                <div className="p-2 rounded-lg bg-[#F5EFEB] text-[#141213] shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#7B1E34]" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="font-semibold text-[#141213] text-[11px] sm:text-xs">OPD Consultation Timings</div>
                  <div className="text-[#554D45] text-[11px] sm:text-xs">
                    <span className="font-medium text-[#141213]">Mon – Fri:</span> {clinicInfo.openingHours.weekdays}
                  </div>
                  <div className="text-[#554D45] text-[11px] sm:text-xs">
                    <span className="font-medium text-[#141213]">Saturday:</span> {clinicInfo.openingHours.saturday}
                  </div>
                </div>
              </div>

              {/* Direct Concierge Contact */}
              <div className="pt-2 border-t border-[#EAE2D8] flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2 text-[#554D45]">
                  <Phone className="w-3.5 h-3.5 text-[#7B1E34] shrink-0" />
                  <span>Hospital Desk: </span>
                  <a
                    href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-mono text-[#141213] font-semibold hover:text-[#7B1E34] transition-colors"
                  >
                    {clinicInfo.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[#554D45]">
                  <Mail className="w-3.5 h-3.5 text-[#7B1E34] shrink-0" />
                  <span>Email: </span>
                  <a
                    href={`mailto:${clinicInfo.email}`}
                    className="font-mono text-[#141213] font-semibold hover:text-[#7B1E34] transition-colors truncate"
                  >
                    {clinicInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Architectural Map Visual */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#EAE2D8] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#141213]">
                    Mumbai Location Map
                  </h3>
                  <p className="text-[11px] text-[#6E6367]">
                    Serving Bandra West, Powai, and Greater Mumbai
                  </p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent("Dr. Mukhi's Raj Hospital Bandra West Mumbai")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] text-xs font-semibold hover:bg-[#F9E8EC] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Map embed / aesthetic view */}
              <div className="w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-[#EAE2D8] bg-[#F5EFEB] relative">
                <iframe
                  title="Raj Hospital Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.396734185202!2d72.828249!3d19.057288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9179d638dc5%3A0xb5dbfb8972f750b2!2sDr%20Mukhi&#39;s%20Raj%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] sm:text-xs">
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE2D8]">
                  <span className="font-semibold text-[#141213] block">Bandra West OPD</span>
                  <span className="text-[#6E6367]">OPD Suite 2 · Ground Floor, Raj Hospital</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE2D8]">
                  <span className="font-semibold text-[#141213] block">Powai OPD</span>
                  <span className="text-[#6E6367]">Visiting Specialty Wing, Hiranandani Hospital</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
