import { Routes, Route } from "react-router-dom";
import LawTutorLayout from "./LawTutorLayout";
import CourseSelect from "./pages/CourseSelect";
import CourseHome from "./pages/CourseHome";
import SectionPage from "./pages/SectionPage";
import FinalQuiz from "./pages/FinalQuiz";
import ResultPage from "./pages/ResultPage";

export default function LawTutorRoutes() {
  return (
    <Routes>
      <Route element={<LawTutorLayout />}>
        <Route index element={<CourseSelect />} />

        {/* Course landing */}
        <Route path=":courseId" element={<CourseHome />} />

        {/* Section notes + quiz */}
        <Route path=":courseId/section/:sectionId" element={<SectionPage />} />

        {/* Final */}
        <Route path=":courseId/final" element={<FinalQuiz />} />
        <Route path=":courseId/result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
}
