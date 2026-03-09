import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, addJob, deleteJob } from '../store/jobsSlice';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const EMPTY_FORM = {
  title: '',
  company: '',
  location: '',
  job_type: '',
  category: '',
  description: '',
  salary: '',
};

export default function AdminPage() {
  const dispatch = useDispatch();
  const { jobs, loading, adding, deleting, error } = useSelector((s) => s.jobs);

  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMsg('');

    if (!form.title.trim() || !form.company.trim() || !form.location.trim()) {
      setFormError('Title, Company, and Location are required.');
      return;
    }

    const result = await dispatch(addJob(form));
    if (addJob.fulfilled.match(result)) {
      setForm(EMPTY_FORM);
      setSuccessMsg('Job listing added successfully.');
    } else {
      setFormError('Failed to add job. Please try again.');
    }
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Delete this job listing?')) {
      dispatch(deleteJob(jobId));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FD] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10 space-y-12">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-[#25324B]">Admin Dashboard</h1>
          <p className="text-[#515B6F] mt-1">Manage job listings add or remove postings.</p>
        </div>

        {/* ── Add Job Form ── */}
        <section className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-[#25324B] mb-6">Add New Job Listing</h2>

          {formError && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {formError}
            </p>
          )}
          {successMsg && (
            <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              {successMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Job Title *', name: 'title', placeholder: 'e.g. Frontend Developer' },
              { label: 'Company *', name: 'company', placeholder: 'e.g. Acme Inc.' },
              { label: 'Location *', name: 'location', placeholder: 'e.g. Cape Town, SA' },
              { label: 'Category', name: 'category', placeholder: 'e.g. Engineering' },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-[#515B6F] mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-[#D6DDEB] rounded-lg px-4 py-2 text-sm text-[#25324B] focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30"
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#515B6F] mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the role, responsibilities, and requirements…"
                className="w-full border border-[#D6DDEB] rounded-lg px-4 py-2 text-sm text-[#25324B] focus:outline-none focus:ring-2 focus:ring-[#4640DE]/30 resize-none"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={adding}
                className="bg-[#4640DE] hover:bg-[#3b35c4] text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
              >
                {adding ? 'Adding…' : 'Add Job'}
              </button>
            </div>
          </form>
        </section>

        {/* ── Job Listings Table ── */}
        <section className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-[#25324B] mb-6">
            All Job Listings{' '}
            <span className="text-base font-normal text-[#7C8493]">({jobs.length})</span>
          </h2>

          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}

          {loading ? (
            <p className="text-[#7C8493] text-sm">Loading jobs…</p>
          ) : jobs.length === 0 ? (
            <p className="text-[#7C8493] text-sm">No job listings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-[#D6DDEB] text-[#7C8493] text-xs uppercase tracking-wide">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Company</th>
                    <th className="pb-3 pr-4">Location</th>
                    
                    <th className="pb-3 pr-4">Category</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => {
                    const id       = job.id ?? job._id;
                    const title    = job.title    ?? job.job_title    ?? '—';
                    const company  = job.company  ?? job.company_name ?? '—';
                    const location = job.location ?? job.city         ?? '—';
                    const jobType  = job.job_type ?? job.type         ?? '—';
                    const category = job.category ?? job.department   ?? '—';
                    const isDeleting = deleting === id;

                    return (
                      <tr key={id} className="border-b border-[#F1F2F4] hover:bg-[#F8F8FD] transition-colors">
                        <td className="py-3 pr-4 font-medium text-[#25324B]">{title}</td>
                        <td className="py-3 pr-4 text-[#515B6F]">{company}</td>
                        <td className="py-3 pr-4 text-[#515B6F]">{location}</td>
                        
                        <td className="py-3 pr-4 text-[#515B6F]">{category}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDelete(id)}
                            disabled={isDeleting}
                            className="text-red-500 hover:text-red-700 font-medium text-xs border border-red-200 hover:border-red-400 px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {isDeleting ? 'Deleting…' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
