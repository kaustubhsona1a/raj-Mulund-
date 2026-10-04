import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ArrowUpRight, ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';

interface PublicFooterProps {
  onNavigate: (view: string) => void;
  onOpenDoctorOS: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onNavigate,
  onOpenDoctorOS,
}) => {
  const { clinicInfo } = useClinic();

  return (
    <footer className="bg-[#141213] text-[#FAF8F5] py-8 sm:py-14 border-t border-[#262123]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-[#2B2528]">
          {/* Col 1: Wordmark & Tagline */}
          <div className="md:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                {clinicInfo.name}
              </span>
              <p className="text-xs text-[#D67087] font-display tracking-widest uppercase">
                Dr. Mukhi's Orthopaedic Centre
              </p>
            </div>
            <p className="text-xs text-[#A89CA2] leading-relaxed max-w-sm font-sans">
              Advanced shoulder arthroscopy, complex joint replacement, upper limb reconstruction,
              and trauma care led by Dr. Kush Mukhi, MS (Orthopaedic).
            </p>
            <div className="pt-2 text-xs text-[#D8CCC0] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D67087]" />
                <span>Dr. Mukhi's Raj Hospital, S.V. Road, Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D67087]" />
                <span>Concierge: {clinicInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D67087] font-bold font-display">
              Clinical Services
            </span>
            <ul className="space-y-2 text-xs text-[#C8BCBF]">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shoulder Arthroscopy & Rotator Cuff
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reverse Shoulder Replacement (RTSA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Elbow Surgery & Tendon Transfers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hip Preservation & Labral Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  High-Volume Trauma Surgery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practice & Doctor */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D67087] font-bold font-display">
              Hospital
            </span>
            <ul className="space-y-2 text-xs text-[#C8BCBF]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Hospital
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('doctor')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dr. Kush Mukhi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Book Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Patient Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Locations & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Doctor OS Portal Direct Access */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D67087] font-bold font-display">
              Internal Clinical OS
            </span>
            <div className="p-4 rounded-xl bg-[#1E1A1C] border border-[#332A2D] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-[#D67087]" />
                <span>Raj Hospital Doctor OS</span>
              </div>
              <p className="text-[11px] text-[#A89CA2] leading-relaxed">
                Secure clinical electronic medical records, consultation suite, and hospital billing portal.
              </p>
              <button
                onClick={onOpenDoctorOS}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#93243E] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Doctor OS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Emergency Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#82787C]">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Dr. Mukhi's Raj Hospital. All rights reserved.</p>
            <p className="text-[11px] text-[#695F63]">
              Emergency Trauma & Acute Fractures: Call 24/7 on{' '}
              <a href={`tel:${clinicInfo.emergencyPhone}`} className="text-[#D67087] font-mono hover:underline">
                {clinicInfo.emergencyPhone}
              </a>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Privacy & Medical Records Policy
            </button>
            <span className="text-[#3A3336]">·</span>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Terms of Care
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
