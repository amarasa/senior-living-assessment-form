"use client";

import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { QuestionStep } from "./QuestionStep";
import { ContactForm } from "./ContactForm";
import { RecommendationResults } from "./RecommendationResults";
import {
	AssessmentData,
	CareRecommendation,
	Question,
} from "../types/assessment";

const TOTAL_STEPS = 12;

const questions: Question[] = [
	{
		id: "relationship",
		text: "Who is this assessment for?",
		options: [
			"Myself",
			"My spouse",
			"My parent",
			"My sibling",
			"Another family member or friend",
		],
	},
	{
		id: "occupancyType",
		text: "Will this be for one person or a couple?",
		options: ["One person", "A couple"],
	},
	{
		id: "ageRange",
		text: "What is their age range?",
		options: ["Under 65", "65-74", "75-84", "85 and above"],
	},
	{
		id: "livingSituation",
		text: "What is their current living situation?",
		options: [
			"Living independently at home",
			"At home with some family help",
			"At home with professional caregivers",
			"Currently in assisted living",
			"Recently hospitalized or in rehab",
		],
	},
	{
		id: "timeline",
		text: "What&apos;s your timeline for making a change?",
		options: [
			"Immediately (within 30 days)",
			"Within 2-3 months",
			"Within 6 months",
			"Just exploring options for the future",
		],
	},
	{
		id: "challenges",
		text: "What daily challenges are you most concerned about?",
		subtitle: "(Select all that apply)",
		options: [
			"Memory loss or confusion",
			"Fall risk or mobility issues",
			"Managing medications safely",
			"Feeling isolated or lonely",
			"Difficulty with household tasks",
		],
		isMultipleChoice: true,
	},
	{
		id: "supportNeeded",
		text: "What type of assistance would be most helpful?",
		subtitle: "(Select all that apply)",
		options: [
			"Medication reminders",
			"Help with dressing or bathing",
			"Meal preparation",
			"Transportation to appointments",
			"Housekeeping and laundry",
			"24/7 emergency response",
		],
		isMultipleChoice: true,
	},
	{
		id: "primaryConcerns",
		text: "What are your main motivations for considering senior living?",
		subtitle: "(Select all that apply)",
		options: [
			"Safety and security concerns",
			"Need more support than family can provide",
			"Desire for social connections and activities",
			"Peace of mind for family members",
			"Access to healthcare and wellness services",
		],
		isMultipleChoice: true,
	},
	{
		id: "needsRoundTheClock",
		text: "Is round-the-clock supervision needed?",
		options: [
			"Yes, definitely needed",
			"No, not at this time",
			"Unsure, depends on the situation",
		],
	},
	{
		id: "wanderingConcerns",
		text: "Are there any safety concerns like wandering or getting lost?",
		options: [
			"Yes, this is a concern",
			"No, not an issue",
			"Sometimes, but not frequently",
		],
	},
];

