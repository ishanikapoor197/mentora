"use client";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, Clock, TrendingUp } from "lucide-react";
import SkillProgressBar from "./skillProgressBar";

const PRIORITY_CONFIG = {
  High:   { color: "bg-red-500/20 text-red-300 border-red-500/30",    icon: "🔴" },
  Medium: { color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", icon: "🟡" },
  Low:    { color: "bg-green-500/20 text-green-300 border-green-500/30",  icon: "🟢" },
};

export default function SkillGapResult({ result }) {
  const { target_role, match_score, matched_skills, missing_skills, recommendations, role_suggestions } = result;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/20">
        <p className="text-sm text-gray-400 mb-1">Analysis for</p>
        <h3 className="text-2xl font-bold text-white">{target_role}</h3>
        <div className="mt-4 max-w-md mx-auto">
          <SkillProgressBar score={match_score} />
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="text-center">
            <p className="text-green-400 font-bold text-xl">{matched_skills.length}</p>
            <p className="text-gray-500">Skills Matched</p>
          </div>
          <div className="text-center">
            <p className="text-red-400 font-bold text-xl">{missing_skills.length}</p>
            <p className="text-gray-500">Skills Missing</p>
          </div>
        </div>
      </div>

      {/* Role Suggestions (when role was auto-detected) */}
      {role_suggestions && role_suggestions.length > 0 && (
        <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Best Matching Roles for Your Skills
          </p>
          <div className="flex flex-col gap-2">
            {role_suggestions.map((s) => (
              <div key={s.role} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{s.role}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${s.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-10">{s.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills — Prioritized */}
      {recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" /> Skills to Learn (Prioritized by ML Model)
          </h4>
          <div className="space-y-2">
            {recommendations.map((rec) => {
              const cfg = PRIORITY_CONFIG[rec.priority];
              return (
                <div
                  key={rec.skill}
                  className={`flex items-center justify-between p-3 rounded-lg border ${cfg.color}`}
                >
                  <div className="flex items-center gap-2">
                    <span>{cfg.icon}</span>
                    <span className="font-medium text-sm">{rec.skill}</span>
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {rec.learning_time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Matched Skills */}
      {matched_skills.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" /> Skills You Already Have ✅
          </h4>
          <div className="flex flex-wrap gap-2">
            {matched_skills.map((skill) => (
              <Badge
                key={skill}
                className="bg-green-500/20 text-green-300 border border-green-500/30"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
