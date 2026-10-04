import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { AestheticHospitalBackground } from '../common/VisualAvatar';
import { Award, BookOpen, GraduationCap, Building2, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PublicDoctorViewProps {
  onBook: () => void;
}

export const PublicDoctorView: React.FC<PublicDoctorViewProps> = ({ onBook }) => {
  const { clinicInfo } = useClinic();

  const clinicalAffiliations = [
    {
      role: 'Visiting Consultant & Shoulder Surgeon',
      hospital: "Dr. Mukhi's Raj Hospital",
      location: 'Bandra West, Mumbai',
      type: 'Primary Centre',
    },
    {
      role: 'Shoulder Specialist & Visiting Consultant',
      hospital: 'L H Hiranandani Hospital',
      location: 'Powai, Mumbai',
      type: 'Specialty OPD',
    },
  ];

  const qualifications = [
    {
      degree: 'M.S. (Orthopaedics)',
      institution: 'Topiwala National Medical College & B.Y.L. Nair Charitable Hospital, Mumbai',
      year: 'Postgraduate Surgical Master Degree',
    },
    {
      degree: 'M.B.B.S.',
      institution: 'Maharashtra University of Health Sciences (MUHS)',
      year: 'Undergraduate Medical Degree',
    },
    {
      degree: 'International Shoulder & Arthroscopy Fellowship',
      institution: 'Advanced Upper Limb Reconstructive Training Center',
      year: 'Subspecialty Surgical Certification',
    },
  ];

  const focusAreas = [
    'Rotator Cuff Arthroscopic Repair (Single & Double Row)',
    'Reverse & Anatomic Total Shoulder Arthroplasty (RTSA / TSA)',
    'Recurrent Shoulder Instability (Bankart & Latarjet Procedure)',
    'Upper Limb & Elbow Surgery with Tendon Transfers',
    'Advanced Hip Preservation & Labral Refixation',
    'High-Volume Reconstructive Trauma & Non-Union Management',
    'Sports Medicine & Joint Instability Stabilization',
  ];

  return (
    <div className="relative py-6 sm:py-16 bg-[#FCFBF9]">
      <AestheticHospitalBackground overlayOpacity="bg-[#FCFBF9]/92" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 space-y-8 sm:space-y-16">
        {/* Top Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
        >
          {/* Desktop Left: Clean Full Photo of Dr. Kush Mukhi (NOT a card) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-start">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg border border-[#EAE2D8]">
              <img
                src="/dr-kush-mukhi.jpg"
                alt="Dr. Kush Mukhi - Orthopaedic Surgeon"
                className="w-full h-[460px] object-cover object-top hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Mobile Header: Title and Prominent Full Photo */}
            <div className="space-y-3 lg:block">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
                  Consultant Orthopaedic & Shoulder Surgeon
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#141213] mt-0.5">
                  Dr. Kush Mukhi
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#7B1E34] font-mono mt-0.5">
                  MBBS, M.S. (Orthopaedic) · Visiting Consultant
                </p>
              </div>

              {/* Mobile Photo: High-Visibility Large Portrait */}
              <div className="lg:hidden w-full max-w-[280px] sm:max-w-xs h-[340px] sm:h-[400px] mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-white bg-[#F7F2EC]">
                <img
                  src="/dr-kush-mukhi.jpg"
                  alt="Dr. Kush Mukhi"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] saturate-[1.05]"
                />
              </div>
            </div>

            {/* Biosketch Box */}
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/95 border border-[#DDD3C5] shadow-2xs space-y-2.5 font-sans">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#7B1E34] font-bold font-display block">
                Professional Surgical Profile
              </span>
              <p className="text-xs sm:text-sm text-[#3E3639] leading-relaxed">
                Dr. Kussh S. Mukhi is a highly specialized, internationally trained orthopaedic surgeon
                based in Mumbai, India, with a dedicated focus on advanced shoulder, elbow surgery and
                hip surgery.
              </p>
              <p className="text-xs sm:text-sm text-[#3E3639] leading-relaxed">
                Over his career, he has built a robust clinical practice that balances high-volume
                reconstructive trauma surgery with cutting-edge upper limb arthroscopy, complex shoulder
                arthroplasty, and advanced tendon transfers.
              </p>
              <p className="text-xs sm:text-sm text-[#7B1E34] font-semibold pt-0.5">
                He currently serves as a Consultant and Shoulder Surgeon at Dr. Mukhi's Raj Hospital
                and as a Shoulder Specialist at L H Hiranandani Hospital in Powai.
              </p>
            </div>

            <div className="pt-1">
              <button
                onClick={onBook}
                className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer burgundy-glow"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation with Dr. Kush Mukhi</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Current Hospital Positions */}
        <div className="border-t border-[#EAE2D8] pt-6 sm:pt-12 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#7B1E34]" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#141213]">
              Hospital Appointments & Clinical Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            {clinicalAffiliations.map((aff, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#DDD3C5] shadow-2xs space-y-1.5"
              >
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#7B1E34] bg-[#FDF4F6] border border-[#F2D5DC] px-2 py-0.5 rounded inline-block">
                  {aff.type}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#141213] font-serif">
                  {aff.role}
                </h3>
                <div className="text-xs font-semibold text-[#7B1E34]">
                  {aff.hospital}
                </div>
                <div className="text-[11px] sm:text-xs text-[#554D45]">
                  {aff.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Qualifications & Degrees */}
        <div className="border-t border-[#EAE2D8] pt-6 sm:pt-12 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#7B1E34]" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#141213]">
              Qualifications & Surgical Training
            </h2>
          </div>

          <div className="space-y-3">
            {qualifications.map((q, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#EAE2D8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4"
              >
                <div>
                  <div className="font-bold text-sm sm:text-base text-[#141213] font-serif">
                    {q.degree}
                  </div>
                  <div className="text-xs text-[#554D45] mt-0.5">
                    {q.institution}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#7B1E34] shrink-0 font-medium">
                  {q.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Clinical Focus Areas */}
        <div className="border-t border-[#EAE2D8] pt-6 sm:pt-12 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#7B1E34]" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#141213]">
              Specialist Surgical Focus Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-4 rounded-xl bg-white border border-[#EAE2D8] shadow-2xs flex items-center gap-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-[#7B1E34] shrink-0" />
                <span className="text-xs sm:text-sm text-[#141213] font-medium font-sans">
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
