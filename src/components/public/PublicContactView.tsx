import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { LocationContactSection } from './LocationContactSection';
import { CheckCircle2, Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const PublicContactView: React.FC = () => {
  const { clinicInfo } = useClinic();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Orthopaedic Consultation',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-[#FCFBF9]">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-2"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B1E34] font-bold font-display">
            Hospital Concierge & Direct Inquiries
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#141213]">
            We are here to assist your recovery.
          </h1>
          <p className="text-xs sm:text-sm text-[#554D45]">
            Direct hospital concierge assistance for consultation bookings, MRI/imaging reviews, and surgical admissions.
          </p>
        </motion.div>

        {/* Form and Location Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#DDD3C5] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#141213] mb-1">
              Send a clinical inquiry
            </h2>
            <p className="text-xs text-[#554D45] mb-6">
              Our orthopaedic administrative coordinator will reply promptly to your consultation or review request.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#7B1E34] mx-auto" />
                <h3 className="text-base font-serif font-bold text-[#141213]">
                  Inquiry Received
                </h3>
                <p className="text-xs text-[#554D45] max-w-sm mx-auto">
                  Thank you, {form.name}. The Raj Hospital clinical concierge will contact you via {form.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', inquiryType: 'Orthopaedic Consultation', message: '' });
                  }}
                  className="text-xs text-[#7B1E34] hover:underline pt-2 font-semibold cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="font-semibold text-[#141213] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#141213] outline-none focus:border-[#7B1E34] focus:ring-1 focus:ring-[#7B1E34]/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#141213] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#141213] outline-none focus:border-[#7B1E34] focus:ring-1 focus:ring-[#7B1E34]/20"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#141213] block mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 00000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#141213] outline-none focus:border-[#7B1E34] focus:ring-1 focus:ring-[#7B1E34]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#141213] block mb-1">
                    Inquiry Clinical Specialty
                  </label>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#141213] outline-none focus:border-[#7B1E34]"
                  >
                    <option value="Shoulder Arthroscopy">Shoulder Arthroscopy & Rotator Cuff Repair</option>
                    <option value="Shoulder Replacement">Reverse Shoulder Arthroplasty (RTSA)</option>
                    <option value="Elbow Surgery">Elbow Reconstruction & Tendon Transfers</option>
                    <option value="Hip Preservation">Hip Preservation & Labral Repair</option>
                    <option value="Trauma & Fractures">Complex Fracture & Trauma Care</option>
                    <option value="Second Opinion">MRI & Surgical Second Opinion</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#141213] block mb-1">
                    Clinical Message & Prior Imaging Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your symptoms, affected joint (shoulder/elbow/hip), and any available X-ray or MRI scans..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#141213] outline-none focus:border-[#7B1E34] focus:ring-1 focus:ring-[#7B1E34]/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer burgundy-glow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Clinical Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contacts Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#F5EFEB] p-8 rounded-3xl border border-[#DDD3C5] space-y-4 text-xs">
              <h3 className="text-base font-serif font-bold text-[#141213]">
                Raj Hospital Primary Coordinates
              </h3>
              <p className="text-[#554D45]">
                For immediate appointment coordinates, inpatient admission guidance, or emergency trauma:
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between border-b border-[#EAE2D8] pb-2.5">
                  <span className="text-[#82787C]">Hospital Reception:</span>
                  <a href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`} className="font-mono font-bold text-[#141213] hover:text-[#7B1E34]">
                    {clinicInfo.phone}
                  </a>
                </div>
                <div className="flex justify-between border-b border-[#EAE2D8] pb-2.5">
                  <span className="text-[#82787C]">24/7 Trauma Emergency:</span>
                  <a href={`tel:${clinicInfo.emergencyPhone.replace(/[^0-9+]/g, '')}`} className="font-mono font-bold text-[#7B1E34]">
                    {clinicInfo.emergencyPhone}
                  </a>
                </div>
                <div className="flex justify-between border-b border-[#EAE2D8] pb-2.5">
                  <span className="text-[#82787C]">Concierge Desk:</span>
                  <a href={`mailto:${clinicInfo.email}`} className="font-semibold text-[#7B1E34] hover:underline">
                    {clinicInfo.email}
                  </a>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#82787C]">OPD Timings:</span>
                  <span className="text-right text-[#141213] font-medium">Mon-Fri 09:00–19:30 · Sat 09:00–16:00</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[#EAE2D8] bg-white text-xs text-[#554D45] leading-relaxed space-y-2">
              <span className="font-bold text-[#141213] font-serif text-sm block">
                Hospital Accessibility & Valet Parking
              </span>
              <p>
                Dr. Mukhi's Raj Hospital on S.V. Road features dedicated on-site valet parking,
                ramp wheelchair access, and a stretcher-accessible hospital elevator directly to the
                Orthopaedic & Joint Reconstruction Pavilion on the 2nd Floor.
              </p>
            </div>
          </div>
        </div>

        {/* Map & Location */}
        <LocationContactSection />
      </div>
    </div>
  );
};
