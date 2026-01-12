import { useParams, Link } from "react-router-dom";
import criminal from "../data/criminal";
import civil from "../data/civil";
import basic from "../data/basic";
import intermediate from "../data/intermediate";
import procedural from "../data/procedural";
import special from "../data/special";
import skills from "../data/skills";

const dataMap = { criminal, civil, basic, intermediate, procedural, special, skills };

export default function CourseHome() {
  const { courseId } = useParams();
  const course = dataMap[courseId];

  if (!course) return <div className="p-10 text-center">Course not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      
      {/* Course Hero Section */}
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <span className="bg-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-400/30">
            Law Module
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {course.title}
          </h1>
          <p className="text-emerald-100/80 max-w-xl">
            Master the core principles, statutes, and legal frameworks through our structured learning path and interactive assessments.
          </p>
          <div className="flex gap-6 pt-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="opacity-60 text-emerald-400">●</span> {course.sections.length} Modules
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-60 text-emerald-400">●</span> Final Certification Available
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl"></div>
      </div>

      {/* Curriculum Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold text-gray-800">Course Curriculum</h2>
          <p className="text-sm text-gray-500 font-medium">{course.sections.length} Sections total</p>
        </div>

        <div className="grid gap-4">
          {course.sections.map((section, index) => (
            <Link
              key={index}
              to={`/lawtutor/${courseId}/section/${index + 1}`}
              className="group block bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200"
            >
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-50 group-hover:bg-emerald-50 text-gray-400 group-hover:text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg transition-colors">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800 group-hover:text-emerald-900 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Interactive Study Notes & Practice Quiz
                  </p>
                </div>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                  <span className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Final Assessment CTA */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-emerald-900">Ready for the Final?</h3>
          <p className="text-emerald-700 text-sm">Complete all modules to unlock your final certification exam.</p>
        </div>
        <Link
          to={`/lawtutor/${courseId}/final`}
          className="w-full md:w-auto px-8 py-4 bg-emerald-900 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Take Final Quiz →
        </Link>
      </div>
    </div>
  );
}