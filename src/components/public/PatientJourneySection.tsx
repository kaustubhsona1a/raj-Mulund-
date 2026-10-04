import React from 'react';
import { motion } from 'motion/react';

export const PatientJourneySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Clinical Evaluation',
      desc: 'Comprehensive clinical examination, joint range-of-motion metrics, and biomechanical assessment.',
    },
    {
      num: '02',
      title: 'Targeted Imaging',
      desc: 'High-resolution 3T MRI, dynamic ultrasound, and thin-slice 3D CT reconstruction for surgical mapping.',
    },
    {
      num: '03',
      title: 'Personalized Care Plan',
      desc: 'Precision arthroscopic intervention, robotic joint replacement, or biological joint preservation.',
    },
    {
      num: '04',
      title: 'Structured Recovery',
      desc: 'Surgeon-monitored rehabilitation protocol guiding safe return to active sports and daily mobility.',
    },
  ];

  return (
    <section className="py-8 sm:py-16 bg-[#F7F2EC]/60 border-t border-[#EAE2D8]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-6 sm:mb-10"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            The Patient Pathway
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#141213] mt-1 sm:mt-2">
            Structured, restorative orthopaedic care.
          </h2>
          <p className="text-xs sm:text-sm text-[#554D45] mt-1">
            Every step at Raj Hospital is designed for transparent clinical guidance and optimal surgical outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative space-y-2 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 hover:bg-white border border-[#E7DFD4] hover:border-[#7B1E34]/35 transition-all duration-300 shadow-2xs group"
            >
              <span className="block font-mono text-xl sm:text-2xl font-bold text-[#7B1E34] group-hover:scale-105 transition-transform origin-left">
                {step.num}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#141213] group-hover:text-[#7B1E34] transition-colors leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-[#554D45] leading-relaxed font-sans">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
