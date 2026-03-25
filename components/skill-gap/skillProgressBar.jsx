export default function SkillProgressBar({ score }) {
  const color =
    score >= 75 ? "from-green-500 to-emerald-400"
    : score >= 50 ? "from-yellow-500 to-orange-400"
    : "from-red-500 to-pink-400";

  return (
    <div className="relative w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">Match Score</span>
        <span className="font-bold text-white">{score}%</span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {score >= 75 ? "You're well prepared! Just a few more skills needed." 
         : score >= 50 ? "Good foundation! Focus on the high-priority skills."
         : "Significant skill gap detected. Start with the high-priority skills."}
      </p>
    </div>
  );
}