export function CareAssessment() {
	const [currentStep, setCurrentStep] = useState(0);
	const [assessmentData, setAssessmentData] = useState<AssessmentData>({
		relationship: "",
		occupancyType: "",
		ageRange: "",
		livingSituation: "",
		timeline: "",
		challenges: [],
		supportNeeded: [],
		primaryConcerns: [],
		needsRoundTheClock: "",
		wanderingConcerns: "",
		memoryDiagnosis: "",
		financialConsiderations: [],
		readinessToMove: "",
	});
	const [contactInfo, setContactInfo] = useState({
		name: "",
		phone: "",
		email: "",
		bestTimeToContact: "",
	});
	const [recommendation, setRecommendation] =
		useState<CareRecommendation | null>(null);

	const updateAssessmentData = (
		field: keyof AssessmentData,
		value: string | string[]
	) => {
		setAssessmentData((prev: AssessmentData) => ({
			...prev,
			[field]: value,
		}));
	};

	const nextStep = () => {
		if (currentStep < TOTAL_STEPS - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const getCurrentAnswer = (questionId: string): string | string[] => {
		const value = assessmentData[questionId as keyof AssessmentData];
		return value as string | string[];
	};

	const handleAnswerSelect = (
		questionId: string,
		answer: string | string[]
	) => {
		updateAssessmentData(questionId as keyof AssessmentData, answer);
	};

	const generateRecommendation = (): CareRecommendation => {
		// Memory Care recommendation logic
		const memoryCareScore = [
			assessmentData.challenges.includes("Memory loss or confusion"),
			assessmentData.wanderingConcerns === "Yes, this is a concern",
			assessmentData.memoryDiagnosis === "Yes, formally diagnosed",
			assessmentData.needsRoundTheClock === "Yes, definitely needed",
			assessmentData.primaryConcerns.includes(
				"Safety and security concerns"
			),
			assessmentData.timeline === "Immediately (within 30 days)" &&
				assessmentData.memoryDiagnosis !== "No diagnosis",
		].filter(Boolean).length;

		// Determine suite images based on occupancy type and care level
		const isCouple = assessmentData.occupancyType === "A couple";

		if (memoryCareScore >= 2) {
			return {
				type: "Memory Care",
				title: "Memory Care",
				description:
					"Based on your responses, Memory Care might provide the level of support and safety needed. Our specialized memory care community offers 24/7 supervision, structured activities, and a secure environment designed for residents with memory-related conditions.",
				suiteImages: isCouple
					? ["/suite-3.jpg", "/suite-5.jpg"]
					: ["/suite-3.jpg", "/suite-6.jpg"],
				features: [
					"24/7 specialized memory care support",
					"Secure, comfortable environment",
					"Structured daily activities and cognitive programs",
					"Medication management and health monitoring",
					"Family support and education services",
					"Person-centered care plans",
				],
			};
		} else {
			return {
				type: "Assisted Living",
				title: "Assisted Living",
				description:
					"Based on your responses, Assisted Living may be a great fit. Our assisted living community provides the right balance of independence and support, allowing residents to maintain their lifestyle while receiving the help they need.",
				suiteImages: isCouple
					? ["/suite-2.jpg", "/suite-4.jpg"]
					: ["/suite-2.jpg", "/suite-4.jpg", "/suite-6.jpg"],
				features: [
					"Personalized assistance with daily activities",
					"Medication management and health coordination",
					"Housekeeping, laundry, and maintenance services",
					"Social activities and wellness programs",
					"24/7 emergency response system",
					"Restaurant-style dining with nutritious meals",
				],
			};
		}
	};

	const handleSubmit = () => {
		const rec = generateRecommendation();
		setRecommendation(rec);
		setCurrentStep(TOTAL_STEPS - 1); // Go to results step
	};

	if (currentStep === 0) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-2'>
				<div className='w-full max-w-2xl mx-auto'>
					{/* Header with logo and info */}
					<div className='rounded-t-2xl bg-[#012169] px-8 pt-8 pb-4 flex flex-col items-center shadow-lg'>
						<img
							src='/kensington-reston-logo.svg'
							alt='The Kensington Reston Logo'
							className='h-16 mb-2'
							style={{ maxWidth: "350px", width: "100%" }}
						/>
						<div className='text-white text-center text-base font-sans font-medium mb-2'>
							11501 Sunrise Valley Dr. &bull; Reston, VA 20191
							&bull;{" "}
							<a
								href='tel:5714948100'
								className='underline hover:text-blue-200'
							>
								(571) 494-8100
							</a>
						</div>
					</div>

					{/* Main content */}
					<div className='bg-white rounded-b-2xl shadow-lg px-8 pb-8 pt-6 text-center'>
						<h1 className='text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2 mt-2'>
							Care Assessment Tool
						</h1>
						<blockquote className='italic text-[#6b7ba3] text-lg md:text-xl font-sans mb-2 mt-4 flex flex-col items-center relative'>
							<span className='flex items-start w-full justify-center relative'>
								<span
									className='absolute -top-2 -left-2 text-[3rem] text-[#cbd5e1] select-none pointer-events-none'
									aria-hidden='true'
								>
									&quot;
								</span>
								There is nothing more beautiful than someone who
								goes out of their way to make life beautiful for
								others.
							</span>
							<span className='block text-right w-full text-sm text-gray-500 mt-2'>
								&ndash; Mandy Hale
							</span>
						</blockquote>

						<div className='bg-blue-50 border-l-4 border-[#84754e] rounded-lg p-6 mb-8 mt-6 text-gray-800 text-base font-sans shadow-sm'>
							Not sure what kind of care your loved one needs?
							We&apos;re here to help. By answering a few quick
							questions, you&apos;ll receive personalized guidance
							from our team—whether you&apos;re planning ahead or
							seeking immediate support.
						</div>

						<button
							onClick={() => setCurrentStep(1)}
							className='bg-[#84754e] hover:bg-[#84754e]/90 text-white font-sans font-semibold py-3 px-8 rounded-lg text-lg transition-colors cursor-pointer shadow-md mb-4'
						>
							Start Assessment
						</button>

						<div className='mt-2 text-sm text-gray-600 font-sans'>
							Questions? Call us at{" "}
							<a
								href='tel:5714948100'
								className='font-bold text-[#012169]'
							>
								(571) 494-8100
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (currentStep === TOTAL_STEPS - 1 && recommendation) {
		return (
			<RecommendationResults
				recommendation={recommendation}
				contactInfo={contactInfo}
				assessmentData={assessmentData}
				onRestart={() => {
					setCurrentStep(0);
					setRecommendation(null);
					setAssessmentData({
						relationship: "",
						occupancyType: "",
						ageRange: "",
						livingSituation: "",
						timeline: "",
						challenges: [],
						supportNeeded: [],
						primaryConcerns: [],
						needsRoundTheClock: "",
						wanderingConcerns: "",
						memoryDiagnosis: "",
						financialConsiderations: [],
						readinessToMove: "",
					});
					setContactInfo({
						name: "",
						phone: "",
						email: "",
						bestTimeToContact: "",
					});
				}}
			/>
		);
	}

	if (currentStep === 11) {
		return (
			<div className='container mx-auto px-4 py-8 max-w-2xl'>
				<ProgressBar
					currentStep={currentStep}
					totalSteps={TOTAL_STEPS}
				/>
				<ContactForm
					contactInfo={contactInfo}
					setContactInfo={setContactInfo}
					onSubmit={handleSubmit}
					onBack={prevStep}
				/>
			</div>
		);
	}

	// Assessment questions
	const currentQuestion = questions[currentStep - 1];
	if (!currentQuestion) return null;

	return (
		<div className='container mx-auto px-4 py-8 max-w-2xl'>
			<ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
			<QuestionStep
				question={currentQuestion}
				selectedAnswer={getCurrentAnswer(currentQuestion.id)}
				onAnswerSelect={(answer) =>
					handleAnswerSelect(currentQuestion.id, answer)
				}
				onNext={nextStep}
				onBack={prevStep}
				currentStep={currentStep}
				isLastStep={currentStep === 10}
				isMultipleChoice={currentQuestion.isMultipleChoice}
			/>
		</div>
	);
}
