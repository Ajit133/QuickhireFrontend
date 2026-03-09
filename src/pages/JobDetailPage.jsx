import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDetails } from '../redux/jobDetailsSlice';
import { applyJob } from '../redux/applicationSlice';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/* ─── Tag colour map ─── */
const TAG_STYLES = {
  'full-time':  'bg-[#E9F9F3] text-[#56CDAD] border border-[#56CDAD]',
  'part-time':  'bg-[#FFF5E5] text-[#FFB836] border border-[#FFB836]',
  'contract':   'bg-[#F0F0FF] text-[#4640DE] border border-[#4640DE]',
  'remote':     'bg-[#FFF0EE] text-[#FF6550] border border-[#FF6550]',
  'internship': 'bg-[#E8F9F9] text-[#26A4FF] border border-[#26A4FF]',
};
const tagClass = (tag = '') =>
  TAG_STYLES[tag.toLowerCase()] ?? 'bg-[#F8F8FD] text-[#515B6F] border border-[#D6DDEB]';

/* ─── Company avatar ─── */
const CompanyAvatar = ({ name = '', size = 'lg' }) => {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
  const colours = ['#4640DE', '#56CDAD', '#FFB836', '#FF6550', '#26A4FF', '#00BFA5', '#1B3C87'];
  const bg = colours[(name.charCodeAt(0) ?? 0) % colours.length];
  const sz = size === 'lg' ? 'w-20 h-20 text-2xl rounded-2xl' : 'w-12 h-12 text-base rounded-xl';
  return (
    <div className={`${sz} flex items-center justify-center text-white font-bold shrink-0`} style={{ backgroundColor: bg }}>
      {initials || '?'}
    </div>
  );
};

