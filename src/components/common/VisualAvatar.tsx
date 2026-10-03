import React, { useState } from 'react';

interface DoctorVisualProps {
  className?: string;
  variant?: 'hero' | 'profile' | 'compact';
}

/**
 * High-Fidelity Doctor Representation for Dr. Kush Mukhi
 * Displays the real official photograph without heavy dark shading
 */
export const DoctorVisual: React.FC<DoctorVisualProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-[#F8F5F1] border-2 border-white/80 shadow-[0_20px_50px_rgba(20,18,19,0.12)] flex flex-col justify-end group ring-1 ring-[#EAE2D8] ${className}`}
    >
      {/* Real Photograph of Dr. Kush Mukhi - Clean, natural lighting with zero heavy black shading */}
      <div className="relative w-full h-full min-h-[420px] overflow-hidden flex items-center justify-center bg-[#F2EDE7]">
        <img
          src="/dr-kush-mukhi.jpg"
          alt="Dr. Kush Mukhi, MS (Orthopaedic) - Consultant & Shoulder Surgeon"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            // Fallback to absolute URL if local path fails
            const target = e.currentTarget;
            if (!imageError) {
              setImageError(true);
              target.src = 'https://www.hiranandanihospital.org/public/our_doctors_images/1781342833.jpg';
            }
          }}
          loading="eager"
        />

        {/* Delicate subtle bottom gradient just behind the plaque for natural integration */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141213]/40 to-transparent pointer-events-none" />
      </div>

      {/* Editorial Physician Plaque */}
      {variant !== 'compact' && (
        <div className="relative z-20 px-6 py-4 bg-[#FCFBF9]/95 backdrop-blur-md border-t border-[#EAE2D8] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-sans">
              Consultant & Shoulder Surgeon
            </div>
            <div className="text-base font-serif font-bold text-[#141213]">
              Dr. Kush Mukhi
            </div>
            <div className="text-[11px] text-[#554D45]">
              MBBS, M.S. (Orthopaedic)
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="font-semibold text-[#7B1E34] block font-sans tracking-wide">
              Raj Hospital
            </span>
            <span className="text-[10px] text-[#82787C] block font-medium">
              Mumbai · Bandra & Powai
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Aesthetic Modern Glass Hospital Architecture Visual Background
 * Highlights the modern glass building facade and lush green grass lawn
 * with high visibility and smart gradient balancing.
 */
export const AestheticHospitalBackground: React.FC<{
  className?: string;
  overlayOpacity?: string;
  variant?: 'hero' | 'subtle' | 'card';
}> = ({ className = '', overlayOpacity = '', variant }) => {
  const activeVariant = variant || (overlayOpacity ? 'subtle' : 'hero');
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* High-Resolution Modern Architectural Glass Hospital with Green Grass Lawn */}
      <img
        src="/hospital-modern-bg.jpg"
        alt="Raj Hospital Modern Glass Pavilion & Grounds"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          activeVariant === 'hero'
            ? 'object-center md:object-[center_35%] filter saturate-[1.1] contrast-[1.03] opacity-85'
            : 'object-center filter saturate-[0.95] contrast-[1.0] opacity-35'
        }`}
        loading="eager"
      />

      {/* Hero Balanced Overlay: Keeps building glass and lawn visible while preserving text contrast */}
      {activeVariant === 'hero' ? (
        <>
          {/* Left-to-right soft fade that cushions the text while leaving the center & right crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCFBF9]/95 via-[#FCFBF9]/65 to-transparent w-full lg:w-3/5" />
          {/* Subtle top edge fade for seamless navbar transition */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FCFBF9]/90 via-[#FCFBF9]/40 to-transparent" />
          {/* Subtle bottom edge blend into next section */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FCFBF9] via-[#FCFBF9]/40 to-transparent" />
          {/* Architectural ambient warm tint */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#7B1E34]/5 rounded-full blur-3xl pointer-events-none" />
        </>
      ) : (
        <div className={`absolute inset-0 ${overlayOpacity || 'bg-[#FCFBF9]/85'}`} />
      )}
    </div>
  );
};

/**
 * Interior Consultation Suite Architectural Photo
 */
export const ClinicInteriorVisual: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#EAE2D8] bg-[#FAF8F5] shadow-md group ${className}`}>
      <img
        src="/hospital-interior.jpg"
        alt="Raj Hospital Consultation Pavilion"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141213]/85 via-[#141213]/20 to-transparent" />
      <div className="absolute bottom-4 left-5 right-5 text-white">
        <div className="text-[10px] uppercase tracking-widest text-[#F2D5DC] font-bold">
          Dr. Mukhi's Raj Hospital
        </div>
        <div className="text-sm font-serif font-bold text-white">
          Advanced Joint Reconstruction & Surgical Suites
        </div>
      </div>
    </div>
  );
};

export const PatientAvatar: React.FC<{
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ name, size = 'md', className = '' }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  return (
    <div
      className={`rounded-full bg-[#FDF4F6] text-[#7B1E34] font-semibold flex items-center justify-center border border-[#F2D5DC] select-none ${sizeClasses[size]} ${className}`}
    >
      {initials || 'P'}
    </div>
  );
};
