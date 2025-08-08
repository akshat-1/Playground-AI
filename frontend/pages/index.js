import { useState, useEffect } from "react";
import SkillSelector from "../components/SkillSelector";
import ConversationForm from "../components/ConversationForm";
import ImageForm from "../components/ImageForm";
import DocumentForm from "../components/DocumentForm";
import JobCard from "../components/JobCard";
import { createJob, getJob } from "../lib/api";

export default function Home() {
  const [skill, setSkill] = useState("");
  const [jobs, setJobs] = useState([]); // local job list
  const [polling, setPolling] = useState({});

  // submit wrapper called by child forms
  async function handleSubmit(payload) {
    // payload must include: skill, input (file or url), options
    try {
      const res = await createJob(payload);
      // expected response { job_id }
      if (!res?.job_id) throw new Error("No job id");
      const job = {
        id: res.job_id,
        skill: payload.skill,
        status: "queued",
        created_at: new Date().toISOString(),
        result: null
      };
      setJobs(prev => [job, ...prev].slice(0, 20));
      // start polling
      startPolling(job.id);
    } catch (err) {
      alert("Failed to submit: " + (err.message || err));
    }
  }

  function startPolling(jobId) {
    if (polling[jobId]) return;
    const interval = setInterval(async () => {
      try {
        const data = await getJob(jobId);
        setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...data } : j));
        if (data?.status === "completed" || data?.status === "failed") {
          clearInterval(interval);
          setPolling(p => {
            const copy = { ...p };
            delete copy[jobId];
            return copy;
          });
        }
      } catch (err) {
        // ignore
      }
    }, 2000);
    setPolling(p => ({ ...p, [jobId]: interval }));
  }

  useEffect(() => {
    return () => {
      // cleanup intervals on unmount
      Object.values(polling).forEach(i => clearInterval(i));
    };
  }, [polling]);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Multimodal Playground</h1>
          <div className="text-sm text-slate-600">Quick demo UI</div>
        </header>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <SkillSelector value={skill} onChange={setSkill} />
          <div className="mt-6">
            {!skill && <div className="text-slate-500">Choose a skill to see the input form.</div>}
            {skill === "conversation" && <ConversationForm onSubmit={handleSubmit} />}
            {skill === "image" && <ImageForm onSubmit={handleSubmit} />}
            {skill === "document" && <DocumentForm onSubmit={handleSubmit} />}
          </div>
        </div>

        <h2 className="text-lg font-medium mb-3">Recent jobs</h2>
        <div className="space-y-3">
          {jobs.length === 0 && <div className="text-slate-500">No jobs yet — submit something above.</div>}
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
}
