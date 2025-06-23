import { Question } from '../types/assessment'

interface QuestionStepProps {
  question: Question
  selectedAnswer: string | string[]
  onAnswerSelect: (answer: string | string[]) => void
  onNext: () => void
  onBack: () => void
  currentStep: number
  isLastStep?: boolean
  isMultipleChoice?: boolean
}

export function QuestionStep({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onBack,
  currentStep,
  isLastStep,
  isMultipleChoice
}: QuestionStepProps) {
  const handleSingleSelect = (value: string) => {
    onAnswerSelect(value)
  }

  const handleMultipleSelect = (value: string) => {
    const current = (selectedAnswer as string[]) || []
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    onAnswerSelect(updated)
  }

  const isSelected = (option: string): boolean => {
    if (isMultipleChoice) {
      return Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
    }
    return selectedAnswer === option
  }

  const hasValidAnswer = isMultipleChoice 
    ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0
    : selectedAnswer !== ''

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">
        {question.text}
      </h2>
      {question.subtitle && (
        <p className="font-sans text-gray-600 mb-6">{question.subtitle}</p>
      )}

      <div className="space-y-4 mb-8">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            type="button"
            onClick={() => isMultipleChoice ? handleMultipleSelect(option) : handleSingleSelect(option)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              isSelected(option)
                ? 'border-[#012169] bg-gradient-to-b from-white to-[#84754e]/20'
                : 'border-gray-200 hover:border-gray-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center">
              {isMultipleChoice ? (
                // Checkbox
                <div className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center ${
                  isSelected(option)
                    ? 'border-[#012169] bg-[#012169]'
                    : 'border-gray-300'
                }`}>
                  {isSelected(option) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ) : (
                // Radio button
                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                  isSelected(option)
                    ? 'border-[#012169] bg-[#012169]'
                    : 'border-gray-300'
                }`}>
                  {isSelected(option) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              )}
              <span className="font-sans text-gray-900 font-medium">
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        {currentStep === 1 ? (
          <div></div>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-[#012169] hover:text-[#012169]/80 font-sans font-medium transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        )}
        <button
          onClick={hasValidAnswer ? onNext : undefined}
          disabled={!hasValidAnswer}
          className={`px-6 py-3 rounded-lg font-sans font-semibold transition-colors cursor-pointer ${
            hasValidAnswer
              ? 'bg-[#84754e] hover:bg-[#84754e]/90 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLastStep ? 'Continue to Contact Info' : 'Next'}
        </button>
      </div>
    </div>
  )
} 