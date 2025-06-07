import React, { useState, useEffect } from "react";

const steps = [
  "Postcode",
  "Waste Type",
  "Select Skip",
  "Permit Check",
  "Choose Date",
  "Payment",
];

export default function App() {
  const [skipSizes, setSkipSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  useEffect(() => {
    const fetchSkipSizes = async () => {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) throw new Error("Failed to fetch skip sizes");
        const data = await response.json();
        const skips = Array.isArray(data) ? data : data.data || [];
        setSkipSizes(skips);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSkipSizes();
  }, []);

  const getTotalPrice = (skip) =>
    skip.price_before_vat + (skip.price_before_vat * skip.vat) / 100;

  const getSkipImage = (size) => `/skip-images/${size}-yarder-skip.png`;

  const handleSelect = (id) => setSelectedSkipId(id);
  const handleBack = () => alert("Back button clicked");

  const handleContinue = () => {
    if (!selectedSkipId) return;
    const selected = skipSizes.find((s) => s.id === selectedSkipId);
    alert(`Continue with: ${selected?.size} Yard Skip`);
  };

  const handleStepClick = (step) => {
    if (step === "Postcode" || step === "Waste Type") {
      alert(`Navigate to: ${step}`);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg font-medium">
        Loading skip sizes...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-600 px-4">
        <p className="mb-6 text-center text-xl font-semibold">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          Retry
        </button>
      </div>
    );

  const selectedSkip = skipSizes.find((skip) => skip.id === selectedSkipId);
  const titleImageSrc = selectedSkip
    ? getSkipImage(selectedSkip.size)
    : "/skip-images/40-yarder-skip.png";

  return (
    <div className="bg-white min-h-screen">
      {/* Progress Bar Section */}
      <div className="relative bg-yellow-200 rounded-b-[6rem] px-4 sm:px-6 pt-10 pb-16">
        <div className="max-w-6xl mx-auto mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center w-max sm:w-full justify-between gap-3 relative z-10">
            {steps.map((step, index) => {
              const isCompleted = index < 2;
              const isCurrent = step === "Select Skip";

              return (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <div
                      className={`flex-1 h-1 ${
                        isCompleted || isCurrent
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                      style={{ minWidth: "40px", maxWidth: "100px" }}
                    />
                  )}
                  <div className="flex flex-col items-center text-center min-w-[50px]">
                    <div
                      onClick={() => handleStepClick(step)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold transition ${
                        isCurrent
                          ? "bg-yellow-500 text-black"
                          : isCompleted
                          ? "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">
                      {step}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Title and Image */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-sm font-semibold text-black mb-2">
              Select the skip size that best suits your needs
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-black">
              Choose Your Skip Size
            </h1>
            <p className="mt-4 text-base sm:text-lg text-black leading-relaxed">
              Imagery and information shown throughout this website may not
              reflect the exact shape or size specification, colours may vary,
              options and/or accessories may be featured at additional cost.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={titleImageSrc}
              alt={
                selectedSkip
                  ? `${selectedSkip.size} yard skip`
                  : "40 yard skip"
              }
              className="w-52 sm:w-64 md:w-72 h-auto object-contain drop-shadow-xl"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        </div>
      </div>

      {/* Skips Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-40 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {skipSizes.map((skip) => {
            const isSelected = selectedSkipId === skip.id;
            return (
              <div
                key={skip.id}
                className={`group w-full rounded-2xl shadow-lg flex flex-col transition duration-300 transform hover:-translate-y-1 hover:rotate-[0.5deg] ${
                  isSelected
                    ? "ring-4 ring-yellow-400 border-yellow-300 border"
                    : "border border-gray-200"
                }`}
              >
                <div className="flex justify-center -mt-5 z-10 group-hover:-translate-y-1 transition-transform duration-300">
                  <img
                    src={getSkipImage(skip.size)}
                    alt={`${skip.size} yard skip`}
                    className="w-44 sm:w-56 h-auto object-contain drop-shadow-lg"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>

                <div className="flex-1 px-6 py-5">
                  <h2 className="text-xl sm:text-2xl font-black mb-2 leading-tight">
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
                    £{getTotalPrice(skip).toFixed(2)}
                  </div>
                </div>

                <button
                  className={`w-full py-4 text-lg font-bold text-white transition ${
                    isSelected
                      ? "bg-yellow-600 rounded-b-2xl"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  onClick={() => handleSelect(skip.id)}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Buttons + Info */}
        <div className="max-w-6xl mx-auto px-4 mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          {selectedSkipId && (
            <div className="text-base sm:text-lg font-semibold text-gray-700">
              Selected Skip:{" "}
              <span className="font-bold">
                {selectedSkip?.size} Yard - £
                {(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:ml-auto w-full sm:w-auto">
            <button
              onClick={handleBack}
              className="px-6 py-3 font-semibold rounded-full text-yellow-600 border border-yellow-400 hover:bg-yellow-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full sm:w-auto"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedSkipId}
              className={`px-6 py-3 font-semibold rounded-full text-white shadow-lg transition duration-300 w-full sm:w-auto ${
                selectedSkipId
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-yellow-300 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
