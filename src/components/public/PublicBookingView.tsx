import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { ConsultationType, Appointment } from '../../types';
import { Calendar, Clock, User, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { AestheticHospitalBackground } from '../common/VisualAvatar';

interface PublicBookingViewProps {
  onSuccess: (bookingRef: string) => void;
  onNavigate: (view: string) => void;
}

export const PublicBookingView: React.FC<PublicBookingViewProps> = ({
  onSuccess,
  onNavigate,
}) => {
  const { clinicInfo, bookAppointment } = useClinic();

  const consultationTypes: { type: ConsultationType; desc: string; duration: string; price: number }[] = [
    {
      type: 'New Consultation',
      desc: 'First-time orthopaedic evaluation for shoulder, elbow, or hip pain with MRI/X-ray review.',
      duration: '40 min',
      price: clinicInfo.consultationFee,
    },
    {
      type: 'Follow-up',
      desc: 'Post-operative surgical review, suture removal check, or progression of physiotherapy.',
      duration: '25 min',
      price: clinicInfo.followupFee,
    },
    {
      type: 'In-person',
      desc: 'Clinical examination and joint dynamic testing at Dr. Mukhi\'s Raj Hospital OPD suites.',
      duration: '40 min',
      price: clinicInfo.consultationFee,
    },
    {
      type: 'Video Consultation',
      desc: 'Encrypted HD telehealth consultation for international patients or second surgical opinions.',
      duration: '30 min',
      price: clinicInfo.consultationFee,
    },
  ];

  const availableSlots = [
    '09:30',
    '10:15',
    '11:00',
    '11:45',
    '16:00',
    '16:45',
    '17:30',
    '18:15',
  ];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedType, setSelectedType] = useState<ConsultationType>('New Consultation');
  const [selectedDate, setSelectedDate] = useState('2026-10-05');
  const [selectedTime, setSelectedTime] = useState('10:15');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '1988-05-12',
    reason: '',
    notes: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  const handleNextFromType = (type: ConsultationType) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleNextFromSchedule = () => {
    if (!selectedDate || !selectedTime) return;
    setStep(3);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.reason) return;

    const apt = bookAppointment({
      patientName: formData.name,
      patientPhone: formData.phone,
      patientEmail: formData.email,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      reason: formData.reason,
      notes: `DOB: ${formData.dob}. ${formData.notes}`,
    });

    setConfirmedBooking(apt);
    setStep(4);
    onSuccess(apt.bookingReference);
  };

  return (
    <div className="relative py-6 sm:py-16 bg-[#FAF8F5]">
      <AestheticHospitalBackground overlayOpacity="bg-[#FAF8F5]/92" />

      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#7B1E34] font-bold">
            Raj Hospital · OPD Appointments
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1F1B1D]">
            Book your orthopaedic consultation.
          </h1>
          <p className="text-xs sm:text-sm text-[#554D51]">
            Direct consultation with Dr. Kush Mukhi, MBBS, M.S. (Orthopaedic)
          </p>
        </div>

        {/* Step Progress Tracker with Burgundy */}
        <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-4 mb-8 text-xs font-semibold">
          <div
            className={`flex items-center gap-1.5 ${
              step >= 1 ? 'text-[#7B1E34]' : 'text-[#8C8286]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 1 ? 'bg-[#7B1E34] text-white shadow-2xs' : 'bg-[#EAE2D8] text-[#696165]'
              }`}
            >
              1
            </span>
            <span>Type</span>
          </div>

          <div
            className={`flex items-center gap-1.5 ${
              step >= 2 ? 'text-[#7B1E34]' : 'text-[#8C8286]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 2 ? 'bg-[#7B1E34] text-white shadow-2xs' : 'bg-[#EAE2D8] text-[#696165]'
              }`}
            >
              2
            </span>
            <span>Schedule</span>
          </div>

          <div
            className={`flex items-center gap-1.5 ${
              step >= 3 ? 'text-[#7B1E34]' : 'text-[#8C8286]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 3 ? 'bg-[#7B1E34] text-white shadow-2xs' : 'bg-[#EAE2D8] text-[#696165]'
              }`}
            >
              3
            </span>
            <span>Details</span>
          </div>

          <div
            className={`flex items-center gap-1.5 ${
              step >= 4 ? 'text-[#7B1E34]' : 'text-[#8C8286]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 4 ? 'bg-[#7B1E34] text-white shadow-2xs' : 'bg-[#EAE2D8] text-[#696165]'
              }`}
            >
              ✓
            </span>
            <span>Confirmed</span>
          </div>
        </div>

        {/* STEP 1: CONSULTATION TYPE */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-editorial font-bold text-[#1F1B1D] mb-4">
              Select consultation type
            </h2>
            <div className="space-y-3">
              {consultationTypes.map((item) => (
                <div
                  key={item.type}
                  onClick={() => handleNextFromType(item.type)}
                  className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 sm:gap-4 hover-lift ${
                    selectedType === item.type
                      ? 'bg-white border-[#7B1E34] shadow-md ring-1 ring-[#7B1E34]/20'
                      : 'bg-white/80 border-[#E5DDD1] hover:border-[#7B1E34]/40 hover:bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1F1B1D]">
                        {item.type}
                      </span>
                      <span className="text-[11px] font-mono text-[#7B1E34] font-semibold">
                        · {item.duration}
                      </span>
                    </div>
                    <p className="text-xs text-[#554D51] leading-relaxed max-w-lg">
                      {item.desc}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm sm:text-base font-bold text-[#7B1E34] font-mono">
                      ₹{item.price}
                    </div>
                    <div className="text-[10px] text-[#7A7175] mt-0.5">OPD fee</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME */}
        {step === 2 && (
          <div className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-[#DDD3C5] shadow-xs">
            <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-4">
              <div>
                <h2 className="text-lg font-editorial font-bold text-[#1F1B1D]">
                  Select appointment date & time
                </h2>
                <p className="text-xs text-[#7B1E34] font-semibold mt-0.5">
                  {selectedType} with Dr. Kush Mukhi
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#5E5458] hover:text-[#7B1E34] flex items-center gap-1 cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change type</span>
              </button>
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#383033] uppercase tracking-wider block">
                Consultation Date
              </label>
              <input
                type="date"
                min="2026-10-03"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#1F1B1D] outline-none focus:border-[#7B1E34] font-mono"
              />
              <p className="text-[11px] text-[#786E72]">
                OPD clinics run Monday through Saturday at Raj Hospital & Powai suites.
              </p>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#383033] uppercase tracking-wider block">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-3 text-xs font-mono rounded-xl border transition-all text-center cursor-pointer ${
                      selectedTime === slot
                        ? 'bg-[#7B1E34] text-white border-[#7B1E34] shadow-sm font-semibold'
                        : 'bg-[#FAF8F5] border-[#DDD3C5] text-[#292326] hover:bg-[#FDF4F6] hover:border-[#7B1E34]/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-[#EAE2D8]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-[#524A4E] hover:text-[#1F1B1D] cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextFromSchedule}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer burgundy-glow"
              >
                <span>Continue to Patient Info</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PATIENT INFORMATION */}
        {step === 3 && (
          <form
            onSubmit={handleSubmitBooking}
            className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-[#DDD3C5] shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-4">
              <div>
                <h2 className="text-lg font-editorial font-bold text-[#1F1B1D]">
                  Patient Information
                </h2>
                <p className="text-xs text-[#7B1E34] font-semibold mt-0.5">
                  {selectedType} · {selectedDate} at {selectedTime}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs text-[#5E5458] hover:text-[#7B1E34] flex items-center gap-1 cursor-pointer font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change time</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#383033]">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Patient Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#1F1B1D] outline-none focus:border-[#7B1E34]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#383033]">
                  Telephone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#1F1B1D] outline-none focus:border-[#7B1E34]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#383033]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#1F1B1D] outline-none focus:border-[#7B1E34]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#383033]">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#1F1B1D] outline-none focus:border-[#7B1E34]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#383033]">
                Joint Symptoms / Area of Pain *
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Right shoulder rotator cuff pain, restricted overhead reach, sports injury, or previous surgery review..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#1F1B1D] outline-none focus:border-[#7B1E34]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#383033]">
                Previous Scans / X-Ray / MRI Information (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Please state if you have existing 3T MRI, CT scans or X-rays available to bring..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD3C5] rounded-xl text-[#1F1B1D] outline-none focus:border-[#7B1E34]"
              />
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-[#EAE2D8]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-semibold text-[#524A4E] hover:text-[#1F1B1D] cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-7 py-3 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer burgundy-glow"
              >
                Confirm & Book at Raj Hospital
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: CONFIRMATION STATE */}
        {step === 4 && confirmedBooking && (
          <div className="bg-white p-5 sm:p-10 rounded-xl sm:rounded-2xl border border-[#DDD3C5] shadow-sm text-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FDF4F6] text-[#7B1E34] border border-[#F2D5DC] rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#1F1B1D]">
                Consultation Confirmed
              </h2>
              <p className="text-xs sm:text-sm text-[#554D51]">
                Your consultation with Dr. Kush Mukhi has been registered in the Raj Hospital surgical queue.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E7DFD4] rounded-xl p-4 sm:p-6 max-w-md mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-[#EAE2D8] pb-2.5">
                <span className="text-[#786E72] font-medium">Booking Reference:</span>
                <span className="font-mono font-bold text-sm text-[#7B1E34]">
                  {confirmedBooking.bookingReference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#786E72]">Patient:</span>
                <span className="font-bold text-[#1F1B1D]">
                  {confirmedBooking.patientName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#786E72]">Date & Time:</span>
                <span className="font-semibold text-[#1F1B1D]">
                  {confirmedBooking.date} at {confirmedBooking.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#786E72]">Specialty:</span>
                <span className="font-medium text-[#1F1B1D]">
                  Orthopaedics & Joint Surgery
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#786E72]">Consultant:</span>
                <span className="font-semibold text-[#7B1E34]">
                  Dr. Kush Mukhi, MS (Ortho)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => onNavigate('portal')}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#7B1E34] hover:bg-[#631326] rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer burgundy-glow"
              >
                Access Patient Portal
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setConfirmedBooking(null);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-[#3A3236] hover:text-[#1F1B1D] bg-[#F5EFEB] hover:bg-[#EAE2D8] rounded-xl transition-colors border border-[#DDD3C5] cursor-pointer"
              >
                Book Another Visit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