/* ─── Input field ─── */
const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-[#25324B]">
      {label} {required && <span className="text-[#FF6550]">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  'w-full border border-[#D6DDEB] rounded-xl px-4 py-2.5 text-sm text-[#25324B] placeholder-[#A8B0C0] outline-none focus:border-[#4640DE] transition-colors duration-200 bg-white';

/* ─── Apply Now modal ─── */
const ApplyModal = ({ job, onClose }) => {
  const dispatch  = useDispatch();
  const { loading, success } = useSelector((s) => s.application);

  const [form, setForm] = useState({ name: '', email: '', resume_url: '', cover_note: '' });
  const [errors, setErrors] = useState({});

  const jobId      = job?.id ?? job?._id;
  const jobTitle   = job?.title ?? job?.job_title ?? 'this position';
  const company    = job?.company ?? job?.company_name ?? '';

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name       = 'Name is required';
    if (!form.email.trim())      e.email      = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.resume_url.trim()) e.resume_url = 'Resume link is required';
    else {
      try { new URL(form.resume_url); }
      catch { e.resume_url = 'Enter a valid URL'; }
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
    dispatch(applyJob({ ...form, job_id: jobId }));
  };

  /* close on backdrop click */
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

            {/* Name */}
            <Field label="Full Name" required>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className={`${inputClass} ${errors.name ? 'border-[#FF6550]' : ''}`}
              />
              {errors.name && <p className="text-xs text-[#FF6550]">{errors.name}</p>}
            </Field>

            {/* Email */}
            <Field label="Email Address" required>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={`${inputClass} ${errors.email ? 'border-[#FF6550]' : ''}`}
              />
              {errors.email && <p className="text-xs text-[#FF6550]">{errors.email}</p>}
            </Field>

            {/* Resume link */}
            <Field label="Resume Link (URL)" required>
              <input
                type="url"
                name="resume_url"
                value={form.resume_url}
                onChange={handleChange}
                placeholder="https://drive.google.com/your-resume"
                className={`${inputClass} ${errors.resume_url ? 'border-[#FF6550]' : ''}`}
              />
              {errors.resume_url && <p className="text-xs text-[#FF6550]">{errors.resume_url}</p>}
            </Field>

            {/* Cover note */}
            <Field label="Cover Note">
              <textarea
                name="cover_note"
                value={form.cover_note}
                onChange={handleChange}
                rows={4}
                placeholder="Tell the employer why you're a great fit…"
                className={`${inputClass} resize-none`}
              />
            </Field>

            {/* Submit */}
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

/* ─── Info pill ─── */
const InfoPill = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white border border-[#D6DDEB] rounded-xl px-4 py-3">
    <span className="text-[#4640DE]">{icon}</span>
    <div>
      <p className="text-xs text-[#515B6F]">{label}</p>
      <p className="text-sm font-semibold text-[#25324B]">{value || '—'}</p>
    </div>
  </div>
);

/* ─── Skeleton loader ─── */
const Skeleton = () => (
  <div className="animate-pulse space-y-6 max-w-4xl mx-auto px-6 lg:px-10 py-10">
    <div className="h-8 bg-[#E8E8F0] rounded w-1/3" />
    <div className="h-5 bg-[#E8E8F0] rounded w-1/4" />
    <div className="space-y-3 mt-6">
      {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-[#E8E8F0] rounded" style={{ width: `${80 - i * 5}%` }} />)}
    </div>
  </div>
);

/* ─── Main page ─── */
const JobDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading } = useSelector((s) => s.jobDetails);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchJobDetails(id));
  }, [dispatch, id]);

  /* Normalise field names */
  const title       = job?.title        ?? job?.job_title         ?? 'Untitled Position';
  const company     = job?.company      ?? job?.company_name      ?? 'Unknown Company';
  const location    = job?.location     ?? job?.city              ?? '';
  const category    = job?.category     ?? job?.department        ?? '';
  const jobType     = job?.job_type     ?? job?.type              ?? job?.employment_type ?? '';
  const salary      = job?.salary       ?? job?.salary_range      ?? '';
  const description = job?.description  ?? job?.job_description   ?? '';
  const requirements= job?.requirements ?? job?.qualifications    ?? '';
  const responsibilities = job?.responsibilities ?? '';
  const postedAt    = job?.created_at   ?? job?.posted_at         ?? '';
  const tags = [jobType, category].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8F8FD] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1">
        {loading && <Skeleton />}

        {!loading && !job && (
          <div className="text-center py-32">
            <p className="text-[#25324B] font-semibold text-lg">Job not found</p>
            <Link to="/browse-jobs" className="mt-4 inline-block text-[#4640DE] text-sm hover:underline">
              ← Back to Browse Jobs
            </Link>
          </div>
        )}

        {!loading && job && (
          <>
            {/* ── Hero banner ── */}
            <section className="bg-white border-b border-[#D6DDEB]">
              <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[#515B6F] mb-6">
                  <Link to="/browse-jobs" className="hover:text-[#4640DE] transition-colors duration-200">
                    Browse Jobs
                  </Link>
                  <span className="text-[#D6DDEB]">/</span>
                  <span className="text-[#25324B] font-medium truncate">{title}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <CompanyAvatar name={company} size="lg" />

                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#25324B] leading-tight">{title}</h1>
                    <p className="text-[#515B6F] mt-1 text-sm">
                      {company}
                      {location && <><span className="mx-1.5 text-[#D6DDEB]">•</span>{location}</>}
                      {postedAt  && <><span className="mx-1.5 text-[#D6DDEB]">•</span>Posted {new Date(postedAt).toLocaleDateString()}</>}
                    </p>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                          <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full ${tagClass(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Apply button (desktop) */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="hidden sm:block shrink-0 px-7 py-3 rounded-xl bg-[#4640DE] text-white font-semibold text-sm hover:bg-[#3730c4] active:bg-[#2e27a8] transition-colors duration-200"
                  >
                    Apply Now
                  </button>
                </div>

                {/* Info pills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                  <InfoPill
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    label="Location" value={location}
                  />
                  <InfoPill
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
                    label="Job Type" value={jobType}
                  />
                  <InfoPill
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>}
                    label="Category" value={category}
                  />
                  <InfoPill
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                    label="Salary" value={salary}
                  />
                </div>
              </div>
            </section>

            {/* ── Body ── */}
            <section className="max-w-5xl mx-auto px-6 lg:px-10 py-10 flex flex-col lg:flex-row gap-10">

              {/* Left: description */}
              <div className="flex-1 min-w-0 space-y-8">

                {description && (
                  <div>
                    <h2 className="text-xl font-bold text-[#25324B] mb-3">Job Description</h2>
                    <div className="text-sm text-[#515B6F] leading-relaxed whitespace-pre-line">{description}</div>
                  </div>
                )}

                {responsibilities && (
                  <div>
                    <h2 className="text-xl font-bold text-[#25324B] mb-3">Responsibilities</h2>
                    <div className="text-sm text-[#515B6F] leading-relaxed whitespace-pre-line">{responsibilities}</div>
                  </div>
                )}

                {requirements && (
                  <div>
                    <h2 className="text-xl font-bold text-[#25324B] mb-3">Requirements &amp; Qualifications</h2>
                    <div className="text-sm text-[#515B6F] leading-relaxed whitespace-pre-line">{requirements}</div>
                  </div>
                )}

                {!description && !responsibilities && !requirements && (
                  <p className="text-sm text-[#515B6F]">No additional details provided for this position.</p>
                )}
              </div>

              {/* Right: sticky apply card */}
              <aside className="lg:w-72 shrink-0">
                <div className="bg-white rounded-2xl border border-[#D6DDEB] p-6 shadow-sm lg:sticky lg:top-6">
                  <h3 className="text-base font-bold text-[#25324B] mb-1">Interested in this role?</h3>
                  <p className="text-sm text-[#515B6F] mb-5">Submit your application directly to {company}.</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 rounded-xl bg-[#4640DE] text-white font-semibold text-sm hover:bg-[#3730c4] active:bg-[#2e27a8] transition-colors duration-200"
                  >
                    Apply Now
                  </button>
                  <Link
                    to="/browse-jobs"
                    className="block text-center text-sm text-[#515B6F] hover:text-[#4640DE] mt-4 transition-colors duration-200"
                  >
                    ← Back to all jobs
                  </Link>
                </div>
              </aside>
            </section>
          </>
        )}
      </main>

      <Footer />

      {showModal && <ApplyModal job={job} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default JobDetailPage;
