import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // e.g., "https://your-backend.com"

export async function createJob({ skill, formData }) {
  // formData is expected to be FormData with "skill" and file/url/options fields
  try {
    const headers = { "Accept": "application/json" };
    // axios will set proper multipart headers
    const res = await axios.post(`${BASE}/api/jobs`, formData, { headers });
    return res.data;
  } catch (err) {
    console.error("createJob error", err);
    throw err.response?.data ?? err;
  }
}

export async function getJob(jobId) {
  try {
    const res = await axios.get(`${BASE}/api/jobs/${jobId}`);
    return res.data;
  } catch (err) {
    console.error("getJob error", err);
    throw err.response?.data ?? err;
  }
}
