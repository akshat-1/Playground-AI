export default function JobCard({ job }) {
  const { id, skill, status, result, error, created_at } = job;

  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-slate-600">{skill?.toUpperCase() ?? "JOB"}</div>
          <div className="font-medium">{id}</div>
          <div className="text-xs text-slate-500 mt-1">Submitted: {new Date(created_at).toLocaleString()}</div>
        </div>
        <div>
          <div className={`text-sm px-2 py-1 rounded ${status === "completed" ? "bg-green-100 text-green-700" : status === "failed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
            {status ?? "pending"}
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm">
        {status === "completed" && result && (
          <>
            {skill === "conversation" && (
              <>
                <div className="font-semibold">Transcript</div>
                <pre className="p-2 bg-slate-50 rounded mt-2 text-xs whitespace-pre-wrap">{result.transcript || "—"}</pre>

                <div className="font-semibold mt-3">Diarization</div>
                <pre className="p-2 bg-slate-50 rounded mt-2 text-xs whitespace-pre-wrap">{JSON.stringify(result.diarization || [], null, 2)}</pre>

                <div className="font-semibold mt-3">Summary</div>
                <div className="mt-1">{result.summary || "—"}</div>
              </>
            )}

            {skill === "image" && (
              <>
                <div className="font-semibold">Description</div>
                <div className="mt-1">{result.description}</div>
                {result.ocr && <div className="mt-2"><strong>OCR:</strong><pre className="text-xs bg-slate-50 p-2 rounded">{result.ocr}</pre></div>}
              </>
            )}

            {skill === "document" && (
              <>
                <div className="font-semibold">Summary</div>
                <div className="mt-1">{result.summary}</div>
                {result.key_points && (
                  <>
                    <div className="font-semibold mt-3">Key points</div>
                    <ul className="list-disc pl-5 mt-1">
                      {result.key_points.map((p, i) => <li key={i} className="text-sm">{p}</li>)}
                    </ul>
                  </>
                )}
              </>
            )}
          </>
        )}

        {status === "failed" && (
          <div className="text-sm text-red-600 mt-2">Error: {error || "Unknown error"}</div>
        )}

        {(!status || status === "queued" || status === "processing") && (
          <div className="text-sm text-slate-500 mt-2">Processing — your result will appear here.</div>
        )}
      </div>
    </div>
  );
}
