import React, { useState } from 'react';
import { X, Calendar, Plus, AlertCircle } from 'lucide-react';
import { MonthlyCalendarEvent, EventCategoryType } from '../types';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: MonthlyCalendarEvent) => void;
  selectedMonth: number;
  selectedYear: number;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  selectedMonth,
  selectedYear
}) => {
  // Default date in the currently viewed month
  const defaultDateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-15`;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defaultDateStr);
  const [endDate, setEndDate] = useState('');
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [isSuspended, setIsSuspended] = useState(true);
  const [category, setCategory] = useState<EventCategoryType>('pedagogical_seminar');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an event or holiday title.');
      return;
    }
    if (!date) {
      setError('Please select a valid date for this event.');
      return;
    }

    const newEvent: MonthlyCalendarEvent = {
      id: `custom-event-${Date.now()}`,
      title: title.trim(),
      date,
      endDate: isMultiDay && endDate ? endDate : undefined,
      isSuspended,
      category,
      description: description.trim() || undefined,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onAddEvent(newEvent);
    // Reset form
    setTitle('');
    setDescription('');
    setIsMultiDay(false);
    setEndDate('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Calendar className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif">Add Upcoming Holiday / School Event</h3>
              <p className="text-xs text-emerald-100/90">
                Plan pedagogical seminars, training days, or local holiday suspensions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Event Title */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800">
              Event / Holiday Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Regional English Pedagogical Seminar"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white"
            />
          </div>

          {/* Date Selection - Prompt for exact date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800">
                Event Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800">
                Category / Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategoryType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white"
              >
                <option value="pedagogical_seminar">Pedagogical Seminar</option>
                <option value="teacher_training">Teacher Training Day</option>
                <option value="school_break">School Break / Vacation</option>
                <option value="national_holiday">National Holiday</option>
                <option value="religious_holiday">Religious Occasion</option>
                <option value="school_event">School Celebration / Activity</option>
                <option value="remediation_day">Remedial Day</option>
                <option value="weather_closure">Weather / Exceptional Closure</option>
                <option value="custom">Other Custom Event</option>
              </select>
            </div>
          </div>

          {/* Multi-day toggle */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="multi-day-toggle"
              checked={isMultiDay}
              onChange={(e) => setIsMultiDay(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="multi-day-toggle" className="text-slate-700 font-medium cursor-pointer">
              Multi-day event / break (Span across several consecutive days)
            </label>
          </div>

          {isMultiDay && (
            <div className="space-y-1.5 animate-in fade-in duration-150">
              <label className="block font-bold text-slate-800">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={date}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white"
              />
            </div>
          )}

          {/* Class Suspension Toggle (Critical for 2 sessions/week planning) */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-900 block">Are Regular Classes Suspended?</span>
                <span className="text-[11px] text-amber-800">
                  {isSuspended 
                    ? 'Yes — Regular English sessions will be marked suspended and shifted.' 
                    : 'No — English sessions will proceed with this event noted.'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSuspended}
                  onChange={(e) => setIsSuspended(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800">
              Inspector / Pedagogical Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Organized by the District Inspector at Primary School..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Event to Calendar
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
