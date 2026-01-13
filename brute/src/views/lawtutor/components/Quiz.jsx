import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import criminal from "../data/criminal";
import civil from "../data/civil";
import basic from "../data/basic";
import intermediate from "../data/intermediate";

const dataMap = {
  criminal,
  civil,
  basic,
  intermediate
};

export default function Quiz() {
  const { courseId, sectionId } = useParams();
  const navigate = useNavigate();

  const section = dataMap[courseId]?.sections?.[sectionId - 1];
  const questions = section?.quiz || [];

  const [answers, setAnswers] = useState({});

  function handleSelect(qIndex, option) {
    setAnswers({ ...answers, [qIndex]: option });
  }

  function handleSubmit() {
    const nextSection = Number(sectionId) + 1;
    const totalSections = dataMap[courseId].sections.length;

    if (nextSection <= totalSections) {
      // go to NEXT SECTION NOTES (not quiz)
      navigate(`/lawtutor/${courseId}/section/${nextSection}`);
    } else {
      // all sections done → final quiz
      navigate(`/lawtutor/${courseId}/final`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h2 className="text-xl font-bold text-emerald-900">
        Quiz – {courseId} Section {sectionId}
      </h2>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="p-4 bg-white rounded-lg shadow">
          <p className="font-medium">{q.question}</p>
          <div className="mt-3 space-y-2">
            {q.options.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={`q-${qIndex}`}
                  className="mr-2"
                  checked={answers[qIndex] === opt}
                  onChange={() => handleSelect(qIndex, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-emerald-900 text-white rounded-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
}
