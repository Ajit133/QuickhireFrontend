import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDetails } from '../store/jobDetailsSlice';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CompanyAvatar from '../components/common/CompanyAvatar';
import ApplyModal from '../components/jobs/ApplyModal';
import JobInfoPill from '../components/jobs/JobInfoPill';
import JobDetailSkeleton from '../components/jobs/JobDetailSkeleton';
import { tagClass } from '../constants/jobTags';

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
        {loading && <JobDetailSkeleton />}

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
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <JobInfoPill
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
                    label="Location" value={location}
                  />
                  <JobInfoPill
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>}
                    label="Category" value={category}
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
