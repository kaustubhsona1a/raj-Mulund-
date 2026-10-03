import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ArrowUpRight, Menu, X, Shield, Phone } from 'lucide-react';

interface PublicNavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenDoctorOS: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentView,
  onNavigate,
  onOpenDoctorOS,
}) => {
  const { clinicInfo } = useClinic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'about', label: 'The Hospital' },
    { id: 'services', label: 'Specialties' },
    { id: 'doctor', label: 'Dr. Kush Mukhi' },
    { id: 'contact', label: 'Locations & Contact' },
    { id: 'portal', label: 'Patient Portal' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCFBF9]/92 backdrop-blur-xl border-b border-[#EAE2D8] transition-all">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with rich typography */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none flex items-baseline gap-2.5"
        >
          <div className="flex flex-col">
            <span className="text-2xl font-serif tracking-tight text-[#141213] font-bold group-hover:text-[#7B1E34] transition-colors leading-none">
              Raj Hospital
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#7B1E34] font-semibold font-display mt-1">
              Dr. Mukhi's Orthopaedic Centre
            </span>
          </div>
        </button>

        {/* Zone 2: Clean text navigation links with subtle underline & rich hover */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4D4548]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-all py-1.5 cursor-pointer relative font-medium ${
                currentView === link.id
                  ? 'text-[#7B1E34] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#7B1E34]'
                  : 'hover:text-[#7B1E34] hover:-translate-y-0.5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary actions styled in rich Burgundy */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('booking')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap cursor-pointer burgundy-glow"
          >
            Book Consultation
          </button>

          <button
            onClick={onOpenDoctorOS}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#383134] hover:text-[#7B1E34] bg-[#F5EFEB] hover:bg-[#EAE2D8] border border-[#DDD3C5] rounded-xl transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
            title="Switch to Secure Hospital & Doctor Management System"
          >
            <Shield className="w-3.5 h-3.5 text-[#7B1E34]" />
            <span>Doctor OS</span>
            <ArrowUpRight className="w-3 h-3 text-[#7B1E34]" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#141213] hover:text-[#7B1E34] hover:bg-[#F5EFEB] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE2D8] bg-[#FCFBF9] px-6 py-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  currentView === link.id
                    ? 'bg-[#FDF4F6] text-[#7B1E34] font-semibold'
                    : 'text-[#4D4548] hover:bg-[#F5EFEB] hover:text-[#7B1E34]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE2D8] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDoctorOS();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-[#141213] bg-[#F5EFEB] border border-[#DDD3C5] rounded-xl"
            >
              <Shield className="w-3.5 h-3.5 text-[#7B1E34]" />
              <span>Launch Doctor OS (Private MIS)</span>
            </button>
            <a
              href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-[#7B1E34] bg-[#FDF4F6] border border-[#F2D5DC] rounded-xl"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Clinic Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
