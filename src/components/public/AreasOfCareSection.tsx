import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AreasOfCareSectionProps {
  onSelectArea?: (areaTitle: string) => void;
}

export const AreasOfCareSection: React.FC<AreasOfCareSectionProps> = ({
  onSelectArea,
}) => {
  const careAreas = [
    {
      num: '01',
      title: 'Advanced Shoulder Arthroscopy',
      description: 'Minimally invasive keyhole repair for rotator cuff tears, labral Bankart lesions, subacromial bursitis, and recurrent shoulder instability.',
      badge: 'Minimally Invasive',
    },
    {
      num: '02',
      title: 'Complex Shoulder Arthroplasty',
      description: 'Precision anatomic total shoulder replacement and Reverse Shoulder Arthroplasty (RTSA) for cuff tear arthropathy and severe glenohumeral arthritis.',
      badge: 'Joint Replacement',
    },
    {
      num: '03',
      title: 'Upper Limb & Elbow Reconstruction',
      description: 'Advanced surgical solutions for triceps injuries, resistant tennis elbow, collateral ligament stabilization, and complex tendon transfers.',
      badge: 'Reconstruction',
    },
    {
      num: '04',
      title: 'Advanced Hip Surgery & Joint Preservation',
      description: 'Early joint preservation for femoroacetabular impingement (FAI), acetabular labral refixation, and biological joint optimization.',
      badge: 'Preservation',
    },
    {
      num: '05',
      title: 'High-Volume Reconstructive Trauma Surgery',
      description: 'Expert emergency and elective reconstruction for complex periarticular fractures, non-unions, and multi-ligament traumatic injuries.',
      badge: 'Trauma Mastery',
    },
  ];

  return (
    <section className="py-20 bg-[#FCFBF9]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-12"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            Surgical Care Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141213] mt-2">
            Targeted orthopaedic & reconstructive surgery.
          </h2>
          <p className="text-xs sm:text-sm text-[#554D45] mt-2 font-sans">
            Led by Dr. Kush Mukhi at Dr. Mukhi's Raj Hospital and L H Hiranandani Hospital, Powai.
          </p>
        </motion.div>

        <div className="border-t border-[#EAE2D8] divide-y divide-[#EAE2D8]">
          {careAreas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => onSelectArea && onSelectArea(area.title)}
              className="py-6 sm:py-7 group flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-[#FDF4F6]/75 transition-all duration-300 cursor-pointer px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl hover:border-l-4 hover:border-[#7B1E34] hover:shadow-xs"
            >
              <div className="flex items-start gap-4 sm:max-w-md">
                <span className="font-mono text-sm font-semibold text-[#7B1E34] opacity-80 pt-0.5">
                  {area.num}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#141213] group-hover:text-[#7B1E34] transition-colors">
                    {area.title}
                  </h3>
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-[#7B1E34] font-semibold bg-[#F9E8EC] px-2 py-0.5 rounded">
                    {area.badge}
                  </span>
                </div>
              </div>

              <div className="flex-1 sm:max-w-lg pl-7 sm:pl-0">
                <p className="text-xs sm:text-sm text-[#554D45] leading-relaxed group-hover:text-[#141213] transition-colors">
                  {area.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#7B1E34] opacity-75 group-hover:opacity-100 transition-all shrink-0 pl-7 sm:pl-0">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
