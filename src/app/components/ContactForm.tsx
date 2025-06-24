import { ContactInfo } from "../types/assessment";

interface ContactFormProps {
	contactInfo: ContactInfo;
	setContactInfo: (info: ContactInfo) => void;
	onSubmit: () => void;
	onBack: () => void;
}

export function ContactForm({
	contactInfo,
	setContactInfo,
	onSubmit,
	onBack,
}: ContactFormProps) {
	const isFormValid =
		contactInfo.name && contactInfo.phone && contactInfo.email;

	const handleInputChange = (field: keyof ContactInfo, value: string) => {
		setContactInfo({ ...contactInfo, [field]: value });
	};

	/**
	 * Formats phone number input to (###) ###-#### format
	 * @param value - The raw phone number input
	 * @returns Formatted phone number string
	 */
	const formatPhoneNumber = (value: string): string => {
		// Remove all non-digit characters
		const digits = value.replace(/\D/g, "");

		// Limit to 10 digits
		const limitedDigits = digits.slice(0, 10);

		// Apply formatting based on length
		if (limitedDigits.length <= 3) {
			return limitedDigits;
		} else if (limitedDigits.length <= 6) {
			return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
		} else {
			return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
				3,
				6
			)}-${limitedDigits.slice(6)}`;
		}
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedPhone = formatPhoneNumber(e.target.value);
		handleInputChange("phone", formattedPhone);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isFormValid) {
			onSubmit();
		}
	};

	return (
		<div className='bg-white rounded-lg shadow-lg p-8'>
			<h2 className='text-2xl font-heading font-bold text-gray-800 mb-2'>
				Almost done! Let&apos;s get your contact information
			</h2>
			<p className='font-sans text-gray-600 mb-6'>
				Thank you! Our team will review your assessment and follow up
				shortly with personalized guidance and next steps.
			</p>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-sans font-medium text-gray-700 mb-2'
					>
						Full Name *
					</label>
					<input
						type='text'
						id='name'
						value={contactInfo.name}
						onChange={(e) =>
							handleInputChange("name", e.target.value)
						}
						className='w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#012169] focus:outline-none font-sans text-[#23272a] placeholder:text-[#6b7280]'
						placeholder='Enter your full name'
						required
					/>
				</div>

				<div>
					<label
						htmlFor='phone'
						className='block text-sm font-sans font-medium text-gray-700 mb-2'
					>
						Phone Number *
					</label>
					<input
						type='tel'
						id='phone'
						value={contactInfo.phone}
						onChange={handlePhoneChange}
						className='w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#012169] focus:outline-none font-sans text-[#23272a] placeholder:text-[#6b7280]'
						placeholder='(555) 123-4567'
						maxLength={14}
						required
					/>
				</div>

				<div>
					<label
						htmlFor='email'
						className='block text-sm font-sans font-medium text-gray-700 mb-2'
					>
						Email Address *
					</label>
					<input
						type='email'
						id='email'
						value={contactInfo.email}
						onChange={(e) =>
							handleInputChange("email", e.target.value)
						}
						className='w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#012169] focus:outline-none font-sans text-[#23272a] placeholder:text-[#6b7280]'
						placeholder='your.email@example.com'
						required
					/>
				</div>

				<div>
					<label
						htmlFor='bestTime'
						className='block text-sm font-sans font-medium text-gray-700 mb-2'
					>
						Best Time to Contact (Optional)
					</label>
					<select
						id='bestTime'
						value={contactInfo.bestTimeToContact}
						onChange={(e) =>
							handleInputChange(
								"bestTimeToContact",
								e.target.value
							)
						}
						className='w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#012169] focus:outline-none font-sans text-[#23272a]'
					>
						<option value=''>Select preferred time</option>
						<option value='Morning (8 AM - 12 PM)'>
							Morning (8 AM - 12 PM)
						</option>
						<option value='Afternoon (12 PM - 5 PM)'>
							Afternoon (12 PM - 5 PM)
						</option>
						<option value='Evening (5 PM - 8 PM)'>
							Evening (5 PM - 8 PM)
						</option>
						<option value='Anytime'>Anytime</option>
					</select>
				</div>

				<div className='flex justify-between pt-4'>
					<button
						type='button'
						onClick={onBack}
						className='flex items-center text-[#012169] hover:text-[#012169]/80 font-sans font-medium transition-colors cursor-pointer'
					>
						<svg
							className='w-4 h-4 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
						Previous
					</button>
					<button
						type='submit'
						disabled={!isFormValid}
						className={`px-8 py-3 rounded-lg font-sans font-semibold transition-colors cursor-pointer ${
							isFormValid
								? "bg-[#84754e] hover:bg-[#84754e]/90 text-white"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						}`}
					>
						Get My Recommendation
					</button>
				</div>
			</form>
		</div>
	);
}
