export default function SkillSelector({ value, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium">Skill</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="ml-2 px-3 py-2 border rounded-md bg-white"
      >
        <option value="">Select Skill</option>
        <option value="conversation">Conversation Analysis</option>
        <option value="image">Image Analysis</option>
        <option value="document">Document / URL Summarization</option>
      </select>
    </div>
  );
}
