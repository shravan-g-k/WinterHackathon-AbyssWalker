import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import criminal from "../data/criminal";
import civil from "../data/civil";
import basic from "../data/basic";
import intermediate from "../data/intermediate";
import procedural from "../data/procedural";
import special from "../data/special";
import skills from "../data/skills";

const dataMap = { criminal, civil, basic, intermediate, procedural, special, skills };

export default function FinalQuiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = dataMap[courseId];
  const questions = course?.finalQuiz;

  const [answers, setAnswers] = useState({});

  if (!course || !questions) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl border border-red-200 shadow-sm">
          <p className="font-medium text-lg">⚠️ Final quiz data not found for this course.</p>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  function handleSelect(qIndex, optionIndex) {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  }

  function submitFinal() {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    navigate(`/lawtutor/${courseId}/result`, {
      state: { score, total: questions.length }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Progress Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm mb-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-emerald-900 leading-tight">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 font-medium">Certification Assessment</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Progress</span>
              <span className="text-sm font-semibold text-gray-700">{answeredCount} of {questions.length} answered</span>
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {questions.map((q, qi) => (
          <div 
            key={qi} 
            className={`p-6 md:p-8 bg-white rounded-2xl border transition-all duration-200 ${
              answers[qi] !== undefined ? 'border-emerald-200 shadow-sm' : 'border-gray-200 shadow-sm hover:border-gray-300'
            }`}
          >
            <div className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-sm">
                {qi + 1}
              </span>
              <div className="space-y-6 flex-grow">
                <p className="text-xl font-medium text-gray-800 leading-relaxed">
                  {q.question}
                </p>

                <div className="grid gap-3">
                  {q.options.map((opt, oi) => (
                    <label
                      key={oi}
                      className={`group flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        answers[qi] === oi
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        answers[qi] === oi ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                      }`}>
                        {answers[qi] === oi && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <input
                        type="radio"
                        className="hidden"
                        name={`q${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => handleSelect(qi, oi)}
                      />
                      <span className="font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-center pt-10">
          <button
            onClick={submitFinal}
            disabled={answeredCount < questions.length}
            className={`px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              answeredCount === questions.length
                ? 'bg-emerald-900 text-white hover:bg-emerald-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {answeredCount === questions.length ? 'Submit Certification Exam' : `Answer all questions (${answeredCount}/${questions.length})`}
          </button>
          <p className="mt-4 text-sm text-gray-500 italic">
            Double check your answers. You cannot change them after submission.
          </p>
        </div>
      </div>
    </div>
  );
}