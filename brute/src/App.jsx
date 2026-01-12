import { BrowserRouter, Routes, Route } from "react-router-dom";
import LawTutorRoutes from "./views/lawtutor/LawTutorRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lawtutor/*" element={<LawTutorRoutes />} />

        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f5ed]">
              <h1 className="text-3xl font-bold text-emerald-900 mb-4">
                Judiciary Platform
              </h1>
              <a
                href="/lawtutor"
                className="px-6 py-3 bg-emerald-900 text-white rounded-xl shadow hover:bg-emerald-800 transition"
              >
                Go to LawTutor
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
