import React, { useState, useEffect } from "react";
import StepProgressBar from "./components/StepProgressBar/StepProgressBar";
import SelectSkipStep from "./components/SelectSkipStep/SelectSkipStep";
import PlaceholderStep from "./components/PlaceholderStep/PlaceholderStep";

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
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // Start at "Select Skip"

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

  const handleStepClick = (index) => {
    // Allow navigation only to previous steps or the "Select Skip" step for now
    if (index <= currentStepIndex) {
      setCurrentStepIndex(index);
    } else if (index === 0 || index === 1) {
      alert(`Navigate to: ${steps[index]}`);
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

  return (
    <div className="bg-white min-h-screen">
      <StepProgressBar
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={handleStepClick}
      />

      {steps[currentStepIndex] === "Select Skip" ? (
        <SelectSkipStep
          skipSizes={skipSizes}
          selectedSkipId={selectedSkipId}
          setSelectedSkipId={setSelectedSkipId}
          onBack={() =>
            setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev))
          }
          onNext={() => {
            if (selectedSkipId) {
              setCurrentStepIndex((prev) =>
                prev < steps.length - 1 ? prev + 1 : prev
              );
            }
          }}
        />
      ) : (
        <PlaceholderStep
          title={steps[currentStepIndex]}
          onBack={() =>
            setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev))
          }
          onNext={() =>
            setCurrentStepIndex((prev) =>
              prev < steps.length - 1 ? prev + 1 : prev
            )
          }
        />
      )}
    </div>
  );
}
