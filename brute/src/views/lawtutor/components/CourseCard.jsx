import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/lawtutor/${course.id}`}
      className="group block bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-emerald-900 mb-2 group-hover:text-emerald-700">
            {course.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {course.description}
          </p>
        </div>

        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
          →
        </div>
      </div>
    </Link>
  );
}
