import { useLocation, useParams, Link } from "react-router-dom";

export default function ResultPage() {
  const { courseId } = useParams();
  const { state } = useLocation();

  const score = state?.score || 0;
  const total = state?.total || 0;

  return (
    <div className="text-center space-y-6">

      <h1 className="text-4xl font-bold text-emerald-900">
        {courseId} Result
      </h1>

      <p className="text-xl">
        You scored <b>{score}</b> out of <b>{total}</b>
      </p>

      <Link
        to="/lawtutor"
        className="inline-block px-6 py-3 bg-emerald-900 text-white rounded-xl"
      >
        Back to Courses
      </Link>

    </div>
  );
}
