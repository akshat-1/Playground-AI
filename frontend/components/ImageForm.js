import { useState } from "react";

export default function ImageForm({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  async function handleRun(e) {
    e.preventDefault();
    if (!file) return alert("Upload an image.");
    setProcessing(true);

    const formData = new FormData();
    formData.append("skill", "image");
    formData.append("file", file);

    await onSubmit({
      skill: "image",
      formData
    });

    setProcessing(false);
  }

  return (
    <form onSubmit={handleRun} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Image file</label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} className="mt-2 block w-full" />
      </div>

      <div>
        <button type="submit" disabled={processing} className="px-4 py-2 bg-slate-800 text-white rounded">
          {processing ? "Analyzing…" : "Analyze Image"}
        </button>
      </div>
    </form>
  );
}
