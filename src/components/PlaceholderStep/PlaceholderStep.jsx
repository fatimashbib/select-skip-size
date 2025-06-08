import React from "react";

export default function PlaceholderStep({ title, onBack, onNext }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-4xl mx-auto px-4 text-center text-gray-700">
      <h2 className="mb-8 text-4xl font-extrabold">{title}</h2>
      <p className="mb-6 max-w-md text-lg">
        This step ("{title}") is a placeholder. You can customize it with actual
        content as needed.
      </p>
      <div className="flex gap-6">
        <button
          onClick={onBack}
          className="px-6 py-3 font-semibold rounded-full text-yellow-600 border border-yellow-400 hover:bg-yellow-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 font-semibold rounded-full bg-yellow-600 text-white shadow-lg hover:bg-yellow-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
