
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X, Plus, Loader2, Brain } from "lucide-react";

const COMMON_SKILLS = [
  "Python", "JavaScript", "React", "Node.js", "SQL", "Java", "Docker",
  "AWS", "Machine Learning", "TypeScript", "MongoDB", "Git", "REST APIs",
  "TensorFlow", "Kubernetes", "CSS", "HTML", "C++", "Go", "Figma",
];

export default function SkillGapForm({ roles, onAnalyze, loading }) {
  const [userSkills, setUserSkills] = useState([]);
  const [targetRole, setTargetRole] = useState(""); // "" = auto detect
  const [inputSkill, setInputSkill] = useState("");

  const addSkill = (skill) => {
    const s = skill.trim();
    if (s && !userSkills.includes(s)) {
      setUserSkills([...userSkills, s]);
    }
    setInputSkill("");
  };

  const removeSkill = (skill) => {
    setUserSkills(userSkills.filter((s) => s !== skill));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userSkills.length === 0) return;

    onAnalyze({
      user_skills: userSkills,
      //target_role: targetRole || "", // 🔥 auto-detect if empty
        target_role: targetRole === "auto" ? "" : targetRole,

    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Target Role */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Target Role{" "}
          <span className="text-gray-500">
            (optional — auto-detected if blank)
          </span>
        </label>

        <Select
          value={targetRole || "auto"}
          onValueChange={(value) => setTargetRole(value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="✨ Auto Detect or Select Role" />
          </SelectTrigger>

          <SelectContent className="bg-gray-800 border-gray-700">
            
            {/* ✅ AUTO DETECT OPTION */}
            <SelectItem value="auto">
              ✨ Auto Detect (Based on Skills)
            </SelectItem>

            {/* Roles */}
            {roles.map((role) => (
              <SelectItem 
                key={role}
                value={role}
                className="text-white hover:bg-gray-700"
              >
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ✅ Reset button */}
        {targetRole && (
          <button
            type="button"
            onClick={() => setTargetRole("")}
            className="text-xs text-blue-400 mt-2 hover:underline"
          >
            Reset to Auto Detect
          </button>
        )}

        {/* Optional hint */}
        {!targetRole && (
          <p className="text-xs text-blue-400 mt-2">
            🤖 AI will predict best matching role
          </p>
        )}
      </div>

      {/* Skill Input */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Current Skills
        </label>

        <div className="flex gap-2 mb-3">
          <Input
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (e.preventDefault(), addSkill(inputSkill))
            }
            placeholder="Type a skill and press Enter..."
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addSkill(inputSkill)}
            className="border-gray-700 text-gray-300 hover:bg-gray-700"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick add */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-1">
            {COMMON_SKILLS.filter((s) => !userSkills.includes(s))
              .slice(0, 10)
              .map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>

        {/* Selected Skills */}
        {userSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            {userSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1"
              >
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>
                  <X className="w-3 h-3 hover:text-red-400" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={userSkills.length === 0 || loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing with ML Model...
          </>
        ) : (
          <>
            <Brain className="w-4 h-4 mr-2" />
            Analyze Skill Gap
          </>
        )}
      </Button>
    </form>
  );
}