# Senior Living Community Selector

A Next.js-powered assessment tool that helps prospective residents and their families find the most suitable senior living community based on their specific needs and preferences.

## 🌟 Features

### Interactive Care Assessment

-   Multi-step questionnaire to evaluate care needs, lifestyle preferences, and family dynamics
-   Progress tracking with visual indicators
-   Responsive design for all devices

### Smart Recommendations

-   AI-powered personalized recommendations based on assessment responses
-   Customized care level suggestions (Independent Living, Assisted Living, Memory Care)
-   Video content tailored to individual vs. couple living situations

### Enhanced User Experience

-   **Phone Number Masking**: Automatic formatting of phone inputs as `(###) ###-####`
-   **Image Modal Gallery**: Clickable suite images that open in full-screen modal view
-   Professional contact form with validation
-   Seamless user journey from assessment to contact

### Contact & Follow-up

-   Integrated contact form with validation
-   Automated follow-up workflow
-   Direct integration with Kensington Reston scheduling system

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd senior-living-community-selector

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── CareAssessment.tsx      # Main assessment flow
│   │   ├── ContactForm.tsx         # Contact form with phone masking
│   │   ├── ProgressBar.tsx         # Assessment progress indicator
│   │   ├── QuestionStep.tsx        # Individual question components
│   │   └── RecommendationResults.tsx # Results with clickable images
│   ├── types/
│   │   └── assessment.ts           # TypeScript type definitions
│   ├── layout.tsx                  # App layout
│   ├── page.tsx                   # Main page
│   └── globals.css               # Global styles
└── public/                       # Static assets including suite images
```

## 🔧 Usage Examples

### Phone Number Input

The contact form automatically formats phone numbers as users type:

-   Input: `5551234567`
-   Displays: `(555) 123-4567`

### Suite Image Gallery

Users can click on any suite image in the recommendations to view a larger version:

-   Hover effects indicate clickable images
-   Modal displays full-size image with close functionality
-   Accessible keyboard navigation support

### Assessment Flow

1. User completes multi-step assessment questionnaire
2. System analyzes responses and generates personalized recommendations
3. User views tailored results with suite images and features
4. Contact form submission triggers follow-up workflow

## 🛠 Technologies Used

-   **Framework**: Next.js 14 with App Router
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Custom components following Material-UI principles
-   **State Management**: React hooks (useState, useEffect)
-   **Deployment**: Vercel-ready configuration

## 🎨 Styling & Design

-   Modern, accessible design with focus on senior-friendly UX
-   Responsive layout for desktop, tablet, and mobile
-   High contrast colors and large, readable fonts
-   Smooth transitions and hover effects
-   Loading states and progress indicators

## 🚀 Deployment

The application is optimized for deployment on Vercel:

```bash
# Build for production
npm run build

# Start production server locally
npm run start
```

For Vercel deployment, simply connect your repository to your Vercel account.

## 📄 License

This project is proprietary to Kensington Senior Living Communities.

---

_Built with ❤️ for senior living community selection_
