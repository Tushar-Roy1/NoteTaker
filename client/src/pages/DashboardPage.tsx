import { Link } from "react-router-dom";
import { FaPlus, FaStickyNote } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 flex items-center justify-center gap-3">
          <FaStickyNote className="text-indigo-600" />
          Note Taking App
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Organize your thoughts, keep track of ideas, and boost productivity.
        </p>

        {/* Preview Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-indigo-700 mb-2">Meeting Notes</h3>
            <p className="text-gray-600 text-sm">
              Discuss project roadmap, deadlines, and next sprint goals...
            </p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-pink-700 mb-2">Shopping List</h3>
            <p className="text-gray-600 text-sm">
              Milk, Bread, Eggs, Butter, Coffee...
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-yellow-700 mb-2">Ideas</h3>
            <p className="text-gray-600 text-sm">
              Start a side project on note-taking with AI summaries...
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            <FaPlus /> Get Started – Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
