import { Outlet, Link } from "react-router-dom";

export default function LawTutorLayout() {
  return (
    <div className="min-h-screen bg-[#f3f5ed]">
      {/* Top bar */}
      <div className="bg-white shadow p-4 flex items-center justify-between">
        <Link to="/lawtutor" className="text-xl font-bold text-emerald-900">
          LawTutor
        </Link>
        <span className="text-gray-500 text-sm">
          Learn Law the smart way
        </span>
      </div>

      {/* Page content */}
      <div className="max-w-5xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}
