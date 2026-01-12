import { courses } from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function CourseSelect() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Law Library
            </h1>
          </div>
          <p className="text-lg text-slate-500 max-w-lg">
            Select a specialized legal track to begin your path toward mastery. 
            Our modules are designed for both beginners and practitioners.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Available Tracks</span>
            <span className="text-xl font-bold text-emerald-700">{courses.length} Modules</span>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10 rounded-2xl"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}