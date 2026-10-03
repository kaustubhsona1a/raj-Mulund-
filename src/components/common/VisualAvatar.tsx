import React, { useState } from 'react';

interface DoctorVisualProps {
  className?: string;
  variant?: 'hero' | 'profile' | 'compact';
}

/**
 * High-Fidelity Doctor Representation for Dr. Kush Mukhi
 * Uses the official real photograph stored in /dr-kush-mukhi.jpg
 */
export const DoctorVisual: React.FC<DoctorVisualProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-[#14181F] border border-[#DDD3C5] shadow-2xl flex flex-col justify-end group ${className}`}
    >
      {/* Studio Lighting & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#141213]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#141213]/90 via-[#141213]/40 to-transparent" />
        {/* Subtle Burgundy rim reflection */}
        <div className="absolute bottom-6 right-0 w-64 h-64 bg-[#7B1E34]/25 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Real Photograph of Dr. Kush Mukhi */}
      <div className="relative w-full h-full min-h-[420px] overflow-hidden flex items-center justify-center bg-[#1B212B]">
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
 * Aesthetic Modern Hospital Architecture Visual Background
 * Uses the high-resolution modern hospital architectural photograph stored in /hospital-modern-bg.jpg
 * with an architectural balance so the hospital building is clearly visible and aesthetic.
 */
export const AestheticHospitalBackground: React.FC<{
  className?: string;
  overlayOpacity?: string;
}> = ({ className = '', overlayOpacity = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* High-Resolution Modern Architectural Hospital Image */}
      <img
        src="/hospital-modern-bg.jpg"
        alt="Raj Hospital Modern Architecture"
        className="w-full h-full object-cover object-right-top md:object-center filter saturate-[0.9] contrast-[1.05] opacity-35"
        loading="eager"
      />

      {/* Elegant Architectural Gradient Overlay: keeps text 100% crisp on the left, showcases hospital on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FCFBF9] via-[#FCFBF9]/85 to-[#FCFBF9]/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF9]/80 via-transparent to-[#FCFBF9]" />

      {/* Subtle Burgundy architectural aura */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[350px] bg-[#7B1E34]/8 rounded-full blur-[100px]" />
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
