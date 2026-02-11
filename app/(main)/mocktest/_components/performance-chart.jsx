
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!assessments || assessments.length === 0) return;

    const formattedData = [...assessments]
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
      )
      .map((assessment) => ({
        label: format(new Date(assessment.createdAt), "MMM dd HH:mm"),
        score:
          assessment.quizScore !== null &&
          assessment.quizScore !== undefined
            ? assessment.quizScore
            : null, 
      }));

    setChartData(formattedData);
  }, [assessments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="label" />

              <YAxis domain={[0, 100]} />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const { score, label } = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium">
                          Score: {score ?? "N/A"}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {label}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

            
              <Line
                type="monotone"
                dataKey="score"
                stroke="#bc2ab2"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                connectNulls={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
