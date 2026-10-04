import React from 'react';

export const CredibilitySection: React.FC = () => {
  const credentials = [
    { value: 'M.S. Orthopaedics', label: 'Postgraduate Surgical Master', detail: 'Joint Reconstruction' },
    { value: 'Raj Hospital', label: 'Consultant & Surgeon', detail: 'Bandra West, Mumbai' },
    { value: 'L H Hiranandani', label: 'Powai Shoulder Specialist', detail: 'Visiting Specialty OPD' },
    { value: 'Upper Limb Fellow', label: 'International Arthroscopy', detail: 'Complex Arthroplasty' },
  ];

  return (
    <section className="border-y border-[#EAE2D8] bg-[#F7F2EC]/85 py-4 sm:py-8 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8 divide-y-0 md:divide-x divide-[#E2D9CC]">
          {credentials.map((item, idx) => (
            <div
              key={idx}
              className={`${idx > 0 ? 'md:pl-6 lg:pl-8' : ''} text-left group cursor-default transition-all p-2 sm:p-0 rounded-lg bg-white/40 md:bg-transparent`}
            >
              <div className="text-sm sm:text-xl lg:text-2xl font-serif font-bold text-[#141213] group-hover:text-[#7B1E34] transition-colors tabular-nums leading-tight">
                {item.value}
              </div>
              <div className="text-[10px] sm:text-xs text-[#554D45] mt-1 font-medium font-sans">
                {item.label}
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#82787C] font-mono mt-0.5">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
