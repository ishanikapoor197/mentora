import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Quiz from "../_components/quiz"


const MockPage = () => {
  return (
    <div className="container mx-auto space-y-4 py-6">
    <div className="flex flex-col space-y-2 mx-2 ">
      <Link href={"/mocktest"}>
      <Button variant="link" className="gap-2 pl-0 text-lg"> 
        <ArrowLeft className="h-4 w-4" />
        Back to Quiz Preparation.
      </Button>

      </Link>

      <div>
        <h1 className="text-6xl font-bold gradient-title">Mock Quiz</h1>
        <p>Evaluate your knowledge through industry-specific questions</p>
      </div>
      </div>
      <Quiz/>
    </div>
  )
}

export default MockPage
