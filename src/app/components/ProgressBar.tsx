interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-sans font-medium text-[#012169]">
          Step {currentStep} of {totalSteps - 1}
        </span>
        <span className="text-sm font-sans font-medium text-[#012169]">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-[#012169] h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
} 