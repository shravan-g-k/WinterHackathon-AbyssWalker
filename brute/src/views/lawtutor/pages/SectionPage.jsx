import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Assuming these are your data imports
import criminal from "../data/criminal";
import civil from "../data/civil";
import basic from "../data/basic";
import intermediate from "../data/intermediate";
import procedural from "../data/procedural";
import special from "../data/special";
import skills from "../data/skills";

const dataMap = { criminal, civil, basic, intermediate, procedural, special, skills };

export default function SectionPage() {
  const { courseId, sectionId } = useParams();
  const navigate = useNavigate();

  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});

  const course = dataMap[courseId];
  const section = course?.sections?.[sectionId - 1];

  useEffect(() => {
    setShowQuiz(false);
    setAnswers({});
    window.scrollTo(0, 0); // Scroll to top on section change
  }, [courseId, sectionId]);

  function handleSelect(qIndex, optionIndex) {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  }

  function submitQuiz() {
    let score = 0;
    section.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    alert(`You scored ${score} / ${section.quiz.length}`);
    const nextSection = Number(sectionId) + 1;

    if (nextSection <= course.sections.length) {
      navigate(`/lawtutor/${courseId}/section/${nextSection}`);
    } else {
      navigate(`/lawtutor/${courseId}/final`);
    }
  }

  if (!course || !section) {
    return <div className="text-center text-red-500 mt-16 font-medium">Course data not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      {/* PROGRESS HEADER */}
      <div className="mb-8">
        <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">
          Section {sectionId} of {course.sections.length}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-950 mt-2 tracking-tight">
          {section.title}
        </h1>
        <div className="h-1.5 w-24 bg-emerald-500 mt-4 rounded-full"></div>
      </div>

      {!showQuiz ? (
        <div className="animate-in fade-in duration-700">
          <p className="text-gray-600 text-xl mb-10 leading-relaxed italic">
            "Master these concepts before testing your knowledge."
          </p>

          {/* NOTES CARD */}
          <div className="bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 rounded-3xl p-6 md:p-10">
            <div className="space-y-8">
              {section.notes.map((n, i) => {
                // LOGIC: Split "Title: Description" to style them differently
                const [title, ...description] = n.includes(":") ? n.split(":") : ["Point", n];
                const descriptionText = description.join(":");

                return (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <div className="space-y-1">
                      {n.includes(":") ? (
                        <p className="text-gray-800 leading-relaxed">
                          <span className="font-bold text-emerald-900 text-lg block md:inline mr-2">
                            {title.trim()}
                          </span>
                          <span className="text-gray-600">{descriptionText.trim()}</span>
                        </p>
                      ) : (
                        <p className="text-gray-700 text-lg leading-relaxed">{n}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setShowQuiz(true)}
            className="mt-12 w-full md:w-auto px-10 py-4 bg-emerald-900 text-white rounded-2xl font-bold text-lg hover:bg-emerald-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-emerald-900/20"
          >
            I'm Ready: Start Quiz
          </button>
        </div>
      ) : (
        /* QUIZ VIEW */
        <div className="animate-in slide-in-from-bottom-10 duration-500">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-emerald-950">Knowledge Check</h2>
            <button 
              onClick={() => setShowQuiz(false)}
              className="text-emerald-700 hover:underline font-medium"
            >
              Back to notes
            </button>
          </div>

          <div className="space-y-6">
            {section.quiz.map((q, qi) => (
              <div key={qi} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
                <p className="font-bold mb-6 text-xl text-gray-900 leading-snug">
                  <span className="text-emerald-600 mr-2">{qi + 1}.</span> {q.question}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, oi) => (
                    <label
                      key={oi}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                        answers[qi] === oi 
                        ? "border-emerald-600 bg-emerald-50 shadow-sm" 
                        : "border-transparent bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        className="w-5 h-5 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                        name={`q${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => handleSelect(qi, oi)}
                      />
                      <span className={`text-lg ${answers[qi] === oi ? "text-emerald-900 font-semibold" : "text-gray-700"}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={submitQuiz}
            disabled={Object.keys(answers).length < section.quiz.length}
            className="mt-12 w-full md:w-auto px-12 py-4 bg-emerald-900 text-white rounded-2xl font-bold text-lg hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
          >
            Submit All Answers
          </button>
        </div>
      )}
    </div>
  );
}