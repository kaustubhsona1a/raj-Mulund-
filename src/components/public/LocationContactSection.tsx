import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { MapPin, Clock, Phone, Mail, Navigation, Building2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const LocationContactSection: React.FC = () => {
  const { clinicInfo } = useClinic();

  return (
    <section className="py-20 bg-[#FCFBF9] border-t border-[#EAE2D8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
                Hospital Locations & Consultation Suites
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#141213] mt-1">
                Where to consult Dr. Kush Mukhi.
              </h2>
            </div>

            <div className="space-y-6 text-sm">
              {/* Primary: Dr. Mukhi's Raj Hospital */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EAE2D8] hover:border-[#7B1E34]/40 transition-all hover-lift">
                <div className="p-2.5 rounded-xl bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#141213] font-serif text-base">
                    Dr. Mukhi's Raj Hospital (Primary Centre)
                  </div>
                  <div className="text-[#554D45] mt-0.5 text-xs">{clinicInfo.address}</div>
                  <div className="text-[11px] text-[#7B1E34] font-medium mt-1">
                    Bandra West, Mumbai · Advanced Orthopaedics & Trauma Wing
                  </div>
                </div>
              </div>

              {/* Affiliated: L H Hiranandani Hospital */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EAE2D8] hover:border-[#7B1E34]/40 transition-all hover-lift">
                <div className="p-2.5 rounded-xl bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#141213] font-serif text-base">
                    L H Hiranandani Hospital (Visiting Consultant)
                  </div>
                  <div className="text-[#554D45] mt-0.5 text-xs">
                    Hillside Avenue, Hiranandani Gardens, Powai, Mumbai
                  </div>
                  <div className="text-[11px] text-[#7B1E34] font-medium mt-1">
                    Shoulder Specialty & Joint Arthroplasty OPD
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#F5EFEB] text-[#141213] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#7B1E34]" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-[#141213] text-xs">OPD Consultation Timings</div>
                  <div className="text-xs text-[#554D45]">
                    <span className="font-medium text-[#141213]">Monday – Friday:</span>{' '}
                    {clinicInfo.openingHours.weekdays}
                  </div>
                  <div className="text-xs text-[#554D45]">
                    <span className="font-medium text-[#141213]">Saturday:</span>{' '}
                    {clinicInfo.openingHours.saturday}
                  </div>
                  <div className="text-[11px] text-[#7B1E34] font-medium pt-0.5">
                    Sunday: {clinicInfo.openingHours.sunday}
                  </div>
                </div>
              </div>

              {/* Direct Concierge Contact */}
              <div className="pt-2 border-t border-[#EAE2D8] flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#554D45]">
                  <Phone className="w-3.5 h-3.5 text-[#7B1E34]" />
                  <span>Hospital Desk: </span>
                  <a
                    href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-mono text-[#141213] font-semibold hover:text-[#7B1E34] transition-colors"
                  >
                    {clinicInfo.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[#554D45]">
                  <Mail className="w-3.5 h-3.5 text-[#7B1E34]" />
                  <span>Clinical Concierge: </span>
                  <a
                    href={`mailto:${clinicInfo.email}`}
                    className="font-mono text-[#141213] font-semibold hover:text-[#7B1E34] transition-colors"
                  >
                    {clinicInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Architectural Map Visual */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-[#DDD3C5] bg-[#F5EFEB] overflow-hidden p-2 shadow-xs hover-lift">
              <div className="relative h-96 w-full rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#EAE2D8]">
                {/* Architectural Map Background Canvas */}
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-cover text-[#DDD3C5]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Arabian Sea / Coastline Accent */}
                  <path
                    d="M0 0 L260 0 Q210 180 270 320 Q310 420 280 500 L0 500 Z"
                    fill="#EBE5DC"
                    opacity="0.6"
                  />
                  <text x="50" y="260" fill="#9E9184" fontSize="12" fontFamily="serif" letterSpacing="0.1em" opacity="0.7">
                    ARABIAN SEA (MUMBAI WEST COAST)
                  </text>

                  {/* S.V. Road & Western Express Highway Major Arterials */}
                  <path d="M290 0 L320 500" stroke="#DDD3C5" strokeWidth="10" />
                  <path d="M290 0 L320 500" stroke="#FFFFFF" strokeWidth="5" />

                  <path d="M480 0 L490 500" stroke="#DDD3C5" strokeWidth="12" />
                  <path d="M480 0 L490 500" stroke="#FAF8F5" strokeWidth="6" />

                  {/* Cross Streets */}
                  <line x1="200" y1="130" x2="800" y2="130" stroke="#DDD3C5" strokeWidth="4" />
                  <line x1="200" y1="240" x2="800" y2="240" stroke="#DDD3C5" strokeWidth="6" />
                  <line x1="200" y1="360" x2="800" y2="360" stroke="#DDD3C5" strokeWidth="4" />

                  {/* Raj Hospital Marker in Bandra West */}
                  <circle cx="330" cy="240" r="32" fill="#7B1E34" fillOpacity="0.12" />
                  <circle cx="330" cy="240" r="14" fill="#7B1E34" />
                  <circle cx="330" cy="240" r="4" fill="#FFFFFF" />

                  {/* Powai Pin for Hiranandani Hospital */}
                  <circle cx="620" cy="140" r="26" fill="#7B1E34" fillOpacity="0.12" />
                  <circle cx="620" cy="140" r="10" fill="#541021" />
                  <circle cx="620" cy="140" r="3" fill="#FFFFFF" />
                </svg>

                {/* Map Overlay Card: Raj Hospital */}
                <div className="absolute top-6 left-6 p-4 bg-[#FCFBF9]/95 backdrop-blur-md border border-[#DDD3C5] rounded-xl shadow-md max-w-xs">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#7B1E34] tracking-wider font-display">
                    <span className="w-2 h-2 rounded-full bg-[#7B1E34] animate-pulse" />
                    <span>Primary Surgical Center</span>
                  </div>
                  <div className="font-serif font-bold text-sm text-[#141213] mt-1">
                    Dr. Mukhi's Raj Hospital
                  </div>
                  <div className="text-[11px] text-[#554D45] mt-0.5">
                    S.V. Road, Bandra West, Mumbai
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#EAE2D8] flex items-center justify-between text-[11px]">
                    <span className="text-[#7B1E34] font-medium">Valet & Emergency Access</span>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7B1E34] hover:underline flex items-center gap-0.5 font-semibold"
                    >
                      <span>Directions</span>
                      <Navigation className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Second Pin Overlay: Powai Hiranandani */}
                <div className="absolute bottom-6 right-6 p-3.5 bg-[#FCFBF9]/95 backdrop-blur-md border border-[#DDD3C5] rounded-xl shadow-md max-w-[240px]">
                  <div className="text-[10px] uppercase font-bold text-[#554D45] tracking-wider font-display">
                    Visiting Consultant OPD
                  </div>
                  <div className="font-serif font-bold text-xs text-[#141213] mt-0.5">
                    L H Hiranandani Hospital
                  </div>
                  <div className="text-[10px] text-[#554D45]">Powai, Mumbai</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
