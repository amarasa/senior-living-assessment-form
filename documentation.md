# Senior Living Community Selector - Developer Documentation

## Overview

The Senior Living Community Selector is a React-based assessment tool built with Next.js 14 that helps prospective residents and families identify suitable senior living communities. The application uses a multi-step assessment flow to collect user preferences and generates personalized recommendations.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React hooks (useState, useEffect)
- **Build Tool**: Next.js built-in bundler
- **Deployment**: Vercel-optimized

### Project Structure

```
src/app/
├── components/           # Reusable React components
├── types/               # TypeScript type definitions
├── layout.tsx          # Root layout component
├── page.tsx           # Main page component
├── globals.css        # Global styles and Tailwind imports
└── favicon.ico        # Application favicon

public/                 # Static assets
├── suite-*.jpg        # Suite images for recommendations
└── *.svg             # Icon assets
```

## Core Components

### 1. CareAssessment.tsx
**Purpose**: Main orchestrator component managing the entire assessment flow.

**Key Features**:
- State management for assessment data, contact info, and current step
- Progress tracking and navigation
- Recommendation generation logic
- Step validation and flow control

**Implementation Details**:
```typescript
interface AssessmentData {
  occupancyType: string
  careLevel: string
  // ... other properties
}

const [assessmentData, setAssessmentData] = useState<AssessmentData>({
  // Initial state
})
```

**State Flow**:
1. Assessment questions (multiple steps)
2. Contact information collection
3. Recommendation generation and display

### 2. ContactForm.tsx
**Purpose**: Collects user contact information with enhanced UX features.

**Key Features**:
- **Phone Number Masking**: Real-time formatting as `(###) ###-####`
- Form validation with visual feedback
- Accessibility compliance
- Error handling and user guidance

