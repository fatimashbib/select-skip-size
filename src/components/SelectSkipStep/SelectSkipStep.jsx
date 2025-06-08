import React from "react";

const getSkipImage = (size) => `/skip-images/${size}-yarder-skip.png`;

export default function SelectSkipStep({
  skipSizes,
  selectedSkipId,
  setSelectedSkipId,
  onBack,
  onNext,
}) {
  const selectedSkip = skipSizes.find((skip) => skip.id === selectedSkipId);

  return (
    <>
      {/* Title section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 text-center md:text-left">
        <div className="text-base font-semibold text-yellow-600 tracking-wide uppercase">
          Select the skip size that best suits your needs
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-black-900 leading-tight relative">
          Choose Your Skip Size
          <span className="block w-20 h-1 bg-yellow-600 rounded mt-3 mx-auto md:mx-0"></span>
        </h1>
      </div>

      {/* Skips Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-40 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16 md:gap-y-16">
          {skipSizes.map((skip) => {
            const isSelected = selectedSkipId === skip.id;

            return (
              <div
                key={skip.id}
                className={`group relative rounded-2xl shadow-lg flex flex-col transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:rotate-[0.5deg] ${
                  isSelected
                    ? "ring-4 ring-yellow-400 border-yellow-300 border"
                    : "border border-gray-200"
                }`}
              >
                <div className="flex justify-center -mt-5 z-10 group-hover:-translate-y-1 transition-transform duration-300">
                  <img
                    src={getSkipImage(skip.size)}
                    alt={`${skip.size} yard skip`}
                    className="w-60 h-auto object-contain drop-shadow-lg"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>

                <div className="flex-1 px-8 py-6">
                  <h2 className="text-2xl font-black mb-2 leading-tight">
                    {skip.size} Yard {skip.waste_type || ""} Skip
                  </h2>
                  <div className="mb-2 font-semibold text-sm">
                    {skip.hire_period_days} day hire period
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    Note:{" "}
                    {skip.allowed_on_road
                      ? "Road placement allowed"
                      : "Road placement not allowed"}
                  </div>
                  <div className="text-xl font-bold mt-2 mb-2">
                    £{skip.price_before_vat.toFixed(2)}
                  </div>
                </div>

                <button
                  className={`w-full py-5 text-lg font-bold text-white transition ${
                    isSelected
                      ? "bg-yellow-600 rounded-b-2xl"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  onClick={() => setSelectedSkipId(skip.id)}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Buttons and Selected Skip info below grid */}
        <div className="max-w-6xl mx-auto px-4 mt-12 flex flex-col md:flex-row md:items-center gap-4 w-full">
          {selectedSkipId && (
            <div className="text-lg font-semibold text-yellow-700">
              <span className="font-bold">
                {selectedSkip?.size} Yard Skip Size - £
                {(selectedSkip.price_before_vat).toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex gap-6 md:ml-auto w-full md:w-auto justify-center md:justify-start">
            <button
              onClick={onBack}
              className="px-6 py-3 font-semibold rounded-full text-yellow-600 border border-yellow-400 hover:bg-yellow-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full md:w-auto"
            >
              Back
            </button>
            <button
              onClick={onNext}
              disabled={!selectedSkipId}
              className={`px-6 py-3 font-semibold rounded-full text-white shadow-lg transition duration-300 w-full md:w-auto ${
                selectedSkipId
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-yellow-300 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Disclaimer note directly below */}
        {selectedSkipId && (
          <div className="max-w-6xl mx-auto px-4 mt-6 text-xs text-gray-500 italic select-none">
            Imagery and information shown throughout this website may not reflect the
            exact shape or size specification, colours may vary, options and/or
            accessories may be featured at additional cost.
          </div>
        )}
      </div>
    </>
  );
}
