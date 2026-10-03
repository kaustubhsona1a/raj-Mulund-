import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  ArrowUpRight,
  Menu,
  X,
  Shield,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Sparkles,
} from 'lucide-react';

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

  const phone = clinicInfo?.phone && clinicInfo.phone.startsWith('+91')
    ? clinicInfo.phone
    : '+91 (22) 2640 1888';

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
    <header className="sticky top-0 z-40 bg-[#FCFBF9]/96 backdrop-blur-xl border-b border-[#EAE2D8] transition-all shadow-2xs">
      {/* Top Utility Bar: Enhances Spacing and Provides Instant Clinical Authority */}
      <div className="hidden md:block bg-[#161C24] text-white/90 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#242D38]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Hospital Affiliation & Locations */}
          <div className="flex items-center gap-4 text-[#D3DBE3]">
            <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E27D8C]" />
              Raj Hospital · Orthopaedic Surgery & Joint Care
            </span>
            <span className="text-white/25">|</span>
            <span className="flex items-center gap-1 text-white/80">
              <MapPin className="w-3 h-3 text-[#E27D8C]" />
              Bandra West & Powai, Mumbai
            </span>
            <span className="text-white/25">|</span>
            <span className="flex items-center gap-1 text-white/80">
              <Clock className="w-3 h-3 text-[#E27D8C]" />
              OPD: Mon – Sat, 9:00 AM – 8:00 PM
            </span>
          </div>

          {/* Right: Emergency Line & Doctor OS Shortcut */}
          <div className="flex items-center gap-5">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-[#F2D5DC] font-semibold transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E27D8C]" />
              <span>24/7 Helpline: {phone}</span>
            </a>
            <span className="text-white/25">|</span>
            <button
              onClick={onOpenDoctorOS}
              className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer font-medium"
            >
              <Shield className="w-3 h-3 text-[#E27D8C]" />
              <span>Doctor OS (Private MIS)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Spaced with generous breathing room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Distinct Hospital Emblem & Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3.5 flex-shrink-0"
        >
          {/* Bespoke Hospital Emblem */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7B1E34] to-[#541021] text-white flex items-center justify-center shadow-md ring-1 ring-[#7B1E34]/20 group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v16m-8-8h16" />
            </svg>
          </div>

          {/* Typography */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-serif tracking-tight text-[#141213] font-bold group-hover:text-[#7B1E34] transition-colors leading-none">
                Raj Hospital
              </span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#FDF4F6] text-[#7B1E34] font-semibold border border-[#F2D5DC]">
                Mumbai
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#7B1E34] font-semibold font-display mt-1">
              Dr. Mukhi's Orthopaedic Centre
            </span>
          </div>
        </button>

        {/* Zone 2: Perfectly Spaced Navigation Links with Rich Pill Hover States */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] xl:text-sm font-medium text-[#4D4548]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 xl:px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer font-medium whitespace-nowrap ${
                currentView === link.id
                  ? 'bg-[#FDF4F6] text-[#7B1E34] font-semibold border border-[#F2D5DC] shadow-2xs'
                  : 'text-[#4D4548] hover:text-[#7B1E34] hover:bg-[#F5EFEB]/90'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions with Clean Spacing */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => handleNavClick('booking')}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap cursor-pointer burgundy-glow flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Consultation</span>
          </button>

          <button
            onClick={onOpenDoctorOS}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#141213] hover:text-[#7B1E34] bg-white hover:bg-[#FDF4F6] border border-[#DDD3C5] hover:border-[#7B1E34]/40 rounded-xl transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer shadow-2xs"
            title="Switch to Secure Hospital & Doctor Management System"
          >
            <Shield className="w-3.5 h-3.5 text-[#7B1E34]" />
            <span>Doctor OS</span>
            <ArrowUpRight className="w-3 h-3 text-[#7B1E34]" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#141213] hover:text-[#7B1E34] hover:bg-[#F5EFEB] rounded-xl transition-colors cursor-pointer border border-[#EAE2D8]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE2D8] bg-[#FCFBF9] px-5 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2.5 px-3.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === link.id
                    ? 'bg-[#FDF4F6] text-[#7B1E34] font-semibold border border-[#F2D5DC]'
                    : 'text-[#4D4548] hover:bg-[#F5EFEB] hover:text-[#7B1E34]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE2D8] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDoctorOS();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-[#141213] bg-white border border-[#DDD3C5] rounded-xl shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-[#7B1E34]" />
              <span>Launch Doctor OS (Private MIS)</span>
            </button>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-[#7B1E34] bg-[#FDF4F6] border border-[#F2D5DC] rounded-xl"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Clinic Concierge: {phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
