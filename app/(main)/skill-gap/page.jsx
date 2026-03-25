
"use client";
import { useState, useEffect } from "react";
import { Brain, Zap } from "lucide-react";
import SkillGapForm from "@/components/skill-gap/skillGapForm";
import SkillGapResult from "@/components/skill-gap/skillGapResult";
import { useUser } from "@clerk/nextjs";

export default function SkillGapPage() {
  const [roles, setRoles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    fetch("/api/skill-gap")
      .then((r) => r.json())
      .then((d) => setRoles(d.roles || []));
  }, []);

  const handleAnalyze = async ({ user_skills, target_role }) => {
    setLoading(true);
    setResult(null);
    // const res = await fetch("/api/skill-gap", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ user_skills, target_role }),
    // });
    const res = await fetch("/api/skill-gap", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user_skills,
    target_role,
    userId: user?.id, // 🔥 ADD THIS
  }),
});
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Skill Gap Analyser</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Powered by a custom-trained ML model — not an LLM. Add your current skills,
            pick a target role, and get a precise gap analysis with a prioritized learning roadmap.
          </p>
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400">
            <Zap className="w-3 h-3" /> ML Model: TF-IDF + Logistic Regression (trained on custom 5000 datasets)
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <SkillGapForm roles={roles} onAnalyze={handleAnalyze} loading={loading} />
        </div>

        {/* Result Card */}
        {result && !result.error && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <SkillGapResult result={result} />
          </div>
        )}

        {result?.error && (
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
            ⚠️ {result.error}
          </div>
        )}
      </div>
    </div>
  );
}
