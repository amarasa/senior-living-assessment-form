import { CareRecommendation, ContactInfo, AssessmentData } from '../types/assessment'
import { useState } from 'react'

interface RecommendationResultsProps {
  recommendation: CareRecommendation
  contactInfo: ContactInfo
  assessmentData: AssessmentData
  onRestart?: () => void
}

/**
 * Modal component for displaying enlarged suite images
 */
interface ImageModalProps {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  onClose: () => void
}

function ImageModal({ isOpen, imageSrc, imageAlt, onClose }: ImageModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 overflow-auto"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-3xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
          aria-label="Close modal"
        >
          ×
        </button>
        
        {/* Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

export function RecommendationResults({ recommendation, contactInfo, assessmentData }: RecommendationResultsProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  /**
   * Opens the image modal with the selected image
   * @param imageSrc - The source URL of the image
   * @param imageAlt - The alt text for the image
   */
  const openImageModal = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt })
  }

  /**
   * Closes the image modal
   */
  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#012169] to-[#012169] text-white p-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-2">Your Personalized Recommendation</h1>
          <p className="font-sans text-blue-100">Based on your assessment responses</p>
        </div>

        {/* Recommendation Section */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              {recommendation.title}
            </h2>
            <p className="text-lg font-sans text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {recommendation.description}
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-8">
            <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4 text-center">
              {assessmentData.occupancyType === 'A couple' ? 'See How Couples Thrive at Kensington' : 'Discover Life at Kensington'}
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    src={assessmentData.occupancyType === 'A couple' 
                      ? 'https://www.youtube.com/embed/8CPJWdycfQU?rel=0&modestbranding=1'
                      : 'https://www.youtube.com/embed/8CPJWdycfQU?rel=0&modestbranding=1' // TODO: Replace with single person video URL
                    }
                    title={assessmentData.occupancyType === 'A couple' ? 'Couples at Kensington' : 'Life at Kensington'}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-8">
            <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4 text-center">
              What This Includes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendation.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-sans text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suite Images Section */}
          <div className="mb-8">
            <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6 text-center">
              Your Recommended Living Spaces
            </h3>
            <p className="text-sm font-sans text-gray-500 text-center mb-4">
              Click on any image to view it larger
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendation.suiteImages.map((image, index) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
                  onClick={() => openImageModal(image, `Suite ${index + 1}`)}
                >
                  <div className="relative h-48 group">
                    <img
                      src={image}
                      alt={`Suite ${index + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                    />
                    {/* Subtle hover indicator */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg">
                        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="font-heading font-semibold text-gray-800">
                      Suite {index + 1}
                    </h4>
                    <p className="text-sm font-sans text-gray-600">
                      Comfortable and welcoming living space
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-center">
            <h3 className="text-lg font-heading font-semibold text-gray-800 mb-2">
              Thank you, {contactInfo.name}!
            </h3>
            <p className="font-sans text-gray-600">
              We&apos;ll be in touch soon to discuss your personalized care options.
            </p>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-heading font-semibold text-gray-800 mb-2">
                What happens next?
              </h3>
              <p className="font-sans text-gray-600 mb-4">
                Our senior living specialists will review your assessment and contact you within 24 hours 
                to discuss your options and answer any questions you may have.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm font-sans text-gray-600">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#012169] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</div>
                  Personal consultation
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#012169] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</div>
                  Schedule a tour
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#012169] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</div>
                  Explore your options
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="https://kensingtonreston.com/schedule-your-visit-to-the-kensington-reston/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#84754e] hover:bg-[#84754e]/90 text-white font-sans font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Schedule a Tour
              </a>
              <div className="text-sm font-sans text-gray-600">
                <p>Questions? Call us at <strong>(571) 494-8100</strong></p>
                <p>The Kensington Reston • 11501 Sunrise Valley Dr. • Reston, VA 20191</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        onClose={closeImageModal}
      />
    </div>
  )
} 