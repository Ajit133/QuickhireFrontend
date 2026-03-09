import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyJob, resetApplication } from '../../store/applicationSlice';

const inputClass =
  'w-full border border-[#D6DDEB] rounded-xl px-4 py-2.5 text-sm text-[#25324B] placeholder-[#A8B0C0] outline-none focus:border-[#4640DE] transition-colors duration-200 bg-white';

const FormField = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-[#25324B]">
      {label} {required && <span className="text-[#FF6550]">*</span>}
    </label>
    {children}
  </div>
);

const ApplyModal = ({ job, onClose }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((s) => s.application);

  const [form, setForm] = useState({ name: '', email: '', resume_link: '', cover_note: '' });
  const [errors, setErrors] = useState({});

  // Reset Redux state when modal opens so stale success/error is cleared
  useEffect(() => {
    dispatch(resetApplication());
  }, [dispatch]);

  const jobId    = job?.id ?? job?._id;
  const jobTitle = job?.title ?? job?.job_title ?? 'this position';
  const company  = job?.company ?? job?.company_name ?? '';

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name       = 'Name is required';
    if (!form.email.trim())      e.email      = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.resume_link.trim()) {
      e.resume_link = 'Resume link is required';
    } else {
      const raw = form.resume_link.trim();
      const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      try {
        new URL(withProtocol);
      } catch (_) {
        e.resume_link = 'Enter a valid URL (e.g. https://drive.google.com/…)';
      }
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    const resume = /^https?:\/\//i.test(form.resume_link.trim())
      ? form.resume_link.trim()
      : `https://${form.resume_link.trim()}`;
    dispatch(applyJob({ ...form, resume_link: resume, job_id: jobId }));
  };

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#D6DDEB]">
          <div>
            <h2 className="text-lg font-bold text-[#25324B]">Apply for {jobTitle}</h2>
            {company && <p className="text-sm text-[#515B6F] mt-0.5">{company}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8F8FD] text-[#515B6F] hover:text-[#25324B] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success state */}
        {success ? (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-[#E9F9F3] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#56CDAD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#25324B]">Application Submitted!</h3>
            <p className="text-sm text-[#515B6F] mt-2">
              We've received your application for <strong>{jobTitle}</strong>. Good luck!
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#4640DE] text-white text-sm font-semibold hover:bg-[#3730c4] transition-colors duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5" noValidate>

            <FormField label="Full Name" required>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className={`${inputClass} ${errors.name ? 'border-[#FF6550]' : ''}`}
              />
              {errors.name && <p className="text-xs text-[#FF6550]">{errors.name}</p>}
            </FormField>

            <FormField label="Email Address" required>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={`${inputClass} ${errors.email ? 'border-[#FF6550]' : ''}`}
              />
              {errors.email && <p className="text-xs text-[#FF6550]">{errors.email}</p>}
            </FormField>

            <FormField label="Resume Link (URL)" required>
              <input
                type="url"
                name="resume_link"
                value={form.resume_link}
                onChange={handleChange}
                placeholder="https://drive.google.com/your-resume"
                className={`${inputClass} ${errors.resume_link ? 'border-[#FF6550]' : ''}`}
              />
              {errors.resume_link && <p className="text-xs text-[#FF6550]">{errors.resume_link}</p>}
            </FormField>

            <FormField label="Cover Note">
              <textarea
                name="cover_note"
                value={form.cover_note}
                onChange={handleChange}
                rows={4}
                placeholder="Tell the employer why you're a great fit…"
                className={`${inputClass} resize-none`}
              />
            </FormField>

            {error && (
              <p className="text-sm text-[#FF6550] bg-[#FFF0EE] border border-[#FF6550]/30 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#4640DE] text-white font-semibold text-sm hover:bg-[#3730c4] active:bg-[#2e27a8] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
