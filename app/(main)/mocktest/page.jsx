import { getAssessments } from "@/actions/mocktest"
import StatsCards from "./_components/stats-card";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";

const MockTestPage = async() => {
const assessments=await getAssessments();

  return (
    <div>
      <div >
        <h1 className="text-6xl font-bold gradient-title mb-5">Quiz Preparation</h1>
        <div className="space-y-6">
          <StatsCards assessments={assessments}/>
          <PerformanceChart assessments={assessments}/>
          <QuizList assessments={assessments}/>
        </div>
      </div>
    </div>
  )
}

export default MockTestPage
