# CareerSetu AI 🧭

A comprehensive AI-powered career guidance platform built for hackathon demonstration. CareerSetu AI helps users discover career paths, analyze skill gaps, find learning resources, and connect with industry mentors.

## 🌟 Features

### 🔐 Smart Onboarding
- Simulated AI resume analysis
- Automatic skill extraction
- Personalized user profiles

### 📊 Career Intelligence
- Interactive career path exploration
- Skill gap analysis with visual progress bars
- Career trajectory forecasting with salary projections
- 5-10 year career progression timelines

### 📚 Personalized Learning
- Curated course recommendations
- Interactive learning checklist
- Skill-based course filtering
- Direct links to learning platforms (Coursera, Udemy, etc.)

### 🤝 Mentor Marketplace
- Browse expert mentors by expertise
- Detailed mentor profiles with reviews
- Complete booking flow with calendar selection
- Session confirmation system

### 🤖 AI Resume Builder
- Professional resume templates
- AI-powered suggestions and tips
- Resume scoring system
- ATS-friendly formatting

## 🚀 Demo Flow

The application demonstrates a complete user journey:

1. **Login** → Simple authentication simulation
2. **Assessment** → Resume upload and skill extraction
3. **Dashboard** → Personalized career recommendations
4. **Career Exploration** → Detailed path analysis with forecasting
5. **Learning** → Skill gap-based course recommendations
6. **Mentorship** → Expert mentor booking and consultation

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Data**: Static JSON files (no backend required)
- **Charts**: Custom React components with CSS animations

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Button, Card, Modal, ProgressBar
│   ├── charts/          # Career trajectory and salary charts
│   └── layout/          # Header, Layout components
├── pages/               # Main application screens
│   ├── auth/           # Login, onboarding, skills
│   ├── dashboard/      # Main dashboard
│   ├── careers/        # Career exploration and details
│   ├── learning/       # Learning platform
│   ├── resume/         # AI resume builder
│   └── mentors/        # Mentor marketplace
├── data/               # Mock JSON data files
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
└── types/              # TypeScript interfaces
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/careersetu-ai.git
   cd careersetu-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎯 Demo Instructions

### For Hackathon Judges/Viewers:

1. **Start at Login** (`/login`)
   - Use any email/password to login
   - Click "Get Started" for full onboarding experience

2. **Experience the Assessment** (`/onboarding`)
   - Click "Upload Your Resume" 
   - Watch the AI analysis simulation
   - View extracted skills on the skills page

3. **Explore the Dashboard** (`/dashboard`)
   - See personalized recommendations for "Priya"
   - Click on career recommendations
   - Navigate to different sections

4. **Career Path Analysis** (`/careers`)
   - Browse different career options
   - Click on "Data Scientist" for detailed analysis
   - View skill gap analysis and career trajectory

5. **Learning Platform** (`/learning`)
   - See personalized course recommendations
   - Filter by provider or difficulty
   - Mark courses as completed

6. **Mentor Marketplace** (`/mentors`)
   - Browse expert mentors
   - Click on any mentor profile
   - Experience the complete booking flow

7. **AI Resume Builder** (`/resume`)
   - View the AI-generated resume
   - See AI suggestions and scoring

## 📊 Mock Data

The application uses static JSON files for demonstration:

- **User Profile**: Priya Sharma (Junior Data Analyst, 2 years experience)
- **Career Paths**: 4 different career options with trajectories
- **Courses**: 8 curated learning recommendations
- **Mentors**: 8 industry expert profiles

## 🎨 Design System

- **Colors**: Professional blue (#3B82F6) with clean greys
- **Typography**: Inter font with consistent sizing scale
- **Layout**: 12-column responsive grid system
- **Components**: Reusable design system components

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This project is built for hackathon demonstration purposes.

## 🤝 Contributing

This is a hackathon project, but feel free to fork and extend!

## 📧 Contact

Built with ❤️ for hackathon demonstration

---

**Note**: This is a frontend-only application with simulated AI functionality using static data. Perfect for demonstrating the complete user experience without backend complexity.