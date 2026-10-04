import React, { useState } from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { AestheticHospitalBackground } from '../common/VisualAvatar';
import { motion } from 'motion/react';

interface PublicServicesViewProps {
  onBook: () => void;
  initialSelected?: string;
}

export const PublicServicesView: React.FC<PublicServicesViewProps> = ({
  onBook,
  initialSelected,
}) => {
  const services = [
    {
      id: 'shoulder-arthroscopy',
      title: 'Advanced Shoulder Arthroscopy',
      tagline: 'Minimally invasive keyhole repair for rotator cuff tears and instability.',
      overview:
        'Using advanced 4K arthroscopic visualization, Dr. Kush Mukhi performs precise tendon repairs, subacromial decompression, and labral stabilization through tiny incisions, preserving deltoid integrity and accelerating post-operative functional recovery.',
      includes: [
        'Arthroscopic Rotator Cuff Repair (Single-row & Double-row SutureBridge technique)',
        'Anteroinferior Labral Repair (Bankart lesion stabilization for recurrent dislocations)',
        'Subacromial Decompression & Acromioplasty for impingement syndrome',
        'Biceps Tenodesis / Tenotomy for SLAP tears and chronic tendon pain',
        'Capsular release for refractory frozen shoulder (Adhesive Capsulitis)',
      ],
      duration: '45 min clinical consultation & MRI review',
    },
    {
      id: 'shoulder-replacement',
      title: 'Complex Shoulder Arthroplasty',
      tagline: 'Anatomic total shoulder & Reverse Shoulder Arthroplasty (RTSA).',
      overview:
        'For end-stage glenohumeral osteoarthritis, severe cuff tear arthropathy, and complex proximal humerus fractures, Dr. Kush Mukhi utilizes 3D CT surgical pre-planning and patient-specific instrumentation to restore shoulder kinematics, eliminate pain, and restore overhead elevation.',
      includes: [
        'Reverse Total Shoulder Arthroplasty (RTSA) for cuff-deficient shoulders',
        'Anatomic Total Shoulder Arthroplasty for primary osteoarthritis with intact cuff',
        '3D Glenoid Vault CT reconstruction and pre-operative digital templating',
        'Revision shoulder arthroplasty for failed prior implants or instability',
        'Hemiarthroplasty for complex multi-part proximal humerus fractures',
      ],
      duration: '45-60 min surgical planning session',
    },
    {
      id: 'upper-limb-elbow',
      title: 'Upper Limb & Elbow Surgery',
      tagline: 'Precision surgical reconstruction for elbow instability and tendon pathology.',
      overview:
        'Targeted surgical care for acute and degenerative upper limb conditions, balancing tendon transfers for motor recovery with ligamentous repair for stiff or unstable elbows.',
      includes: [
        'Advanced Tendon Transfers for neurological deficit and irreversible cuff tears (Latissimus dorsi transfer)',
        'Elbow Arthroscopy for loose body removal and osteocapsular release',
        'Lateral & Medial Epicondylitis surgical debridement for resistant tennis elbow',
        'Distal Biceps Tendon anatomical repair using cortical buttons',
        'Ulnar Collateral Ligament (UCL) reconstruction and cubital tunnel decompression',
      ],
      duration: '30-45 min consultation',
    },
    {
      id: 'hip-preservation',
      title: 'Advanced Hip Surgery & Joint Preservation',
      tagline: 'Joint-preserving solutions for femoroacetabular impingement (FAI) and labral tears.',
      overview:
        'Preserving natural hip biomechanics before irreversible arthritis develops. Special focus on dynamic radiological evaluation, acetabular labral refixation, and femoral cam osteochondroplasty.',
      includes: [
        'Femoroacetabular Impingement (FAI) osteochondroplasty for Cam and Pincer lesions',
        'Acetabular Labral Tear repair with specialized suture anchors',
        'Core decompression and biological augmentation for early Avascular Necrosis (AVN)',
        'Dynamic pelvifemoral radiographic and 3T MRI cartilage mapping',
      ],
      duration: '45 min joint preservation assessment',
    },
    {
      id: 'reconstructive-trauma',
      title: 'High-Volume Reconstructive Trauma Surgery',
      tagline: 'Expert acute and elective reconstruction for complex joint and limb trauma.',
      overview:
        'Dr. Mukhi balances outpatient elective joint care with extensive high-volume emergency trauma surgery, reconstructing periarticular fractures, non-unions, and multi-ligament traumatic joint injuries.',
      includes: [
        'Complex periarticular fracture fixation (Proximal humerus, clavicle, scapula, elbow, hip)',
        'Correction of non-unions, malunions, and post-traumatic deformity',
        'Surgical management of acute joint dislocations with bone loss',
        'Minimally invasive biological plating (MIPO technique)',
      ],
      duration: 'Urgent Casualty & Elective Clinic Evaluation',
    },
  ];

  const [activeService, setActiveService] = useState(
    services.find((s) => s.title === initialSelected) || services[0]
  );

  return (
    <div className="relative py-6 sm:py-16 bg-[#FCFBF9]">
      <AestheticHospitalBackground overlayOpacity="bg-[#FCFBF9]/92" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 space-y-6 sm:space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-1.5 sm:space-y-2"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            Orthopaedic & Joint Reconstruction Specialties
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#141213]">
            Surgical mastery for joint restoration.
          </h1>
          <p className="text-xs sm:text-sm text-[#554D45]">
            Led by Dr. Kush Mukhi, MBBS, M.S. (Orthopaedic) · Dr. Mukhi's Raj Hospital & L H Hiranandani Hospital, Powai.
          </p>
        </motion.div>

        {/* 2-Column Split: Services List and Active Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Services Selector Navigation */}
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s)}
                className={`w-full text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                  activeService.id === s.id
                    ? 'bg-white border-[#7B1E34] shadow-sm -translate-y-0.5 ring-1 ring-[#7B1E34]/20'
                    : 'bg-[#F7F2EC]/80 border-[#EAE2D8] hover:bg-white hover:border-[#DDD3C5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-serif font-bold text-[#141213]">
                    {s.title}
                  </h3>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform shrink-0 ${
                      activeService.id === s.id ? 'text-[#7B1E34] translate-x-1' : 'text-[#82787C]'
                    }`}
                  />
                </div>
                <p className="text-[11px] sm:text-xs text-[#554D45] mt-1 line-clamp-2 font-sans">
                  {s.tagline}
                </p>
              </button>
            ))}
          </div>

          {/* Active Detail Canvas */}
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-[#DDD3C5] shadow-xs space-y-4 sm:space-y-6"
          >
            <div>
              <span className="text-xs text-[#7B1E34] font-semibold font-mono bg-[#FDF4F6] px-3 py-1 rounded-full border border-[#F2D5DC]">
                {activeService.duration}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#141213] mt-3">
                {activeService.title}
              </h2>
              <p className="text-sm text-[#7B1E34] italic mt-1 font-serif">
                "{activeService.tagline}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#4D4548] leading-relaxed border-t border-[#EAE2D8] pt-4 font-sans">
              {activeService.overview}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#141213] uppercase tracking-wider font-display">
                Clinical Scope & Surgical Procedures Included
              </h4>
              <ul className="space-y-2.5">
                {activeService.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#3E373A]">
                    <Check className="w-4 h-4 text-[#7B1E34] shrink-0 mt-0.5" />
                    <span className="font-sans">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-[#EAE2D8] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#7B7175]">
                Consultations at Bandra West (Raj Hospital) & Powai
              </span>
              <button
                onClick={onBook}
                className="px-6 py-3 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer burgundy-glow"
              >
                <span>Book This Specialty</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
