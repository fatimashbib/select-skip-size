import React from "react";

export default function StepProgressBar({ steps, currentStepIndex, onStepClick }) {
  return (
    <div className="relative bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-b-[5rem] px-8 pt-6 pb-6 shadow-inner shadow-yellow-200">
      <div className="max-w-6xl mx-auto mb-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center min-w-[600px] md:min-w-full md:justify-between relative z-10">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div
                    className={`flex-1 h-1 rounded-full ${
                      isCompleted || isCurrent ? "bg-yellow-600" : "bg-yellow-300"
                    }`}
                    style={{ minWidth: "40px", maxWidth: "100px" }}
                  />
                )}
                <div className="flex flex-col items-center text-center min-w-[50px] px-2 md:px-0">
                  <div
                    onClick={() => onStepClick(index)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition shadow-md ${
                      isCurrent
                        ? "bg-yellow-600 text-white cursor-default"
                        : isCompleted
                        ? "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
                        : "bg-yellow-100 text-yellow-700 cursor-not-allowed"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="mt-2 text-xs md:text-sm font-semibold text-yellow-900 whitespace-nowrap select-none">
                    {step}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
