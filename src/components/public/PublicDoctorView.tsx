import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorVisual, AestheticHospitalBackground } from '../common/VisualAvatar';
import { Award, BookOpen, GraduationCap, Building2, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PublicDoctorViewProps {
  onBook: () => void;
}

export const PublicDoctorView: React.FC<PublicDoctorViewProps> = ({ onBook }) => {
  const { clinicInfo } = useClinic();

  const clinicalAffiliations = [
    {
      role: 'Consultant & Shoulder Surgeon',
      hospital: "Dr. Mukhi's Raj Hospital",
      location: 'S.V. Road, Bandra West, Mumbai',
      type: 'Primary Surgical Practice',
    },
    {
      role: 'Shoulder Specialist & Visiting Consultant',
      hospital: 'L H Hiranandani Hospital',
      location: 'Hillside Avenue, Hiranandani Gardens, Powai, Mumbai',
      type: 'Visiting Specialty Consultant',
    },
  ];

  const qualifications = [
    {
      title: 'M.S. (Orthopaedic Surgery)',
      details: 'Postgraduate Master of Surgery in Orthopaedics',
      focus: 'Advanced Musculoskeletal Reconstruction & Trauma',
    },
    {
      title: 'M.B.B.S.',
      details: 'Bachelor of Medicine & Bachelor of Surgery',
      focus: 'Distinction in Clinical Surgery',
    },
    {
      title: 'International Upper Limb & Shoulder Fellowship',
      details: 'Advanced Arthroscopy & Complex Arthroplasty Fellowship',
      focus: 'Reverse Shoulder Replacement, Tendon Transfers & Dynamic Arthroscopy',
    },
  ];

  const focusAreas = [
    'Advanced Shoulder Arthroscopy & Rotator Cuff Reconstruction',
    'Complex Reverse Total Shoulder Arthroplasty (RTSA)',
    'Upper Limb & Elbow Surgery with Tendon Transfers',
    'Advanced Hip Preservation & Labral Refixation',
    'High-Volume Reconstructive Trauma & Non-Union Management',
    'Sports Medicine & Joint Instability Stabilization',
  ];

  return (
    <div className="relative py-12 md:py-20 bg-[#FCFBF9]">
      <AestheticHospitalBackground overlayOpacity="bg-[#FCFBF9]/92" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-16">
        {/* Top Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-sm hover-lift">
              <DoctorVisual className="w-full h-[480px]" variant="profile" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
                Consultant Orthopaedic & Shoulder Surgeon
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#141213] mt-1">
                Dr. Kush Mukhi
              </h1>
              <p className="text-sm font-semibold text-[#7B1E34] font-mono mt-1">
                MBBS, M.S. (Orthopaedic) · Visiting Consultant
              </p>
            </div>

            {/* Biosketch Quote Box */}
            <div className="p-6 rounded-2xl bg-white/95 border border-[#DDD3C5] shadow-xs space-y-3 font-sans">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#7B1E34] font-bold font-display block">
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
              <p className="text-xs sm:text-sm text-[#7B1E34] font-semibold pt-1">
                He currently serves as a Consultant and Shoulder Surgeon at Dr. Mukhi's Raj Hospital
                and as a Shoulder Specialist at L H Hiranandani Hospital in Powai.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onBook}
                className="px-7 py-3.5 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 cursor-pointer burgundy-glow"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation with Dr. Kush Mukhi</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Current Hospital Positions */}
        <div className="border-t border-[#EAE2D8] pt-12 space-y-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#7B1E34]" />
            <h2 className="text-2xl font-serif font-bold text-[#141213]">
              Hospital Appointments & Clinical Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {clinicalAffiliations.map((aff, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#DDD3C5] shadow-2xs hover-lift space-y-2"
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7B1E34] bg-[#FDF4F6] border border-[#F2D5DC] px-2.5 py-1 rounded-md inline-block">
                  {aff.type}
                </span>
                <h3 className="text-base font-bold text-[#141213] font-serif">
                  {aff.role}
                </h3>
                <div className="text-xs font-semibold text-[#7B1E34]">
                  {aff.hospital}
                </div>
                <div className="text-xs text-[#554D45]">
                  {aff.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Qualifications & Degrees */}
        <div className="border-t border-[#EAE2D8] pt-12 space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#7B1E34]" />
            <h2 className="text-2xl font-serif font-bold text-[#141213]">
              Qualifications & Surgical Training
            </h2>
          </div>

          <div className="space-y-4">
            {qualifications.map((q, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#DDD3C5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover-lift"
              >
                <div>
                  <h3 className="text-sm font-bold text-[#141213] font-serif">
                    {q.title}
                  </h3>
                  <p className="text-xs text-[#554D45] mt-0.5">{q.details}</p>
                </div>
                <span className="text-xs font-medium text-[#7B1E34] bg-[#FDF4F6] px-3.5 py-1 rounded-lg border border-[#F2D5DC]">
                  {q.focus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Sub-Specialty Focus */}
        <div className="border-t border-[#EAE2D8] pt-12 space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#7B1E34]" />
            <h2 className="text-2xl font-serif font-bold text-[#141213]">
              Dedicated Surgical Focus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {focusAreas.map((focus, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7DFD4] text-xs text-[#141213] font-medium flex items-center gap-2.5 hover-lift"
              >
                <span className="w-2 h-2 rounded-full bg-[#7B1E34] shrink-0" />
                <span>{focus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
