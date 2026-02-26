import { useState, useCallback } from 'react';
import { extractSkillsFromText, extractBasicInfo } from '../utils/fileProcessing';

interface AnalysisResult {
  extracted_skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
  };
  career_forecast: Array<{
    role: string;
    fit_percentage: number;
    salary_range: string;
    growth_outlook: string;
  }>;
  learning_plan: Array<{
    step: string;
    resources: string[];
    timeline: string;
  }>;
  personalized_insight: string;
  basicInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  };
}

interface LinkedInAnalysis {
  profileCompleteness: number;
  networkStrength: number;
  activityScore: number;
  recommendations: string[];
  topConnections: Array<{
    name: string;
    title: string;
    company: string;
  }>;
}

interface GitHubAnalysis {
  totalRepos: number;
  starsReceived: number;
  followers: number;
  topLanguages: Array<{
    language: string;
    percentage: number;
  }>;
  recentActivity: string[];
  contributionStreak: number;
}

export const useResumeAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [linkedinAnalysis, setLinkedinAnalysis] = useState<LinkedInAnalysis | null>(null);
  const [githubAnalysis, setGithubAnalysis] = useState<GitHubAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = useCallback(async (resumeText: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Extract skills from the resume text
      const skills = extractSkillsFromText(resumeText);
      const basicInfo = extractBasicInfo(resumeText);

      // Mock AI analysis result (in production, this would call the backend API)
      const mockResult: AnalysisResult = {
        extracted_skills: skills,
        career_forecast: [
          {
            role: "Senior Software Engineer",
            fit_percentage: 92,
            salary_range: "$120,000 - $160,000",
            growth_outlook: "Strong"
          },
          {
            role: "Full Stack Developer",
            fit_percentage: 88,
            salary_range: "$95,000 - $130,000",
            growth_outlook: "Very Strong"
          },
          {
            role: "DevOps Engineer",
            fit_percentage: 85,
            salary_range: "$105,000 - $140,000",
            growth_outlook: "Strong"
          }
        ],
        learning_plan: [
          {
            step: "Master advanced React patterns and state management",
            resources: ["React Advanced Patterns Course", "Redux Toolkit Documentation"],
            timeline: "2-3 months"
          },
          {
            step: "Deepen backend expertise with microservices",
            resources: ["Node.js Microservices Course", "Docker & Kubernetes Workshop"],
            timeline: "3-4 months"
          },
          {
            step: "Build production-ready full-stack applications",
            resources: ["Full Stack Open MOOC", "System Design Interview Prep"],
            timeline: "4-6 months"
          }
        ],
        personalized_insight: `Based on ${basicInfo.name}'s background as a ${basicInfo.title}, they show exceptional potential for senior engineering roles. Their technical skills in ${skills.technical.slice(0, 3).join(', ')} position them well for high-impact positions. Focus on leadership and system design skills to maximize career growth.`,
        basicInfo
      };

      // Mock LinkedIn analysis
      const mockLinkedIn: LinkedInAnalysis = {
        profileCompleteness: 85,
        networkStrength: 78,
        activityScore: 92,
        recommendations: [
          "Add more detailed project descriptions",
          "Include quantifiable achievements",
          "Connect with industry leaders in your field",
          "Share technical insights regularly"
        ],
        topConnections: [
          { name: "Sarah Johnson", title: "Engineering Manager", company: "TechCorp" },
          { name: "Mike Chen", title: "Senior Developer", company: "StartupXYZ" },
          { name: "Lisa Rodriguez", title: "Product Manager", company: "InnovateLabs" }
        ]
      };

      // Mock GitHub analysis
      const mockGitHub: GitHubAnalysis = {
        totalRepos: 24,
        starsReceived: 156,
        followers: 89,
        topLanguages: [
          { language: "JavaScript", percentage: 45 },
          { language: "Python", percentage: 30 },
          { language: "TypeScript", percentage: 15 },
          { language: "Java", percentage: 10 }
        ],
        recentActivity: [
          "Contributed to open-source React library",
          "Published npm package for data visualization",
          "Collaborated on machine learning project",
          "Created portfolio website with Next.js"
        ],
        contributionStreak: 47
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setAnalysisResult(mockResult);
      setLinkedinAnalysis(mockLinkedIn);
      setGithubAnalysis(mockGitHub);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setAnalysisResult(null);
    setLinkedinAnalysis(null);
    setGithubAnalysis(null);
    setError(null);
  }, []);

  return {
    isAnalyzing,
    analysisResult,
    linkedinAnalysis,
    githubAnalysis,
    error,
    analyzeResume,
    resetAnalysis
  };
};