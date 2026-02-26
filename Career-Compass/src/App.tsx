
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppDataProvider } from './hooks/useAppData';

// Pages
import HeroPage from './pages/HeroPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import ProfileSetupPage from './pages/auth/ProfileSetupPage';
import SkillsPage from './pages/auth/SkillsPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CareersPage from './pages/careers/CareersPage';
import CareerDetailsPage from './pages/careers/CareerDetailsPage';
import LearningPage from './pages/learning/LearningPage';
import MentorsPage from './pages/mentors/MentorsPage';
import MentorProfilePage from './pages/mentors/MentorProfilePage';
import ResumeBuilderPage from './pages/resume/ResumeBuilderPage';
import ProfilePage from './pages/profile/ProfilePage';
import AgentSimulationPage from './pages/agents/AgentSimulationPage';
// Job and Interview pages
import JobDetailsPage from './pages/jobs/JobDetailsPage';
import InterviewPrepPage from './pages/interview/InterviewPrepPage';
import InterviewSessionPage from './pages/interview/InterviewSessionPage';
// New feature pages
import EnhancedJobsPage from './pages/jobs/EnhancedJobsPage';
import CareerGuidancePage from './pages/careers/CareerGuidancePage';

function App() {
  console.log('App component is rendering');
  
  return (
    <AppDataProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/profile-setup" element={<ProfileSetupPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Career pages */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:id" element={<CareerDetailsPage />} />
            <Route path="/career-guidance" element={<CareerGuidancePage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/mentors/:id" element={<MentorProfilePage />} />
            <Route path="/resume" element={<ResumeBuilderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/agents" element={<AgentSimulationPage />} />
            {/* Job and Interview routes */}
            <Route path="/jobs" element={<EnhancedJobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/interview-prep/:id" element={<InterviewPrepPage />} />
            <Route path="/interview/:id" element={<InterviewSessionPage />} />
          </Routes>
        </div>
      </Router>
    </AppDataProvider>
  );
}

export default App;