**Phone Masking Implementation**:
```typescript
/**
 * Formats phone number input to (###) ###-#### format
 * @param value - The raw phone number input
 * @returns Formatted phone number string
 */
const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '')
  
  // Limit to 10 digits
  const limitedDigits = digits.slice(0, 10)
  
  // Apply formatting based on length
  if (limitedDigits.length <= 3) {
    return limitedDigits
  } else if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`
  } else {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`
  }
}
```

**Form Validation**:
- Required field validation for name, phone, and email
- Real-time feedback with visual indicators
- Submit button state management based on form validity

### 3. RecommendationResults.tsx
**Purpose**: Displays personalized recommendations with interactive features.

**Key Features**:
- **Image Modal Gallery**: Clickable suite images with modal display
- Dynamic video content based on occupancy type
- Feature listing with visual indicators
- Contact information display and next steps

**Modal Implementation**:
```typescript
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
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Modal content */}
    </div>
  )
}
```

**Image Gallery Features**:
- Hover effects with visual feedback
- Transform animations on hover
- Accessibility considerations (alt text, keyboard navigation)
- Click-to-enlarge functionality
- Modal close on outside click or X button

### 4. QuestionStep.tsx
**Purpose**: Renders individual assessment questions with various input types.

**Supported Question Types**:
- Single choice (radio buttons)
- Multiple choice (checkboxes)
- Text input
- Select dropdowns
- Range sliders

### 5. ProgressBar.tsx
**Purpose**: Visual progress indicator for assessment completion.

**Features**:
- Dynamic progress calculation
- Smooth transitions
- Step indicators
- Responsive design

## Type Definitions

### Core Types (assessment.ts)

```typescript
interface AssessmentData {
  occupancyType: string
  careLevel: string
  socialPreference: string
  diningPreference: string
  activityLevel: string
  healthStatus: string
  budgetRange: string
  timeframe: string
  location: string
  // Additional properties...
}

interface ContactInfo {
  name: string
  phone: string
  email: string
  bestTimeToContact: string
}

interface CareRecommendation {
  title: string
  description: string
  features: string[]
  suiteImages: string[]
  // Additional recommendation properties...
}
```

## State Management

### Assessment Flow State
The application uses React hooks for state management with the following pattern:

```typescript
// Main assessment state
const [assessmentData, setAssessmentData] = useState<AssessmentData>(initialState)

// Contact information state
const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo)

// Current step tracking
const [currentStep, setCurrentStep] = useState<number>(0)

// Recommendation state
const [recommendation, setRecommendation] = useState<CareRecommendation | null>(null)
```

### State Updates
- Immutable state updates using spread operator
- Type-safe state modifications with TypeScript
- Centralized state management in main component
- Props drilling for child component communication

## Styling Architecture

### Tailwind CSS Implementation
- Utility-first approach for rapid development
- Custom configuration in `tailwind.config.js`
- Responsive design patterns
- Component-level styling with consistent design tokens

### Design System
- Color palette focused on accessibility
- Typography scale optimized for senior users
- Spacing and sizing consistent throughout
- Interactive states for all clickable elements

### Key Style Patterns

```css
/* Primary button style */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors;
}

/* Card component style */
.card {
  @apply bg-white rounded-lg shadow-lg overflow-hidden;
}

/* Input field style */
.input-field {
  @apply w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none;
}
```

## Feature Implementation Details

### Phone Number Masking
- Real-time input formatting without external libraries
- Input restriction to numeric characters only
- Progressive formatting based on input length
- Maximum length enforcement (14 characters including formatting)
- Accessible with proper ARIA labels

### Image Modal Gallery
- Pure CSS modal implementation without external dependencies
- Z-index management for proper layering
- Click-outside-to-close functionality
- Keyboard accessibility (ESC key support)
- Responsive image sizing with `object-contain`
- Smooth transitions and animations

### Recommendation Engine
- Rule-based recommendation logic
- Dynamic content selection based on user responses
- Configurable recommendation templates
- Image asset management for suite displays

## Performance Considerations

### Optimization Strategies
- Next.js automatic code splitting
- Image optimization with Next.js Image component
- CSS-in-JS avoided in favor of Tailwind for better performance
- Component lazy loading where appropriate
- Minimal JavaScript bundle size

### Loading States
- Progressive loading of assessment steps
- Skeleton loading patterns
- Optimistic UI updates
- Error boundary implementation

## Accessibility Features

### WCAG 2.1 Compliance
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast color ratios
- Focus management in modal components

### Senior-Friendly UX
- Large click targets
- Clear visual hierarchy
- Simple navigation patterns
- Readable font sizes
- Minimal cognitive load

## Testing Strategy

### Recommended Testing Approach
- Unit tests for utility functions (phone formatting)
- Component testing with React Testing Library
- Integration tests for assessment flow
- Accessibility testing with axe-core
- Manual testing on various devices

### Test Cases
- Phone number formatting edge cases
- Modal open/close functionality
- Form validation scenarios
- Assessment flow completion
- Responsive design verification

## Deployment & DevOps

### Build Configuration
- Next.js production build optimization
- Static asset optimization
- Environment variable management
- Build performance monitoring

### Vercel Deployment
- Automatic deployments from Git
- Preview deployments for pull requests
- Environment variable configuration
- Analytics and performance monitoring

## Security Considerations

### Data Protection
- Client-side form validation
- Input sanitization for contact information
- No sensitive data storage in localStorage
- HTTPS enforcement
- Content Security Policy headers

### Privacy Compliance
- Minimal data collection
- Clear privacy notices
- Secure data transmission
- GDPR considerations for international users

## Future Technical Enhancements

### Planned Improvements
- Server-side rendering optimization
- Database integration for assessment storage
- API integration for dynamic recommendations
- Advanced analytics implementation
- Multi-language support architecture
- Progressive Web App features

### Scalability Considerations
- Component library extraction
- Micro-frontend architecture planning
- API layer abstraction
- State management library evaluation (Redux Toolkit)
- Performance monitoring implementation

## Development Workflow

### Getting Started
1. Clone repository and install dependencies
2. Set up environment variables
3. Run development server
4. Follow component development patterns
5. Implement proper TypeScript typing
6. Write comprehensive documentation

### Code Standards
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Prettier for consistent formatting
- Component naming conventions
- File organization standards
- Git commit message conventions

### Documentation Requirements
- JSDoc comments for all functions
- README updates for new features
- Type documentation for complex interfaces
- Component prop documentation
- API integration documentation

---

*This documentation is maintained alongside code changes to ensure accuracy and completeness.* 